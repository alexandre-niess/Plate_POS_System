import React, { useState, useContext } from "react";
import Header from "../components/Header";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Avatar,
  TextField,
  Button,
  MenuItem,
  Container,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../src/firebaseConfig";
import { RestaurantContext } from "../src/RestaurantContext"; // Import the context

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

const alergenicos = [
  "Açúcar",
  "Glúten",
  "Lactose",
  "Vegetariano",
  "Ovo",
  "Soja",
];

export function CadPrato() {
  const { restaurant, loading } = useContext(RestaurantContext); // Use the context
  const [selectedAlergenicos, setSelectedAlergenicos] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState(null);
  const [imagemNome, setImagemNome] = useState(""); // Para armazenar o nome do arquivo de imagem
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({
    nome: false,
    descricao: false,
    categoria: false,
    preco: false,
    imagem: false,
  });

  const handleAlergenicosChange = (event) => {
    const value = event.target.name;
    setSelectedAlergenicos((prev) =>
      prev.includes(value)
        ? prev.filter((alerg) => alerg !== value)
        : [...prev, value]
    );
  };

  const handleImagemChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (file && allowedTypes.includes(file.type)) {
      setImagem(file);
      setImagemNome(file.name); // Armazena o nome do arquivo de imagem
      setErrors((prev) => ({ ...prev, imagem: false }));
    } else {
      setImagem(null);
      setImagemNome("");
      setErrors((prev) => ({ ...prev, imagem: true }));
      alert(
        "Por favor, selecione um arquivo de imagem válido (jpeg, png, gif)."
      );
    }
  };

  const validateFields = () => {
    const newErrors = {
      nome: !nome,
      descricao: !descricao,
      categoria: !categoria,
      preco: !preco,
      imagem: !imagem,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!validateFields()) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload da imagem para o Firebase Storage
      const storageRef = ref(storage, `images/${imagem.name}`);
      await uploadBytes(storageRef, imagem);
      const imagemURL = await getDownloadURL(storageRef);

      // Converte os alergenicos selecionados para uma string separada por vírgulas
      const alergenicosString = selectedAlergenicos.join(",");

      // Adiciona os dados do prato ao Firestore
      const docRef = await addDoc(collection(db, "Pratos"), {
        nome,
        descricao,
        categoria,
        preco,
        alergenicos: alergenicosString,
        imagemPrato: imagemURL,
      });

      // Obtenha o documento recém-adicionado
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Documento cadastrado:", docSnap.data());
      } else {
        console.log("Nenhum documento encontrado.");
      }

      alert("Prato cadastrado com sucesso!");
      // Reset form state
      setNome("");
      setDescricao("");
      setCategoria("");
      setPreco("");
      setSelectedAlergenicos([]);
      setImagem(null);
      setImagemNome("");
    } catch (error) {
      console.error("Erro ao cadastrar o prato: ", error);
      alert("Erro ao cadastrar o prato. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ padding: 2, textAlign: "center" }}>
        <Typography variant="h6" component="p">
          Carregando...
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <CssBaseline />
      <Header headerType="cad-prato" />
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 11,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "text.details" }}>
            <AddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastro de Pratos
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="nome"
              label="Nome"
              name="nome"
              autoComplete="nome"
              autoFocus
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              error={errors.nome}
              helperText={errors.nome ? "Nome é obrigatório" : ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="descricao"
              rows={4}
              multiline
              label="Descrição"
              name="descricao"
              autoComplete="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              error={errors.descricao}
              helperText={errors.descricao ? "Descrição é obrigatória" : ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              select
              id="categoria"
              label="Categoria"
              name="categoria"
              autoComplete="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              error={errors.categoria}
              helperText={errors.categoria ? "Categoria é obrigatória" : ""}
            >
              {restaurant.categorias.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <Typography component="h2" variant="h6" sx={{ mt: 2 }}>
              Alérgenicos
            </Typography>
            <FormGroup>
              <Grid container spacing={2}>
                {alergenicos.map((alergenico) => (
                  <Grid item xs={4} key={alergenico}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedAlergenicos.includes(alergenico)}
                          onChange={handleAlergenicosChange}
                          name={alergenico}
                        />
                      }
                      label={alergenico}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>

            <TextField
              margin="normal"
              required
              fullWidth
              id="preco"
              label="Preço"
              name="preco"
              autoComplete="preco"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              type="number"
              error={errors.preco}
              helperText={errors.preco ? "Preço é obrigatório" : ""}
            />
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              <Box sx={{ display: "flex", gap: "10px" }}>
                Upload Imagem
                <CloudUploadIcon />
              </Box>
              <input
                type="file"
                hidden
                onChange={handleImagemChange}
                accept="image/jpeg,image/png,image/gif"
              />
            </Button>
            {imagemNome && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Arquivo selecionado: {imagemNome}
              </Typography>
            )}
            {errors.imagem && (
              <Typography color="error" variant="caption">
                Imagem é obrigatória
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting} // Disable button while submitting
            >
              Cadastrar Prato
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default CadPrato;
