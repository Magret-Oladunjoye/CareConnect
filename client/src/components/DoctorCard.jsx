import React from "react";
import { Link } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const { Name, Specialty, Location, Image_Src, Ratings } = doctor;

  const doctorImageSrc = Image_Src || "/images/avatar.png";

  const averageRating = Ratings.length
    ? Ratings.reduce((total, rating) => total + rating) / Ratings.length
    : 0;

  return (
    <div className="doctor-card">
      <div className="doctor-card__image">
        <img src={doctorImageSrc} alt={`Dr. ${Name}`} />
      </div>
      <div className="doctor-card__info">
        <p>{Name}</p>
        <p>Specialty: {Specialty}</p>
        <p>Location: {Location}</p>
        <p>Average Rating: {averageRating}</p>
        <div className="hover:underline text-sky-900">
        <a href={`/doctor/${doctor.id}`} >
        View Details
      </a></div>
      </div>
    </div>
  );
};

export default DoctorCard;
