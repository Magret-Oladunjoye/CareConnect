import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SignUpForm from "./Signup";
import { UserContext } from "../lib/UserContext";

const LoginForm = ({ navigate, redirectToSignup, setRedirectToSignup }) => {
  const { setIsLoggedIn } = useAuth(); 
  const { updateUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (redirectToSignup) {
      navigate("/auth/signup");
      setRedirectToSignup(false);
    }
  }, [redirectToSignup, navigate, setRedirectToSignup]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    };
    try {
      const response = await fetch("/auth/login", requestOptions);
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("is_admin", data.is_admin); // store is_admin value
        updateUser({
          username: data.username,
          password: data.password
          // other user properties...
        });
        setIsLoggedIn(true);
        navigate("/");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
    navigate("/auth/login");
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-out">
      <header className="px-4 py-2">
        <img src={logo} width="250" alt="Logo" />
      </header>
      <div className="inline-block border-[1px] justify-center w-20 border-600 border-solid"></div>
      <h3 className="text-xl font-light text-black pt-2">Sign In</h3>
      {/* Inputs */}
      <div className="flex flex-col items-center justify-center">
        <input
          type="text"
          className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          type="password"
          className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          className="rounded-2xl m-2 text-white bg-700 w-2/5 px-4 py-2 shadow-md hover:text-700 hover:bg-white transition duration-200 ease-in"
          onClick={handleSubmit}
        >
          Log In
        </button>
        {errorMessage && (
          <p className="text-red-600 mt-4 text-sm">{errorMessage}</p>
        )}
      </div>
      <div className="inline-block border-[1px] justify-center w-20 border-600 border-solid"></div>
      <p className="text-600 mt-4 text-sm">Don't have an account?</p>
      <a href="/auth/signup"
        className="text-600 mb-4 text-sm font-medium cursor-pointer underline"
        
      >
        Create a New Account
      </a>
    </div>
  );
  
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [redirectToSignup, setRedirectToSignup] = useState(false);
  const navigate = useNavigate();


  return (
    <div>
      <Navbar />
      <div className="py-28 mb-28">
        <main className="flex items-center w-full md:px-20">
          <div className="hidden md:inline-flex flex-col flex-1 space-y-1">
            <header className="px-4 py-2">
              <img src={logo} width="250" alt="Logo" />
            </header>
            <p className="font-light text-lg leading-1 text-black">
              Get honest and transparent information, ratings, and reviews on
              your healthcare providers
            </p>
          </div>
          {isLogin ? (
            <LoginForm
              navigate={navigate}
              redirectToSignup={redirectToSignup}
              setRedirectToSignup={setRedirectToSignup}
            />
          ) : (
            <SignUpForm />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};


export default Login;
