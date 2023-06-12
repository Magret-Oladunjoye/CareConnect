import React from "react";
import { Link } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const { Name, Specialty, Location, Image_Src, Ratings } = doctor;

  const doctorImageSrc = Image_Src || "/images/avatar.png";

  return (
    <div className="doctor-card">
      <div className="doctor-card__image">
        <img src={doctorImageSrc} alt={`Dr. ${Name}`} />
      </div>
      <div className="doctor-card__info">
        <p>{Name}</p>
        <p>Specialty: {Specialty}</p>
        <p>Location: {Location}</p>
        
        <Link to={`/doctor/${doctor.id}`} className="doctor-card__link">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
