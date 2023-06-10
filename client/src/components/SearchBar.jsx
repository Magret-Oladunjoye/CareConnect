import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../SearchContext";
import { useTranslation } from "react-i18next";
import { useAuth } from "../AuthContext";

const SearchBar = () => {
  const { t } = useTranslation();
  const { handleSearch, doctors } = useSearch();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const navigate = useNavigate();
  // Retrieve the user's username from the local storage
  const username = localStorage.getItem("username");

  const handleSearchClick = async (e) => {
    e.preventDefault(); // Prevent the default behavior of the button click

    // Fetch doctors based on searchTerm and locationTerm
    const data = await handleSearch(searchTerm, locationTerm);


    // Save search history only if the data is fetched successfully
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

  const saveSearchHistory = async (data) => {
    try {
      console.log(data)
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

  return (
    <div className="">
      {/* Search bar */}
      <div className="justify-center flex flex-col md:flex-row">
        <label className="w-[60%] md:w-auto bg-gray-200 border border-gray-300 text-gray-500 font-sans shadow-xl rounded-sm px-4 py-2 mx-auto">
          {t("SEARCH")}
        </label>
        <input
          type="text"
          className="block w-[60%] mx-auto px-4 py-2 bg-white border shadow-xl focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder={t("Doctor, Specialty")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
