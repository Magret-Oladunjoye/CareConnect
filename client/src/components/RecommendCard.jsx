import React from "react";
import { Link } from "react-router-dom";

const RecommendCard = ({ doctor }) => {
  const { Name, Specialty, Location, Image_Src, Ratings } = doctor;

  const doctorImageSrc = Image_Src || "/images/avatar.png";

  return (
    <div className="flex flex-col md:flex-row m-auto items-center justify-center p-4">
        <div> 
          <div className="mx-auto">
            <img src={doctorImageSrc} alt="avatar" className="mx-auto rounded-full"/>
          </div>
          <div className="text-center">
            <p className="font-bold"> {Name}</p>
            <p>Specialty: {Specialty}</p>
            <p>Location: {Location}</p>
            <Link to={`/doctor/${doctor.id}`} className="recommend-card__link">
            Learn More
          </Link>
          </div>
        </div>
      </div>
);

};

export default RecommendCard;


