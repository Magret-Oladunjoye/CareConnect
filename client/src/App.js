import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import About from "./components/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import { AuthProvider, useAuth } from "./AuthContext";
import DoctorSearch from "./components/DoctorSearch";
import DoctorDetails from "./components/DoctorDetails";
import Doctorlist from "./components/Doctorlist";
import SearchBar from "./components/SearchBar";
import { SearchProvider } from "./SearchContext";
import AdminDashboard from "./pages/AdminDashboard";
import ClaimProfile from "./pages/ClaimProfile";
import CommentProvider from "./lib/CommentContext";
import UserProvider from "./lib/UserContext";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "i18next";
import translationTR from "./locales/tr.json";

const AdminRoute = () => {
  const { isAdmin } = useAuth();

  return isAdmin ? <Outlet /> : <Navigate to="/auth/login" />;
};


function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <SearchProvider>
          <CommentProvider>
            <UserProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<Signup />} />
                <Route path="/about" element={<About />} />
                <Route path="/auth/profile" element={<Profile />} />
                <Route path="/search_doctors" element={<Doctorlist />} />
                <Route path="/search_doctor/:id" element={<DoctorDetails />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/doctor/claim/:id" element={<ClaimProfile />} />
                <Route path="/doctor/claim" element={<ClaimProfile />} />
              </Routes>
            </UserProvider>
          </CommentProvider>
        </SearchProvider>
      </AuthProvider>
    </I18nextProvider>
  );
}

export default App;
