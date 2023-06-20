import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Specialties from "../components/Specialties";
import Footer from "../components/Footer";
import About from "../components/About";
import Recommend from "../components/Recommend"
import SearchBar from "../components/SearchBar";
import { useSearch } from "../SearchContext";
import { SearchProvider } from "../SearchContext";
import { useTranslation } from "react-i18next";
import i18n from "i18next";



function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className= "bg-sky-100 drop-shadow-lg">
      <select className= "bg-sky-100 drop-shadow-lg"value={i18n.language} onChange={(e) => changeLanguage(e.target.value)}>
        <option  value="en">English</option>
        <option  value="tr">Türkçe</option>
        <option value="ar">العربية</option>
      </select>
    </div>
  );
}


const Home = () => {
  return (
    <>
      <LanguageSwitcher />
      <Navbar />
      <Hero />
      <hr></hr>
      <Specialties />
      <hr></hr>
      <Recommend />
      <hr></hr>
      <About />
      <hr></hr>
      <Footer />
    </>
  );
};

export default Home;
