import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";

const Navbar = () => {
  let navigate = useNavigate();
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex justify-between items-center h-24 w-screen mx-auto px-4 bg-sky-100 drop-shadow-lg">
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

      <ul className="invisible md:visible md:flex text-900 font-semibold">
        <li
          onClick={() => {
            navigate("/home");
          }}
          className="p-4 hover:cursor-pointer"
        >
          Home
        </li>
        <li className="p-4 hover:cursor-pointer">
          <Link
            onClick={() => {
              navigate("/about");
            }}
            to="about"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
          >
            About
          </Link>
        </li>
        <li className="p-4 hover:cursor-pointer">
          <Link to="footer" spy={true} smooth={true} offset={50} duration={500}>
            Resources
          </Link>
        </li>
        <button
          onClick={() => {
            navigate("/auth/login");
          }}
          type="button"
          className="text-white font-semibold bg-800 hover:text-white border border-900 hover:bg-700 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 drop-shadow-xl"
        >
          Sign In
        </button>
      </ul>
      <div onClick={handleNav} className="block md:hidden">
        {nav ? (
          <AiOutlineClose size={20} svg class="fill-black" />
        ) : (
          <AiOutlineMenu size={20} svg class="fill-black" />
        )}
      </div>
      <div
        className={
          nav
            ? "bg-700 fixed left-0 top-0 w-[60%] h-screen border-r ease-in-out duration-400"
            : "fixed left-[-100%]"
        }
      >
        <header className="px-6 py-6">
          <img src={logo} width="250" alt="Logo" />
        </header>

        <ul className="uppercase p-4 bg-700">
          <li
            onClick={() => {
              navigate("/home");
            }}
            className="p-4 border-b border-900 text-black hover:cursor-pointer"
          >
            Home
          </li>
          <li
            onClick={() => {
              navigate("/");
            }}
            className="p-4 border-b border-900 text-black hover:cursor-pointer"
          >
            About
          </li>
          <li className="p-4 border-b border-900 text-black">Info</li>
          <li
            onClick={() => {
              navigate("/auth/login");
            }}
            className="p-4 border-b border-900 text-black hover:cursor-pointer"
          >
            Login
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
