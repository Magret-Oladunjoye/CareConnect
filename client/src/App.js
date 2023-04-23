import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import About from "./components/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import { AuthProvider } from "./AuthContext";
import DoctorSearch from "./components/DoctorSearch";
import DoctorDetails from "./components/DoctorDetails";
import Doctorlist from "./components/Doctorlist";
import SearchBar from "./components/SearchBar";
import { SearchProvider } from "./SearchContext";

//<Route path="/search" element={<DoctorSearch />} />

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <SearchProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth/profile" element={<Profile />} />
            <Route path="/search_doctors" element={<Doctorlist />} />
            <Route path="/search_doctors/:id" element={<DoctorDetails />} />
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </div>
  );
}

export default App;










