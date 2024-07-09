import React, { useState } from "react";
import Header from "../../components/Header";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar, Button, Container, Stepper, Step, StepLabel } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../src/firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export function CadRestaurante() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    nome: "",
    cep: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    pagamentoDinheiro: false,
    pagamentoCartao: false,
    cartoes: "",
    horarios: {
      segunda: { hora: "", minuto: "" },
      terca: { hora: "", minuto: "" },
      quarta: { hora: "", minuto: "" },
      quinta: { hora: "", minuto: "" },
      sexta: { hora: "", minuto: "" },
      sabado: { hora: "", minuto: "" },
      domingo: { hora: "", minuto: "" },
    },
    imagem: null,
    imagemNome: "",
  });

  const steps = ["Dados do Restaurante", "Formas de Pagamento", "Horários de Funcionamento"];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      let imagemURL = "";
      if (formData.imagem) {
        const storageRef = ref(storage, `images/${formData.imagem.name}`);
        await uploadBytes(storageRef, formData.imagem);
        imagemURL = await getDownloadURL(storageRef);
      }

      const restauranteData = {
        nome: formData.nome,
        cep: formData.cep,
        logradouro: formData.logradouro,
        numero: formData.numero,
        bairro: formData.bairro,
        cidade: formData.cidade,
        estado: formData.estado,
        pagamentoDinheiro: formData.pagamentoDinheiro,
        pagamentoCartao: formData.pagamentoCartao,
        cartoes: formData.cartoes,
        horarios: formData.horarios,
        imagemURL: imagemURL,
      };

      const docRef = await addDoc(collection(db, "Restaurantes"), restauranteData);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Documento cadastrado:", docSnap.data());
      } else {
        console.log("Nenhum documento encontrado.");
      }

      alert("Restaurante cadastrado com sucesso!");
      resetForm();
    } catch (error) {
      console.error("Erro ao cadastrar o restaurante: ", error);
      alert("Erro ao cadastrar o restaurante. Tente novamente.");
    }
  };

  const validateFields = () => {
    const requiredFields = ["nome", "cep", "logradouro", "numero", "bairro", "cidade", "estado"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return false;
      }
    }
    return true;
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      cep: "",
      logradouro: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      pagamentoDinheiro: false,
      pagamentoCartao: false,
      cartoes: "",
      horarios: {
        segunda: { hora: "", minuto: "" },
        terca: { hora: "", minuto: "" },
        quarta: { hora: "", minuto: "" },
        quinta: { hora: "", minuto: "" },
        sexta: { hora: "", minuto: "" },
        sabado: { hora: "", minuto: "" },
        domingo: { hora: "", minuto: "" },
      },
      imagem: null,
      imagemNome: "",
    });
  };

  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="md">
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
          <Stepper activeStep={activeStep} sx={{ mt: 3, mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === 0 && <Step1 formData={formData} setFormData={setFormData} />}
          {activeStep === 1 && <Step2 formData={formData} setFormData={setFormData} />}
          {activeStep === 2 && <Step3 formData={formData} setFormData={setFormData} />}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Voltar
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {activeStep === steps.length - 1 ? (
              <Button onClick={handleSubmit}>Enviar</Button>
            ) : (
              <Button onClick={handleNext}>Próximo</Button>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default CadRestaurante;
