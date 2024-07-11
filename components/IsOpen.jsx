import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { RestaurantContext } from "../src/RestaurantContext";

const diasSemana = [
  "domingo",
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
];

const parseTime = (timeStr) => {
  const [hour, minute] = timeStr.split(":").map(Number);
  return { hour, minute };
};

const formatTime = ({ hour, minute }) => {
  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
};

const isOpenNow = (horarios) => {
  const now = new Date();
  const currentDay = diasSemana[now.getDay()];
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const horarioHoje = horarios.find((h) => h.startsWith(currentDay));

  if (!horarioHoje || horarioHoje.includes("Fechado")) {
    return { aberto: false };
  }

  if (horarioHoje.includes("24 horas")) {
    return { aberto: true, fechamento: "24 horas" };
  }

  const [abertura, fechamento] = horarioHoje.split(": ")[1].split(" às ");
  const { hour: aberturaHour, minute: aberturaMinute } = parseTime(abertura);
  const { hour: fechamentoHour, minute: fechamentoMinute } =
    parseTime(fechamento);

  const isAfterOpening =
    currentHour > aberturaHour ||
    (currentHour === aberturaHour && currentMinute >= aberturaMinute);
  const isBeforeClosing =
    currentHour < fechamentoHour ||
    (currentHour === fechamentoHour && currentMinute <= fechamentoMinute);

  return {
    aberto: isAfterOpening && isBeforeClosing,
    fechamento: { hour: fechamentoHour, minute: fechamentoMinute },
  };
};

const getNextOpenDay = (horarios) => {
  const now = new Date();
  const currentDayIndex = now.getDay();

  for (let i = 1; i <= 7; i++) {
    const nextDayIndex = (currentDayIndex + i) % 7;
    const nextDay = diasSemana[nextDayIndex];
    const horarioNextDay = horarios.find((h) => h.startsWith(nextDay));

    if (horarioNextDay && !horarioNextDay.includes("Fechado")) {
      const [abertura] = horarioNextDay.split(": ")[1].split(" às ");
      return { nextDay, abertura };
    }
  }
  return null;
};

const IsOpen = () => {
  const { restaurant } = useContext(RestaurantContext);

  if (!restaurant || !restaurant.horarios) {
    return null; // ou alguma mensagem de carregando...
  }

  const { aberto, fechamento } = isOpenNow(restaurant.horarios);

  let mensagem;
  let dotColor;

  if (aberto) {
    if (fechamento === "24 horas") {
      mensagem = "Aberto 24 horas - Pedido min. R$20,00";
    } else {
      const fechamentoStr = formatTime(fechamento);
      mensagem = `Aberto até ${fechamentoStr} - Pedido min. R$20,00`;
    }
    dotColor = "green";
  } else {
    const nextOpenDay = getNextOpenDay(restaurant.horarios);
    mensagem = nextOpenDay
      ? `Fechado - Abre ${nextOpenDay.nextDay}: ${nextOpenDay.abertura}`
      : "Fechado";
    dotColor = "red";
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        padding: 1,
        height: 20,
        width: "100%",
        zIndex: 100,
        backgroundColor: "background.secondary",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // Adiciona sombra
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          component="span"
          sx={{ fontSize: "24px", color: dotColor, marginRight: 1 }}
        >
          •
        </Typography>
        <Typography component="h1" align="left" sx={{ fontSize: "12px" }}>
          {mensagem}
        </Typography>
      </Box>
      <Link to="perfil-da-loja" style={{ color: "inherit" }}>
        <Typography component="h1" align="left" sx={{ fontSize: "12px" }}>
          Ver perfil da loja
        </Typography>
      </Link>
    </Box>
  );
};

export default IsOpen;
