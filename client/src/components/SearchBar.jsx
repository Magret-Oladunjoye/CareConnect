import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../SearchContext";
import { useTranslation } from "react-i18next";
import { useAuth } from "../AuthContext";
import "../suggestions.css";


const SearchBar = () => {
  const { t } = useTranslation();
  const searchInputRef = useRef(null);
  const { handleSearch, doctors } = useSearch();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleSearchClick = async (e) => {
    e.preventDefault();
    const data = await handleSearch(searchTerm, locationTerm);
    if (data) {
      const searchHistoryData = {
        username: username,
        searchTerm: searchTerm,
        locationTerm: locationTerm,
      };
      saveSearchHistory(searchHistoryData);
    }
    navigate("/search_doctors");
  };

  const positionSuggestions = () => {
    if (searchInputRef.current) {
      return searchInputRef.current.getBoundingClientRect();
    }

    return { top: 0, left: 0 };
  };

  const saveSearchHistory = async (data) => {
    try {
      const response = await fetch("/api/save_search_history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Search history saved successfully");
      } else {
        console.error("Failed to save search history:", response.status);
      }
    } catch (error) {
      console.error("Error saving search history:", error);
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length > 0) {
        const response = await fetch(`/api/suggestions?query=${searchTerm}`);
        const data = await response.json();
        // Limit the suggestions to the first 5 results
        setSuggestions(data.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    };
  
    fetchSuggestions();
  }, [searchTerm]);
  

  return (
    <div>
    <div className="justify-center flex flex-col md:flex-row">
    <label className="w-[60%] md:w-auto bg-gray-200 border border-gray-300 text-gray-500 font-sans shadow-xl rounded-sm px-4 py-2 mx-auto">
      {t("SEARCH")}
    </label>
    <div className="relative w-[60%] mx-auto">
      <input
        type="text"
        ref={searchInputRef}
        className="block w-full px-4 py-2 bg-white border shadow-xl focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
        placeholder={t("Doctor, Specialty")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((item, index) => (
            <li key={index} onClick={() => setSearchTerm(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
        <label className="w-[60%] md:w-auto bg-gray-200 border border-gray-300 text-gray-500 font-sans shadow-xl rounded-sm px-4 py-2 mx-auto">
          {t("NEAR")}
        </label>
        <input
          type="text"
          className="block w-[60%] mx-auto px-4 py-2 bg-white border shadow-xl focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder={t("Country, City")}
          value={locationTerm}
          onChange={(e) => setLocationTerm(e.target.value)}
        />

        <button
          type="button"
          className="w-[60%] mx-auto md:w-auto shadow-xl text-gray-500 border border-gray-300 bg-gray-200 hover:bg-gray-500 hover:text-white rounded-md p-2.5 text-center inline-flex justify-center"
          onClick={(e) => handleSearchClick(e)}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Icon description</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
