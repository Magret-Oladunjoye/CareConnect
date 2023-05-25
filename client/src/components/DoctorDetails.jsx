import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../DoctorDetails.css";

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`/search_doctor/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        setDoctor(data);
      } catch (error) {
        console.error('Failed to fetch doctor details:', error);
        // You can also update the component state to show an error message to the user.
      }
    };
    fetchDoctor();
  }, [id]);

  if (doctor === null) {
    return <div>Loading...</div>;
  }

  const {
    Name,
    Specialty,
    About,
    Hospital,
    Location,
    Special_Interests,
    Treatments_Offered,
    Work_Experience,
    Image_Src,
  } = doctor;

  return (
    <div className="doctor-details">
      <img src={Image_Src} alt={`${Name}`} className="doctor-details__image" />
      <h2 className="doctor-details__heading">{Name}</h2>
      <h2 className="doctor-details__heading">{Specialty}</h2>
      <p>
        Is this you? 
        <Link to={`/claim_profile/${id}`} style={{ color: 'blue' }}>
          Claim Profile
        </Link>
      </p>

      <p className="doctor-details__text">About: {About}</p>
      <p className="doctor-details__text">Hospital: {Hospital}</p>
      <p className="doctor-details__text">Location: {Location}</p>
      <p className="doctor-details__text">Special Interests: {Special_Interests}</p>
      <p className="doctor-details__text">Treatments Offered: {Treatments_Offered}</p>
      <p className="doctor-details__text">Work Experience: {Work_Experience}</p>
    </div>
  );
};

export default DoctorDetails;
