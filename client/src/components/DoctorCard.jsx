import React from 'react';
import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  const {
    ID,
    Name,
    Specialty,
    Location,
    Image_Src,
  } = doctor;

  return (
    <div className="doctor-card">
      <img src={Image_Src} alt={`Dr. ${Name}`} />
      <h3>{Name}</h3>
      <p>Specialty: {Specialty}</p>
      <p>Location: {Location}</p>
      <Link to={`/doctor/${ID}`}>View Details</Link>
    </div>
  );
};

