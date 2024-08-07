import React, { useState, useEffect } from "react";
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
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Importa os métodos de autenticação
import { firebaseConfig } from "../src/firebaseConfig";
import Loading from "../components/Loading";

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app); // Inicializa a autenticação

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
  const [imagemNome, setImagemNome] = useState(""); // Para armazenar o nome do arquivo de imagem
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [restaurantId, setRestaurantId] = useState(null);
  const [categorias, setCategorias] = useState([]);

  const [errors, setErrors] = useState({
    nome: false,
    descricao: false,
    categoria: false,
    preco: false,
    imagem: false,
  });

  useEffect(() => {
    const fetchAdminData = async (email) => {
      try {
        const q = query(collection(db, "admins"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const adminDoc = querySnapshot.docs[0];
          const adminData = adminDoc.data();
          setRestaurantId(adminData.idRest);
          fetchRestaurantCategories(adminData.idRest); // Buscar categorias do restaurante
        } else {
          console.log("Nenhum documento encontrado para o admin!");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do admin:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRestaurantCategories = async (idRest) => {
      try {
        const docRef = doc(db, "Restaurantes", idRest);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const restaurantData = docSnap.data();
          setCategorias(restaurantData.categorias || []);
        } else {
          console.log("Nenhum documento encontrado para o restaurante!");
        }
      } catch (error) {
        console.error("Erro ao buscar categorias do restaurante:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        fetchAdminData(user.email);
      } else {
        // No user is signed in
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

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

      // Adiciona os dados do prato ao Firestore, incluindo o ID do restaurante
      const docRef = await addDoc(collection(db, "Pratos"), {
        nome,
        descricao,
        categoria,
        preco,
        alergenicos: alergenicosString,
        imagemPrato: imagemURL,
        restauranteId: restaurantId, // Adiciona o ID do restaurante
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
    return <Loading />;
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
          <Avatar sx={{ m: 1, bgcolor: "text.secondary" }}>
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
              {categorias.length > 0 ? (
                categorias.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">
                  <em>Sem categorias disponíveis</em>
                </MenuItem>
              )}
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
