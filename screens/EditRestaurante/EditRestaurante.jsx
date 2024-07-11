import React, { useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import { RestaurantProvider } from "../../src/RestaurantContext";
import StepNomeEndereco from "./StepNomeEndereco";
import StepPagamento from "./StepPagamento";
import StepHorarios from "./StepHorarios";
import StepCategorias from "./StepCategorias";
import Header from "../../components/Header";

const steps = [
  "Nome & Endereço",
  "Formas de Pagamento & Valor Mínimo",
  "Horários de Funcionamento",
  "Edição de Categorias",
];

const EditRestaurant = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <RestaurantProvider>
      <CssBaseline />
      <Header headerType="login" />
      <Container>
        <Box sx={{ width: "100%", marginTop: "140px" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ marginTop: 2 }}>
            {activeStep === steps.length ? (
              <Box>
                <Typography>Todos os passos foram concluídos</Typography>
                <Button onClick={handleReset}>Reiniciar</Button>
              </Box>
            ) : (
              <Box>
                {getStepContent(activeStep)}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 2,
                  }}
                >
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Voltar
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? "Concluir" : "Próximo"}
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </RestaurantProvider>
  );
};

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <StepNomeEndereco />;
    case 1:
      return <StepPagamento />;
    case 2:
      return <StepHorarios />;
    case 3:
      return <StepCategorias />;
    default:
      return "Passo desconhecido";
  }
};

export default EditRestaurant;
