import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const UserProfileManagement = ({ users, deleteUser }) => {
  return (
    <div className="container mx-auto border bg-sky-50 rounded-lg m-16 p-12 flex-grow">
      <h1 className="text-2xl font-bold mb-4">User Profile Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b">ID</th>
              <th className="px-6 py-3 border-b">Username</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 border-b sm:px-3 sm:py-2">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 border-b sm:px-3 sm:py-2">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 border-b sm:px-3 sm:py-2">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 border-b">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DoctorClaimTable = ({ claims, deleteClaim, sendApprovalEmail }) => {
  return (
    <div className="container mx-auto border bg-sky-50 rounded-lg m-16 p-12 flex-grow">
      <h1 className="text-2xl font-bold mb-4">Doctor claims</h1>
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
                      onClick={() => sendApprovalEmail(claim.id, claim.name)}
                    >
                      Send Approval Email
                    </button>
                  ) : (
                    <span className="text-gray-400">Claim {claim.status}</span>
                  )}
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => deleteClaim(claim.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const UserCommentTable = ({ comments, deleteComment }) => {
  return (
    <div className="container mx-auto border bg-sky-50 rounded-lg m-16 p-12 flex-grow">
      <h1 className="text-2xl font-bold mb-4">User Comments</h1>
      <div className="overflow-x-auto">
        {comments.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b">ID</th>
                <th className="px-6 py-3 border-b">User</th>
                <th className="px-6 py-3 border-b">Comment</th>
                <th className="px-6 py-3 border-b">Timestamp</th>
                <th className="px-6 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={comment.id}>
                  <td className="px-6 py-4 border-b sm:px-3 sm:py-2">
                    {comment.id}
                  </td>
                  <td className="px-6 py-4 border-b sm:px-3 sm:py-2">
                    {comment.username}
                  </td>
                  <td className="px-6 py-4 border-b sm:px-3 sm:py-2">
                    {comment.comment}
                  </td>
                  <td className="px-6 py-4 border-b sm:px-3 sm:py-2">
                    {comment.timestamp}
                  </td>
                  <td className="px-6 py-4 border-b">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => deleteComment(comment.id)}
                      
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No comments found.</p>
        )}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);

  const [claims, setClaims] = useState([]);
  const [loadingClaims, setLoadingClaims] = useState(true);
  const [errorClaims, setErrorClaims] = useState(null);

  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [errorComments, setErrorComments] = useState(null);

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = () => {
    if (localStorage.getItem("is_admin") !== "true") {
      navigate("/"); // Redirect to homepage if user is not an admin
    } else {
      fetchUsers();
      fetchClaims();
      fetchComments();
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setUsers(response.data);
      setLoadingUsers(false);
    } catch (error) {
      setErrorUsers(error.message);
      setLoadingUsers(false);
    }
  };

  const fetchClaims = async () => {
    try {
      const response = await axios.get("/admin/doctor_claims", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = response.data.data.map((claim) => ({
        ...claim,
        status: claim.status || "Pending",
      }));
      setClaims(data);
      setLoadingClaims(false);
    } catch (error) {
      setErrorClaims(error.message);
      setLoadingClaims(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get("/admin/user/comments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setComments(response.data);
      setLoadingComments(false);
    } catch (error) {
      setErrorComments(error.message);
      setLoadingComments(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log("User deleted successfully");
      // Refresh users list
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const deleteClaim = async (claimId) => {
    try {
      await axios.delete(`/admin/doctor_claims/${claimId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log("Claim deleted successfully");
      // Refresh claims list
      fetchClaims();
    } catch (error) {
      console.error("Failed to delete claim", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`/admin/user/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log("Comment deleted successfully");
      // Refresh comments list
      fetchComments();
    } catch (error) {
      console.error("Failed to delete comment", error);
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

  const handleClaimStatusUpdate = async (status) => {
    try {
      await axios.put(
        `/admin/doctor_claims/${selectedClaim.id}`,
        { status: status.toLowerCase() },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (status === "Approved") {
        const { email, name } = selectedClaim;
        sendApprovalEmail(email, `${name} `);
      }
    } catch (error) {
      console.error("Failed to update claim status", error);
    }
  };

  const sendApprovalEmail = async (claimId, name) => {
    try {
      await axios.get(
        `/admin/doctor_claims/${claimId}/send_approval_email`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log("Approval email sent");
    } catch (error) {
      console.error("Failed to send approval email", error);
    }
  };
  
  if (loadingClaims || loadingComments) {
    return <p>Loading...</p>;
  }

  if (errorClaims || errorComments) {
    return <p>Error: {errorClaims || errorComments}</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="flex flex-col">
          <UserProfileManagement
            users={users}
            deleteUser={deleteUser}
          />
          <DoctorClaimTable
            claims={claims}
            deleteClaim={deleteClaim}
            sendApprovalEmail={sendApprovalEmail}
            openModal={openModal}
          />
          <UserCommentTable
            comments={comments}
            deleteComment={deleteComment}
          />
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
