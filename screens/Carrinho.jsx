import React from "react";
import Header from "../components/Header";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentsIcon from "@mui/icons-material/Payments";

const paymentMethods = [
  {
    icon: <CreditCardIcon />,
    label: "Cartões:",
    description:
      "Diners Club, Mastercard, Amex, Hipercard, Visa, Elo, Refeição Mastercard Débito, Visa Sodexo Refeição, Ben Débito, Alelo Refeição, Refeição",
  },
  {
    icon: <PaymentsIcon />,
    label: "Dinheiro",
  },
];

const openingHours = [
  "Domingo: 10h às 23h30m",
  "Segunda-feira: 10h às 23h30m",
  "Terça-feira: 10h às 23h30m",
  "Quarta-feira: 10h às 23h30m",
  "Quinta-feira: 10h às 23h30m",
  "Sexta-feira: 10h às 23h30m",
  "Sábado: 10h às 23h30m",
];

export function PerfilEmp() {
  return (
    <>
      <CssBaseline />
      <Header headerType="home" />
      <Box sx={{ marginTop: "74px" }}>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            marginBottom: "10px",
            alignItems: "center",
            padding: 1.5,
          }}
        >
          <Avatar
            src="../public/logo.png"
            alt="Logo do restaurante"
            sx={{ width: 50, height: 50 }}
          />
          <Typography
            component="h1"
            variant="h5"
            align="left"
            color="text.primary"
          >
            Restaurante Bom Sabor
          </Typography>
        </Box>
        <Section title="Endereço">
          <Typography component="h1" align="left" color="text.details">
            Avenida Dom José Gaspar, 500 - Coração Eucarístico, Belo Horizonte -
            MG, 30535-901
          </Typography>
        </Section>

        <Section title="Formas de Pagamento">
          {paymentMethods.map((method, index) => (
            <Box key={index} sx={{ display: "flex", gap: "10px" }}>
              {method.icon}
              <Typography
                component="h1"
                align="left"
                color="text.primary"
                sx={{ fontWeight: "600" }}
              >
                {method.label}
              </Typography>
              {method.description && (
                <Typography component="h1" align="left" color="text.details">
                  {method.description}
                </Typography>
              )}
            </Box>
          ))}
        </Section>

        <Section title="Horário de Funcionamento">
          {openingHours.map((hour, index) => (
            <Typography
              key={index}
              component="h1"
              align="left"
              color="text.details"
            >
              {hour}
            </Typography>
          ))}
        </Section>
      </Box>
    </>
  );
}

function Section({ title, children }) {
  return <></>;
}

export default PerfilEmp;
