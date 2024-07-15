import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
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
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../src/firebaseConfig";
import { RestaurantContext } from "../src/RestaurantContext"; // Import the context
import Loading from "../components/Loading";

export function Produto() {
  return <></>;
}

export default Produto;
