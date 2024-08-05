import React, { useState, useContext } from "react";
import Header from "../../components/Header";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Button,
  Container,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../src/firebaseConfig";
import { AdminRestaurantContext } from "../../src/AdminRestaurantContext";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

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
    valorMinimo: "",
    horarios: {
      segunda: {
        abertura: { hora: "", minuto: "" },
        fechamento: { hora: "", minuto: "" },
        status: "aberto",
      },
      terca: {
        abertura: { hora: "", minuto: "" },
        fechamento: { hora: "", minuto: "" },
        status: "aberto",
      },
      // ...restantes dos dias
    },
    categorias: [],
    imagem: null,
    imagemNome: "",
  });

  const { setRestaurant } = useContext(AdminRestaurantContext);

  const steps = [
    "Dados do Restaurante",
    "Formas de Pagamento",
    "Horários de Funcionamento",
    "Categorias",
  ];

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

      const diasSemana = [
        "segunda",
        "terca",
        "quarta",
        "quinta",
        "sexta",
        "sabado",
        "domingo",
      ];
      const horariosArray = diasSemana.map((dia) => {
        const { abertura, fechamento, status } = formData.horarios[dia];
        if (status === "fechado") {
          return `${dia}: Fechado`;
        } else if (status === "24Horas") {
          return `${dia}: 24 horas`;
        } else {
          return `${dia}: ${abertura.hora}:${abertura.minuto} às ${fechamento.hora}:${fechamento.minuto}`;
        }
      });

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
        valorMinimo: formData.valorMinimo,
        horarios: horariosArray,
        categorias: formData.categorias,
        imagemURL: imagemURL,
        adminId: auth.currentUser ? auth.currentUser.uid : null,
      };

      console.log("Dados do Restaurante:", restauranteData);

      if (!auth.currentUser) {
        throw new Error("Usuário não autenticado");
      }

      const docRef = await addDoc(
        collection(db, "Restaurantes"),
        restauranteData
      );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Documento cadastrado:", docSnap.data());

        await updateDoc(doc(db, "admins", auth.currentUser.uid), {
          idRest: docRef.id,
        });

        setRestaurant({
          id: docRef.id,
          ...restauranteData,
        });

        alert("Restaurante cadastrado com sucesso!");
        resetForm();
      } else {
        console.log("Nenhum documento encontrado.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar o restaurante: ", error);
      alert("Erro ao cadastrar o restaurante. Tente novamente.");
    }
  };

  const validateFields = () => {
    const requiredFields = [
      "nome",
      "cep",
      "logradouro",
      "numero",
      "bairro",
      "cidade",
      "estado",
    ];
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
      valorMinimo: "",
      horarios: {
        segunda: {
          abertura: { hora: "", minuto: "" },
          fechamento: { hora: "", minuto: "" },
          status: "aberto",
        },
        terca: {
          abertura: { hora: "", minuto: "" },
          fechamento: { hora: "", minuto: "" },
          status: "aberto",
        },
        // ...restantes dos dias
      },
      categorias: [],
      imagem: null,
      imagemNome: "",
    });
  };

  return (
    <>
      <CssBaseline />
      <Header headerType="cad-restaurante" />
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
          {activeStep === 0 && (
            <Step1 formData={formData} setFormData={setFormData} />
          )}
          {activeStep === 1 && (
            <Step2 formData={formData} setFormData={setFormData} />
          )}
          {activeStep === 2 && (
            <Step3 formData={formData} setFormData={setFormData} />
          )}
          {activeStep === 3 && (
            <Step4 formData={formData} setFormData={setFormData} />
          )}
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
