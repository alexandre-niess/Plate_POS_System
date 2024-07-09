import React, { useState } from "react";
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
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../src/firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

const categorias = [
  "Italiana",
  "Americana",
  "Japonesa",
  "Saladas",
  "Mexicana",
  "Brasileira",
  "Carnes",
  "Bebidas",
];

const alergenicos = [
  "Açúcar",
  "Glúten",
  "Lactose",
  "Vegetariano",
  "Ovo",
  "Soja",
];

export function CadPrato() {
  const [selectedAlergenicos, setSelectedAlergenicos] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState(null);
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
    setImagem(event.target.files[0]);
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

      // Adiciona os dados do prato ao Firestore
      await addDoc(collection(db, "Pratos"), {
        nome,
        descricao,
        categoria,
        preco,
        alergenicos: selectedAlergenicos,
        imagemPrato: imagemURL,
      });

      alert("Prato cadastrado com sucesso!");
      // Reset form state
      setNome("");
      setDescricao("");
      setCategoria("");
      setPreco("");
      setSelectedAlergenicos([]);
      setImagem(null);
    } catch (error) {
      console.error("Erro ao cadastrar o prato: ", error);
      alert("Erro ao cadastrar o prato. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <Header />
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
              {categorias.map((option) => (
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
              error={errors.imagem}
              helperText={errors.imagem ? "Imagem é obrigatória" : ""}
            >
              <Box sx={{ display: "flex", gap: "10px" }}>
                Upload Imagem
                <CloudUploadIcon />
              </Box>
              <input type="file" hidden onChange={handleImagemChange} />
            </Button>
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
