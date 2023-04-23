import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);

  const handleSearch = async (name, location) => {
    const response = await fetch("/search_doctors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name_term: name, location_term: location }),
    });

    const data = await response.json();
    setDoctors(data);
  };

  return (
    <SearchContext.Provider value={{ doctors, setDoctors, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
