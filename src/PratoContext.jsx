import React, { createContext, useState, useEffect, useContext } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../src/firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const PratoContext = createContext();

export const PratoProvider = ({ children }) => {
  const [pratos, setPratos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPratos = async () => {
      const pratosCollection = collection(db, "Pratos");
      const pratosSnapshot = await getDocs(pratosCollection);
      const pratosList = pratosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPratos(pratosList);
      setLoading(false);
    };

    fetchPratos();
  }, []);

  return (
    <PratoContext.Provider value={{ pratos, loading }}>
      {children}
    </PratoContext.Provider>
  );
};

export const usePratos = () => useContext(PratoContext);
