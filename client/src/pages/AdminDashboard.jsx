import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const AdminDashboard = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

  // Check if user is an admin on component mount
  useEffect(() => {
    if (localStorage.getItem("is_admin") !== "true") {
      navigate("/"); // Redirect to homepage if user is not an admin
    } else {
      fetchClaims();
    }
  }, [navigate]);

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

  const openModal = (claim) => {
    setSelectedClaim(claim);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedClaim(null);
    setShowModal(false);
  };

  const sendApprovalEmail = async (doctorId, name) => {
    try {
      await axios.post(`/admin/doctor_claims/${doctorId}/send_approval_email`);
      console.log("Approval email sent");
    } catch (error) {
      console.error("Failed to send approval email", error);
    }
  };

  const handleClaimStatusUpdate = async (status) => {
    try {
      await fetch(`/admin/doctor_claims/${selectedClaim.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ status: status.toLowerCase() }),
      });
      if (status === "Approved") {
        const { email, name } = selectedClaim;
        sendApprovalEmail(email, `${name} `);
      }
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
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => openModal(claim)}
                      >
                        Update Status
                      </button>
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
      {showModal && selectedClaim && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Update Claim Status</h2>
            <p>Selected Claim ID: {selectedClaim.id}</p>
            <p>Select an option:</p>
            <div className="flex mt-2">
              <button
                className="mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleClaimStatusUpdate("Approved")}
              >
                Approve Claim
              </button>
              <button
                className="mr-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleClaimStatusUpdate("Rejected")}
              >
                Reject Claim
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleClaimStatusUpdate("Pending")}
              >
                Leave Pending
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AdminDashboard;
