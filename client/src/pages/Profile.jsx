import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Profile = () => {
  const { setIsLoggedIn } = useAuth();
  const [userDetails, setUserDetails] = useState({});
  const [editableFields, setEditableFields] = useState({
    phone_number: "",
    address: "",
    date_of_birth: "",
    gender: "",
  });
  const [username, setUsername] = useState("");
  const location = useLocation();
  let navigate = useNavigate();
  const [data, setData] = useState(null); // declare data in the component scope

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/auth/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }, 
        });
        const data = await response.json();
        
        if (response.ok) {
          setUserDetails(data);
          setEditableFields({
            phone_number: data.phone_number || "",
            address: data.address || "",
            date_of_birth: data.date_of_birth || "",
            gender: data.gender || "",
          })
        } else {
          navigate("/auth/login");
        }        
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    setUsername(localStorage.getItem("username"));
    
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/auth/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableFields((prev) => ({ ...prev, [name]: value }));
  };


  const handleSaveChanges = async () => {
    // Implement saving changes to the server.
    try {
      const response = await fetch("/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(editableFields),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUserDetails(updatedData);
        alert("Changes saved successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="py-28 mb-28">
        <main className="flex items-center w-full md:px-20">
          <div className="hidden md:inline-flex flex-col flex-1 space-y-1">
            <header className="px-4 py-2">
            {console.log(userDetails.username)}
              <h1 className="text-2xl font-bold text-black">{username}'s Profile</h1>
            </header>
            {/* Phone Number */}
            <div className="p-4 border border-gray-400 rounded-md">
              <p className="font-medium text-gray-600">Phone Number:</p>
              <input
                name="phone_number"
                value={editableFields.phone_number}
                onChange={handleInputChange}
                className="text-gray-800 w-full"
              />
            </div>
            {/* Address */}
            <div className="p-4 border border-gray-400 rounded-md">
              <p className="font-medium text-gray-600">Address:</p>
              <input
                name="address"
                value={editableFields.address}
                onChange={handleInputChange}
                className="text-gray-800 w-full"
              />
            </div>
            {/* Date of Birth */}
            <div className="p-4 border border-gray-400 rounded-md">
              <p className="font-medium text-gray-600">Date of Birth:</p>
              <input
                name="date_of_birth"
                value={editableFields.date_of_birth}
                onChange={handleInputChange}
                className="text-gray-800 w-full"
              />
            </div>
            {/* Gender */}
            <div className="p-4 border border-gray-400 rounded-md">
              <p className="font-medium text-gray-600">Gender:</p>
              <input
                name="gender"
                value={editableFields.gender}
                onChange={handleInputChange}
                className="text-gray-800 w-full"
              />
            </div>
            {/* Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handleSaveChanges}
                type="button"
                className="text-white font-semibold bg-blue-600 hover:text-white border border-blue-600 hover:bg-blue-700 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 drop-shadow-xl"
              >
                Save Changes
              </button>
              <button
                onClick={handleLogout}
                type="button"
                className="text-white font-semibold bg-red-600 hover:text-white border border-red-600 hover:bg-red-700 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 drop-shadow-xl"
              >
                Logout
              </button>
              <button
                onClick={() => {
                  navigate("/");
                }}
                type="button"
                className="text-white font-semibold bg-800 hover:text-white border border-900 hover:bg-700 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 drop-shadow-xl"
              >
                Home
              </button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );


};

export default Profile;
