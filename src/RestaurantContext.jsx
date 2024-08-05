import React, { createContext, useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
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

  const fetchRestaurantByName = async (name) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "Restaurantes"),
        where("nome", "==", name)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const restaurantDoc = querySnapshot.docs[0];
        setRestaurant({ id: restaurantDoc.id, ...restaurantDoc.data() });
      } else {
        console.log("Nenhum documento encontrado!");
        setRestaurant(null);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do restaurante:", error);
    } finally {
      setLoading(false);
    }
  };

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
      value={{
        restaurant,
        setRestaurant,
        updateRestaurant,
        fetchRestaurantByName,
        loading,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export { RestaurantContext, RestaurantProvider };
