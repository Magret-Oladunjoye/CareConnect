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

const Specialties = () => {
  const { handleSearch } = useSearch();
  const navigate = useNavigate();


  const handleClick = async (specialty) => {
    const data = await handleSearch(specialty, "");
    console.log("data", data);
    navigate("/search_doctors");
  };


  return (
    <div>
    <h2 className="text-2xl font-bold mb-4 text-sky-900 justify-center">Popular Specialties</h2>
    <div className="max-w-[60%] w-screen h-auto mx-auto text-center lg:grid-cols-3 grid grid-cols-2 gap-4 justify-center my-16">
    
      <SpecialtyCard
        icon={faHeartPulse}
        text="Cardiology"
        onClick={() => handleClick("cardio")}
      />
      <SpecialtyCard
        icon={faBrain}
        text="Neurology"
        onClick={() => handleClick("neuro")}
      />
      <SpecialtyCard
        icon={faUserDoctor}
        text="Primary Care"
        onClick={() => handleClick("internal")}
      />
      <SpecialtyCard
      icon={faClinicMedical}
      text="Oncology"
        onClick={() => handleClick("oncolo")}
      />
      <SpecialtyCard
        icon={faStethoscope}
        text="Pediatrician"
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
