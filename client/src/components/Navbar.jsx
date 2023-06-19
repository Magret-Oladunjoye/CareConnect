import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { useAuth } from "../AuthContext";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="bg-sky-100 drop-shadow-lg">
      <select
        className="bg-sky-100 drop-shadow-lg"
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="tr">Türkçe</option>
      </select>
    </div>
  );
}

const Navbar = () => {
  const { t } = useTranslation();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const username = localStorage.getItem("username");
  let navigate = useNavigate();
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false); // Add this line
    navigate("/auth/login");
  };

  return (
    <div className="flex justify-between items-center h-15 w-screen mx-auto px-4 bg-sky-100 drop-shadow-lg">
      <header className="px-4 py-2">
        <a
          onClick={() => {
            navigate("/");
          }}
          className="hover:cursor-pointer"
        >
          <img src={logo} width="250" alt="Logo" />
        </a>
      </header>

      <ul className="invisible lg:visible lg:flex space-x-4">
        {localStorage.getItem("is_admin") === "true" && (
          <li
            onClick={() => {
              navigate("/admin/doctor_claims");
            }}
            className="p-4 hover:cursor-pointer"
          >
            {t("Admin Dashboard")}
          </li>
        )}

        {localStorage.getItem("access_token") && (
          <React.Fragment>
            <li
              onClick={() => {
                navigate("/auth/profile");
              }}
              className="text-white border bg-800 hover:bg-700 rounded-2xl text-lg px-6 py-2 text-center drop-shadow-xl"
            >
              {t(" Manage Account")}
            </li>
            <button
              onClick={handleLogout}
              type="button"
              className="border border-700 rounded-2xl px-6 py-2 hover:underline"
            >
              {t("Logout")}
            </button>
          </React.Fragment>
        )}

        {!localStorage.getItem("access_token") && (
          <button
            onClick={() => {
              navigate("/auth/login");
            }}
            type="button"
            className="text-white font-semibold bg-800 hover:text-white border border-900 hover:bg-700 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 drop-shadow-xl"
          >
            Sign In
          </button>
        )}
      </ul>
      <div onClick={handleNav} className="block lg:hidden">
        {nav ? (
          <AiOutlineClose size={20} svg className="fill-black" />
        ) : (
          <AiOutlineMenu size={20} svg className="fill-black" />
        )}
      </div>
      <div
        className={`bg-700 opacity-80 w-full p-4 lg:hidden lg:w-auto shadow-lg border border-700 rounded-lg ${
          nav ? "" : "hidden"
        }`}
      >
        <header className="px-6 py-6">
          <img src={logo} width="250" alt="Logo" />
        </header>
        <ul className="text-lg font-light rounded-lg text-white text-center hover:cursor-pointer">
          <li
            onClick={() => {
              navigate("/");
            }}
            className="block py-2 hover:bg-800 md:border-0 md:p-0"
          >
            Home
          </li>
          <hr />
          <li
            onClick={() => {
              navigate("/auth/login");
            }}
            className="p-4 border-b border-900 text-black hover:cursor-pointer"
          >
            Login
          </li>
          <hr />
          {/*  Couldn't figure out how to add this: "if logged in -> log out & manage account visible"
          <li className="block py-2 hover:bg-800 md:border-0 md:p-0">
            <button onClick={handleLogin}>
              {loggedIn ? "Manage Account" : "Login"}
            </button>
          </li>
          <hr />
          <li
            className={`block py-2 hover:bg-800 md:border-0 md:p-0 ${
              loggedIn ? "" : "hidden"
            }`}
          >
            <button onClick={handleLogout}>{loggedIn ? "Log Out" : ""}</button>
          </li> */}
          {localStorage.getItem("is_admin") === "true" && (
            <li
              onClick={() => {
                navigate("/admin/doctor_claims");
              }}
              className="p-4 hover:cursor-pointer"
            >
              Admin Dashboard
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
