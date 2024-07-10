import React, { createContext, useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
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
        const querySnapshot = await getDocs(collection(db, "Restaurantes"));
        if (!querySnapshot.empty) {
          const restaurantData = querySnapshot.docs[0].data();
          setRestaurant(restaurantData);
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
