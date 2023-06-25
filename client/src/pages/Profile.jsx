import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [specialInterests, setSpecialInterests] = useState("");
  const [treatmentsOffered, setTreatmentsOffered] = useState("");
  const [insuranceAccepted, setInsuranceAccepted] = useState("");
  const [Availability, setAvailability] = useState("");

  const [isDoctor, setIsDoctor] = useState(false); // Set to true to see doctor profile details
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/auth/login");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Please fill in all fields");
      return;
    }
    // Submit form logic
  };

  useEffect(() => {
    // Check if the user is a doctor (based on your authentication/authorization logic)
    // Set the isDoctor state to true if the user is a doctor
    const checkDoctorStatus = () => {
      // Perform the logic to check if the user is a doctor
      // Example: Make an API request to fetch the user's role or check a flag in the user's data
      const userIsDoctor = true; // Replace this with your actual logic
      setIsDoctor(userIsDoctor);
    };

    checkDoctorStatus();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <div className="border bg-sky-50 rounded-lg m-16 p-12 flex-grow">
        <div className="flex flex-col text-center items-center content-center">
          <h1 className="font-bold text-2xl">Manage Account</h1>
          <p className="p-6 italic font-light">
            Note that only Physician Profile owners are able to edit their profile details at this time.
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

            {isDoctor && (
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
                <label
                htmlFor="Insurance Accepted"
                className="font-light text-gray-700"
              >
                Insurance Accepted
              </label>
              <textarea
                id="insuranceAccepted"
                name="insuranceAccepted"
                className="w-full p-2 border rounded shadow-lg"
                value={insuranceAccepted}
                onChange={(e) => setInsuranceAccepted(e.target.value)}
                required
              />
              <label
              htmlFor="availavility"
              className="font-light text-gray-700"
            >
              Availability
            </label>
            <textarea
              id="availability"
              name="availability"
              className="w-full p-2 border rounded shadow-lg"
              value={Availability}
              onChange={(e) => setAvailability(e.target.value)}
              required
            />
              </div>
            )}

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
      <Footer></Footer>
    </div>
  );
};

export default Profile;
