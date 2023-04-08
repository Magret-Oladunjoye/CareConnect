import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Specialties from "../components/Specialties";
import Footer from "../components/Footer";
import About from "../components/About";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <hr></hr>
      <Specialties />
      <hr></hr>
      <About />
      <hr></hr>
      <Footer />
    </>
  );
};

export default Home;
