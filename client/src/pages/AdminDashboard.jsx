import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is an admin on component mount
  useEffect(() => {
    if (localStorage.getItem("is_admin") !== "true") {
      navigate("/"); // Redirect to homepage if user is not an admin
    } else {
      fetchClaims();
    }
  }, []); // Add navigate and fetchClaims to dependencies if they can change over time

  const fetchClaims = async () => {
    try {
      const response = await fetch("/admin/doctor_claims", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch claims");
      }
      const data = await response.json();
  
      // Ensure the claims have the correct initial status
      const updatedClaims = data.data.map((claim) => ({
        ...claim,
        status: claim.status || "Pending",
      }));
  
      setClaims(updatedClaims);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  

  const updateClaimStatus = async (claimId, status) => {
    try {
      await fetch(`/admin/doctor_claims/${claimId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ status }),
      });
      fetchClaims();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto border bg-sky-50 rounded-lg m-16 p-12 flex-grow">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b">ID</th>
                <th className="px-6 py-3 border-b">First name</th>
                <th className="px-6 py-3 border-b">Last Name</th>
                <th className="px-6 py-3 border-b">Email</th>
                <th className="px-6 py-3 border-b">Phone Number</th>
                <th className="px-6 py-3 border-b">Status</th>
                <th className="px-6 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim.id}>
                <td className="px-6 py-4 border-b sm:px-3 sm:py-2">
                {claim.id}
              </td>
              <td className="px-6 py-4 border-b sm:px-3 sm:py-2">
                {claim.first_name}
              </td>
              <td className="px-6 py-4 border-b sm:px-3 sm:py-2">
                {claim.last_name}
              </td>
              <td className="px-6 py-4 border-b sm:px-3 sm:py-2">
                {claim.email}
              </td>
              
                  <td className="px-6 py-4 border-b">{claim.phone_number}</td>
                  <td className="px-6 py-4 border-b">{claim.status}</td>
                            <td className="px-6 py-4 border-b">
            {claim.status === "Pending" ? (
              <div className="flex">
                <button
                  className="mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => updateClaimStatus(claim.id, "approved")}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => updateClaimStatus(claim.id, "rejected")}
                >
                  Reject
                </button>
              </div>
            ) : (
              <span className="text-gray-400">Claim {claim.status}</span>
            )}
          </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
