import React from "react";
import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import CardProduto from "../components/CardProduto";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

export function PerfilEmp() {
  return (
    <>
      <CssBaseline />
      <Header />
    </>
  );
}

export default PerfilEmp;
