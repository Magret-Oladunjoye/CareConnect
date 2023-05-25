import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ClaimProfile = () => {
  const { id } = useParams();
  const [claimData, setClaimData] = useState({
    doctor_id: id,
    full_name: '',
    email: '',
    phone_number: '',
    professional_id: '',
    document: '',
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
      console.log(claimData); // Add this line
      const response = await fetch('/doctor/claim', {
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
    <form onSubmit={handleSubmit}>
      <label>
        Full Name:
        <input type="text" name="full_name" value={claimData.full_name} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={claimData.email} onChange={handleChange} required />
      </label>
      <label>
        Phone Number:
        <input type="tel" name="phone_number" value={claimData.phone_number} onChange={handleChange} required />
      </label>
      <label>
        Professional ID:
        <input type="text" name="professional_id" value={claimData.professional_id} onChange={handleChange} required />
      </label>
      <label>
        Document:
        <input type="text" name="document" value={claimData.document} onChange={handleChange} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ClaimProfile;
