import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RecommendCard = ({ doctor }) => {
  const { t } = useTranslation();
  const { Name, Specialty, Location, Image_Src, Ratings } = doctor;

  const doctorImageSrc = Image_Src || "/images/avatar.png";

  return (
    <div className="flex flex-col md:flex-row m-auto items-center justify-center p-4">
      <div className="m-2"> 
        <div className="mx-auto">
          <img src={doctorImageSrc} alt="avatar" className="mx-auto rounded-full"/>
        </div>
        <div className="text-center">
          <p className="font-bold"> {Name}</p>
          <p>{t("Specialty")}: {Specialty}</p>
          <p>{t("Location")}: {Location}</p>
          <Link 
            to={`/doctor/${doctor.id}`} 
            className="inline-block mb-4 text-white text-center bg-sky-900 px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors duration-200"
          >
            {t("Learn More")}
          </Link>

        </div>
      </div>
    </div>
  );
  

};

export default RecommendCard;


