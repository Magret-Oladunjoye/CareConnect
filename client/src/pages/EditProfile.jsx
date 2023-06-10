import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [specialInterests, setSpecialInterests] = useState("");
  const [treatmentsOffered, setTreatmentsOffered] = useState("");

  const [isDoctor, setIsDoctor] = useState(false); //set to true to see dr profile details
  const navigate = useNavigate();

  // form submission and user context not implemented
  const handleLogout = () => {
    // Perform logout logic here
    navigate("/login");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Please fill in all fields");
      return;
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar></NavBar>
      <div className="border bg-sky-50 rounded-lg m-16 p-12 flex-grow">
        <div className="flex flex-col text-center items-center content-center ">
          <h1 className="font-bold text-2xl">Manage Account</h1>
          <p className="p-6 italic font-light">
            Note that only Physician Profile owners are able to edit their
            profile details at this time.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center first-letter max-w-lg"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First and Last Name*"
              className="shadow border rounded py-3 px-3 text-gray-700 focus:shadow-outline"
            />
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail*"
              className="shadow border rounded py-3 px-3 text-gray-700 focus:shadow-outline"
            />
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow border rounded py-3 px-3 text-gray-700 focus:shadow-outline"
              placeholder="********"
            />

            {isDoctor ? (
              <div className="text-left">
                <br />
                <h1 className="font-bold text-center text-xl text-gray-800">
                  Profile Details
                </h1>
                <label htmlFor="about" className="font-light">
                  About
                </label>
                <textarea
                  id="about"
                  name="about"
                  className="w-full p-2 border rounded shadow-lg"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  required
                />
                <label
                  htmlFor="workExperience"
                  className="font-light text-gray-700"
                >
                  Work Experience
                </label>
                <textarea
                  id="workExperience"
                  name="workExperience"
                  className="w-full p-2 border rounded shadow-lg"
                  value={workExperience}
                  onChange={(e) => setWorkExperience(e.target.value)}
                  required
                />
                <label
                  htmlFor="specialInterests"
                  className="font-light text-gray-700"
                >
                  Special Interests
                </label>
                <textarea
                  id="specialInterests"
                  name="specialInterests"
                  className="w-full p-2 border rounded shadow-lg"
                  value={specialInterests}
                  onChange={(e) => setSpecialInterests(e.target.value)}
                  required
                />
                <label
                  htmlFor="treatmentsOffered"
                  className="font-light text-gray-700"
                >
                  Treatments Offered
                </label>
                <textarea
                  id="treatmentsOffered"
                  name="treatmentsOffered"
                  className="w-full p-2 border rounded shadow-lg"
                  value={treatmentsOffered}
                  onChange={(e) => setTreatmentsOffered(e.target.value)}
                  required
                />
              </div>
            ) : (
              <></>
            )}
            {/* this button does nothing right now, add onClick action to handle form submission */}
            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="border rounded-lg m-8 md:w-96 w-64 py-2 bg-800 hover:bg-700 text-white font-bold"
              >
                Update
              </button>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <button
                  onClick={handleLogout}
                  className="rounded-lg font-bold text-red-500 underline hover:text-red-800 hover:underline"
                >
                  Logout
                </button>
              </a>
            </div>
          </form>
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default EditProfile;
