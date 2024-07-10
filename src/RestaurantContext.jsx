// src/RestaurantContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig"; // Ajuste o caminho conforme necessário

// Inicialize o Firebase
initializeApp(firebaseConfig);

const RestaurantContext = createContext();

const RestaurantProvider = ({ children }) => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const docRef = doc(db, "Restaurantes", "choFHp7U8D6etWBYLZrs"); // Substitua "restauranteId" pelo ID do documento do restaurante
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRestaurant(docSnap.data());
        } else {
          console.log("Nenhum documento encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do restaurante:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [db]);

  return (
    <RestaurantContext.Provider value={{ restaurant, loading }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export { RestaurantContext, RestaurantProvider };
