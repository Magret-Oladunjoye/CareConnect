import React from "react";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";
import { faBrain } from "@fortawesome/free-solid-svg-icons";
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { faClinicMedical } from "@fortawesome/free-solid-svg-icons";
import { faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { faVenus } from "@fortawesome/free-solid-svg-icons";
import SpecialtyCard from "./SpecialtyCard";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../SearchContext";
import { useTranslation } from "react-i18next";

const Specialties = () => {
  const { t } = useTranslation();
  const { handleSearch } = useSearch();
  const navigate = useNavigate();


  const handleClick = async (specialty) => {
    const data = await handleSearch(specialty, "");
    console.log("data", data);
    navigate("/search_doctors");
  };


  return (
    <div className="text-center py-8">
    <h2 className="text-2xl font-bold mb-4 text-sky-900">{t("Popular Specialties")}</h2>
    <div className="max-w-[60%] w-screen h-auto mx-auto lg:grid-cols-3 grid grid-cols-2 gap-4 justify-center my-16">
    
      <SpecialtyCard
        icon={faHeartPulse}
        text={t("Cardiology")}
        onClick={() => handleClick("cardi")}
      />
      <SpecialtyCard
        icon={faBrain}
        text={t("Neurology")}
        onClick={() => handleClick("neuro")}
      />
      <SpecialtyCard
        icon={faUserDoctor}
        text={t("Primary Care")}
        onClick={() => handleClick("internal")}
      />
      <SpecialtyCard
      icon={faClinicMedical}
      text={t("Oncology")}
        onClick={() => handleClick("oncolo")}
      />
      <SpecialtyCard
        icon={faStethoscope}
        text={t("Pediatrician")}
        onClick={() => handleClick("diatric")}
      />
      <SpecialtyCard
        icon={faVenus}
        text="OB-GYN"
        onClick={() => handleClick("Gynae")}
      />

    </div>
    </div>
  );
};

export default Specialties;
