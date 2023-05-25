import React, { createContext, useContext, useState, useEffect } from "react";

export const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
    
  useEffect(() => {
    const storedDoctors = localStorage.getItem("doctors");
    if (storedDoctors) {
      setDoctors(JSON.parse(storedDoctors));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("doctors", JSON.stringify(doctors));
  }, [doctors]);

  const handleSearch = (name, location) => {
    setLoading(true);
    return fetch("/search_doctors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name_term: name, location_term: location }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetched in SearchProvider:", data);
        setDoctors(data);
        setLoading(false);
        return data;
      });
  };
  return (
    <SearchContext.Provider value={{ doctors, setDoctors, handleSearch, loading }}>
      {children}
    </SearchContext.Provider>
  );
};
