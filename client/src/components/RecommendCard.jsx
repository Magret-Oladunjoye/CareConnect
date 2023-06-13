import React from "react";
import { Link } from "react-router-dom";
import "../RecommendCard.css";

const RecommendCard = ({ doctor }) => {
  const { Name, Specialty, Location, Image_Src, Ratings } = doctor;

  const doctorImageSrc = Image_Src || "/images/avatar.png";

  return (
  <div className="recommend-card">
    <div className="recommend-card__image img">
      <img src={doctorImageSrc} alt={`Dr. ${Name}`} />
    </div>
    <div className="recommend-card__info">
      <p>{Name}</p>
      <p>Specialty: {Specialty}</p>
      <p>Location: {Location}</p>
      <Link to={`/doctor/${doctor.id}`} className="recommend-card__link">
        Learn More
      </Link>
    </div>
  </div>
);

};

export default RecommendCard;
