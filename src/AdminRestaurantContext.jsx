import React, { createContext, useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig"; // Ajuste o caminho conforme necessário
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Inicialize o Firebase
initializeApp(firebaseConfig);

const AdminRestaurantContext = createContext();

const AdminRestaurantProvider = ({ children }) => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchRestaurantById = async (idRest) => {
      try {
        const restaurantDocRef = doc(db, "Restaurantes", idRest);
        const restaurantDoc = await getDoc(restaurantDocRef);
        if (restaurantDoc.exists()) {
          setRestaurant({ id: restaurantDoc.id, ...restaurantDoc.data() });
        } else {
          setRestaurant(null);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do restaurante:", error);
        setRestaurant(null);
      }
    };

    const fetchUserAndRestaurant = async (userId) => {
      setLoading(true);
      try {
        const userDocRef = doc(db, "admins", userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists() && userDoc.data().idRest) {
          await fetchRestaurantById(userDoc.data().idRest);
        } else {
          setRestaurant(null);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        setRestaurant(null);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserAndRestaurant(user.uid);
      } else {
        setRestaurant(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

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
    <AdminRestaurantContext.Provider
      value={{ restaurant, setRestaurant, updateRestaurant, loading }}
    >
      {children}
    </AdminRestaurantContext.Provider>
  );
};

export { AdminRestaurantContext, AdminRestaurantProvider };
