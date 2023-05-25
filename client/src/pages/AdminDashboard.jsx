import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [claims, setClaims] = useState([]);
  const navigate = useNavigate();

  // Check if user is an admin on component mount
  useEffect(() => {
    if (localStorage.getItem('is_admin') !== 'true') {
      navigate('/'); // Redirect to homepage if user is not an admin
    } else {
      fetchClaims();
    }
  }, []); // Add navigate and fetchClaims to dependencies if they can change over time

  const fetchClaims = async () => {
    // Replace with your API endpoint for fetching doctor claims
    const response = await fetch("/admin/doctor_claims", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    const data = await response.json();
    setClaims(data.data);
    console.log(claims); // Log the claims variable
  };

  const updateClaimStatus = async (claimId, status) => {
    // Replace with your API endpoint for updating doctor claims
    await fetch(`/admin/doctor_claims/${claimId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify({ status }),
    });
    fetchClaims();
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Professional ID</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim.id}>
              <td>{claim.id}</td>
              <td>{claim.full_name}</td>
              <td>{claim.email}</td>
              <td>{claim.phone_number}</td>
              <td>{claim.professional_id}</td>
              <td>{claim.status}</td>
              <td>
                <button
                  className="btn btn-success me-2"
                  onClick={() => updateClaimStatus(claim.id, "approved")}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => updateClaimStatus(claim.id, "rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default AdminDashboard;
