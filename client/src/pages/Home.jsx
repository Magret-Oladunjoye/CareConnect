import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Specialties from "../components/Specialties";
import Footer from "../components/Footer";
import About from "../components/About";
import SearchBar from "../components/SearchBar";
import { useSearch } from "../SearchContext";
import { SearchProvider } from "../SearchContext";

const Home = () => {

  return (
    <SearchProvider>
      <Navbar />
      <Hero />
      <hr></hr>
      <Specialties />
      <hr></hr>
      <About />
      <hr></hr>
      <Footer />
    </SearchProvider>
  );
};

export default Home;
