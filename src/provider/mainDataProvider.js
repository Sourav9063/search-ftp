import { createContext, useContext, useEffect, useState } from "react";

import React from "react";

export const MainDataContext = createContext(null);

export default function MainDataProvider({ children }) {
  const [mainData, setMainData] = useState();
  const [what, setWhat] = useState("");
  const [working, setWorking] = useState([]);
  const [notSure, setNotSure] = useState([]);
  useEffect(() => {
    const mediaFvrt = localStorage.getItem("mediaFvrt")
      ? JSON.parse(localStorage.getItem("mediaFvrt"))
      : [];
    const liveFvrt = localStorage.getItem("liveFvrt")
      ? JSON.parse(localStorage.getItem("liveFvrt"))
      : [];
    setMainData((state) => {
      return {
        ...state,
        liveFvrt,
        mediaFvrt,
      };
    });
    return () => {};
  }, []);

  return (
    <MainDataContext.Provider
      value={{
        mainData,
        setMainData,
        what,
        setWhat,
        working,
        setWorking,
        notSure,
        setNotSure,
      }}
    >
      {children}
    </MainDataContext.Provider>
  );
}

export const useMainData = () => useContext(MainDataContext);
