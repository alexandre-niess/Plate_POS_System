import React, { createContext, useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
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
          const restaurantDoc = querySnapshot.docs[0];
          setRestaurant({ id: restaurantDoc.id, ...restaurantDoc.data() });
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

  const updateRestaurant = async (updatedData) => {
    try {
      const restaurantDocRef = doc(db, "Restaurantes", restaurant.id);
      await updateDoc(restaurantDocRef, updatedData);
      setRestaurant((prev) => ({ ...prev, ...updatedData }));
    } catch (error) {
      console.error("Erro ao atualizar dados do restaurante:", error);
    }
  };

  return (
    <RestaurantContext.Provider
      value={{ restaurant, setRestaurant, updateRestaurant, loading }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export { RestaurantContext, RestaurantProvider };
