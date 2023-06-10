import { useState } from "react";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SignupForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: name, email: email, password: password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-white text-black rounded-2xl shadow-2xl flex flex-col w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-in">
      <header className="px-4 py-2">
        <img src={logo} width="250" alt="Logo" />
      </header>

      <div className="inline-block border-[1px] justify-center w-20 border-600 border-solid"></div>
      <h3 className="text-xl font-light text-black pt-2">Create Your Account</h3>

      {/* Inputs */}
      <form className="flex flex-col items-center justify-center mt-2" onSubmit={handleSubmit}>
        <input
          type="text"
          className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="email"
          className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <button className="rounded-2xl m-4 text-white bg-600 w-3/5 px-4 py-2 shadow-md hover:text-600 hover:bg-white transition duration-200 ease-in">
          Sign Up
        </button>
      </form>
      {error && <p>{error}</p>}
      <div className="inline-block border-[1px] justify-center w-20 border-600 border-solid"></div>
      <p className="text-600 mt-4 text-sm">Already have an account?</p>
      <a
        href="/auth/login"
        className="text-600 mb-4 text-sm font-medium cursor-pointer underline"
      >
        Sign in to your account
      </a>
    </div>
  );
};

const Signup = () => {
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
              Get honest and transparent information, ratings, and reviews on your healthcare providers
            </p>
          </div>
          <SignupForm />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
