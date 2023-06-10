import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const ClaimProfile = () => {
  const { id } = useParams();
  const [claimData, setClaimData] = useState({
    doctor_id: id,
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
  });

  const handleChange = (event) => {
    setClaimData({
      ...claimData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(claimData, id); // Add this line
      const response = await fetch(`/doctor/claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(claimData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      alert('Claim request submitted successfully!');
    } catch (error) {
      alert(`Failed to submit claim: ${error.message}`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="border bg-sky-50 rounded-lg w-auto m-16 p-12 content-center text-center">
        <h1 className="font-bold text-2xl">File a Claim Request</h1>
        <p className="p-6">
          Fill out the form to access your CareConnect Physician Profile and join our health network today!
        </p>
        <form onSubmit={handleSubmit} className="grid justify-center">
          <input
            type="text"
            value={claimData.first_name}
            onChange={handleChange}
            name="first_name"
            placeholder="Practitioner First Name*"
            className="border rounded-md p-3 mb-4"
            required
          />
          <input
            type="text"
            value={claimData.last_name}
            onChange={handleChange}
            name="last_name"
            placeholder="Practitioner Last Name*"
            className="border rounded-md p-3 mb-4"
            required
          />
          <input
            type="email"
            value={claimData.email}
            onChange={handleChange}
            name="email"
            placeholder="E-mail*"
            className="border rounded-md p-3 mb-4"
            required
          />
          <input
            type="tel"
            value={claimData.phone_number}
            onChange={handleChange}
            name="phone_number"
            placeholder="Phone Number*"
            className="border rounded-md p-3 mb-4"
            required
          />
          <div>
            <p className="italic font-extralight">
              *Note that we may need further proof in order to verify your identity.
            </p>
            <button type="submit" className="border rounded-md m-4 py-2 px-6 bg-800 hover:bg-700 text-white">
              Submit
            </button>
          </div>
        </form>

        <a href="/" target="_blank" rel="noopener noreferrer">
          <button className="underline underline-offset-4 font-extralight">Are you a patient? Find care here.</button>
        </a>
      </div>

      <Footer />
    </div>
  );
};

export default ClaimProfile;
