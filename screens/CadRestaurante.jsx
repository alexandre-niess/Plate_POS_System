import React, { useState, useRef } from "react";
import Header from "../components/Header";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Avatar,
  TextField,
  Button,
  Container,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../src/firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export function CadPrato() {
  const [nome, setNome] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cartoes, setCartoes] = useState("");
  const [pagamentoDinheiro, setPagamentoDinheiro] = useState(false);
  const [pagamentoCartao, setPagamentoCartao] = useState(false);
  const [horarios, setHorarios] = useState({
    segunda: { hora: "", minuto: "" },
    terca: { hora: "", minuto: "" },
    quarta: { hora: "", minuto: "" },
    quinta: { hora: "", minuto: "" },
    sexta: { hora: "", minuto: "" },
    sabado: { hora: "", minuto: "" },
    domingo: { hora: "", minuto: "" },
  });
  const [imagem, setImagem] = useState(null);
  const [imagemNome, setImagemNome] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({
    nome: false,
    cep: false,
    logradouro: false,
    numero: false,
    bairro: false,
    cidade: false,
    estado: false,
    cartoes: false,
    imagem: false,
  });

  const refs = {
    segundaMinuto: useRef(null),
    tercaMinuto: useRef(null),
    quartaMinuto: useRef(null),
    quintaMinuto: useRef(null),
    sextaMinuto: useRef(null),
    sabadoMinuto: useRef(null),
    domingoMinuto: useRef(null),
  };

  const handleImagemChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (file && allowedTypes.includes(file.type)) {
      setImagem(file);
      setImagemNome(file.name);
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
      cep: !cep,
      logradouro: !logradouro,
      numero: !numero,
      bairro: !bairro,
      cidade: !cidade,
      estado: !estado,
      cartoes: pagamentoCartao && !cartoes,
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

      // Adiciona os dados do restaurante ao Firestore
      const docRef = await addDoc(collection(db, "Restaurantes"), {
        nome,
        cep,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        cartoes: pagamentoCartao ? cartoes : "",
        pagamentoDinheiro,
        horarios,
        imagemURL,
      });

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Documento cadastrado:", docSnap.data());
      } else {
        console.log("Nenhum documento encontrado.");
      }

      alert("Restaurante cadastrado com sucesso!");
      // Reset form state
      setNome("");
      setCep("");
      setLogradouro("");
      setNumero("");
      setBairro("");
      setCidade("");
      setEstado("");
      setCartoes("");
      setPagamentoDinheiro(false);
      setPagamentoCartao(false);
      setHorarios({
        segunda: { hora: "", minuto: "" },
        terca: { hora: "", minuto: "" },
        quarta: { hora: "", minuto: "" },
        quinta: { hora: "", minuto: "" },
        sexta: { hora: "", minuto: "" },
        sabado: { hora: "", minuto: "" },
        domingo: { hora: "", minuto: "" },
      });
      setImagem(null);
      setImagemNome("");
    } catch (error) {
      console.error("Erro ao cadastrar o restaurante: ", error);
      alert("Erro ao cadastrar o restaurante. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHorariosChange = (event, dia, tipo) => {
    const { value } = event.target;
    if (tipo === "hora" && value.length === 2) {
      refs[`${dia}Minuto`].current.focus();
    }
    setHorarios((prev) => ({
      ...prev,
      [dia]: { ...prev[dia], [tipo]: value },
    }));
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
            Cadastro de Restaurante
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
              id="cep"
              label="CEP"
              name="cep"
              autoComplete="cep"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              error={errors.cep}
              helperText={errors.cep ? "CEP é obrigatório" : ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="logradouro"
              label="Logradouro"
              name="logradouro"
              autoComplete="logradouro"
              value={logradouro}
              onChange={(e) => setLogradouro(e.target.value)}
              error={errors.logradouro}
              helperText={errors.logradouro ? "Logradouro é obrigatório" : ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="numero"
              label="Número"
              name="numero"
              autoComplete="numero"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              error={errors.numero}
              helperText={errors.numero ? "Número é obrigatório" : ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="bairro"
              label="Bairro"
              name="bairro"
              autoComplete="bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              error={errors.bairro}
              helperText={errors.bairro ? "Bairro é obrigatório" : ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="cidade"
              label="Cidade"
              name="cidade"
              autoComplete="cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              error={errors.cidade}
              helperText={errors.cidade ? "Cidade é obrigatória" : ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="estado"
              label="Estado"
              name="estado"
              autoComplete="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              error={errors.estado}
              helperText={errors.estado ? "Estado é obrigatório" : ""}
            />
            <Typography component="h2" variant="h6" sx={{ mt: 2 }}>
              Formas de pagamento:
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={pagamentoDinheiro}
                  onChange={(e) => setPagamentoDinheiro(e.target.checked)}
                  name="dinheiro"
                />
              }
              label="Dinheiro"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={pagamentoCartao}
                  onChange={(e) => setPagamentoCartao(e.target.checked)}
                  name="cartao"
                />
              }
              label="Cartão"
            />
            {pagamentoCartao && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="cartoes"
                label="Cartões"
                name="cartoes"
                autoComplete="cartoes"
                multiline
                rows={4}
                value={cartoes}
                onChange={(e) => setCartoes(e.target.value)}
                error={errors.cartoes}
                helperText={errors.cartoes ? "Cartões é obrigatório" : ""}
              />
            )}
            <Typography component="h2" variant="h6" sx={{ mt: 2 }}>
              Horarios de Funcionamento:
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography align="center">Horas</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="center">Minutos</Typography>
                  </Grid>
                </Grid>
              </Grid>
              {["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"].map((dia) => (
                <Grid container item spacing={2} key={dia} alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="h6">{dia.charAt(0).toUpperCase() + dia.slice(1)}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id={`${dia}-hora`}
                      label="Hora"
                      name={`${dia}-hora`}
                      autoComplete="off"
                      value={horarios[dia].hora}
                      onChange={(e) => handleHorariosChange(e, dia, "hora")}
                      error={errors.nome}
                      helperText={errors.nome ? "Hora é obrigatória" : ""}
                    />
                  </Grid>
                  <Grid item xs={1} align="center">
                    <Typography variant="h6">:</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id={`${dia}-minuto`}
                      label="Minuto"
                      name={`${dia}-minuto`}
                      autoComplete="off"
                      inputRef={refs[`${dia}Minuto`]}
                      value={horarios[dia].minuto}
                      onChange={(e) => handleHorariosChange(e, dia, "minuto")}
                      error={errors.nome}
                      helperText={errors.nome ? "Minuto é obrigatório" : ""}
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Typography component="h2" variant="h6" sx={{ mt: 2 }}>
              Foto de Perfil do Restaurante:
            </Typography>
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
              Cadastrar Restaurante
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default CadPrato;
