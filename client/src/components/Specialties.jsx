import React from "react";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";
import { faBrain } from "@fortawesome/free-solid-svg-icons";
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { faTooth } from "@fortawesome/free-solid-svg-icons";
import { faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { faHandHoldingMedical } from "@fortawesome/free-solid-svg-icons";
import SpecialtyCard from "./SpecialtyCard";

const Specialties = () => {
  return (
    <div className="max-w-[60%] w-screen h-auto mx-auto text-center lg:grid-cols-3 grid grid-cols-2 gap-4 justify-center my-16">
      <SpecialtyCard icon={faHeartPulse} text="Cardiology" />
      <SpecialtyCard icon={faBrain} text="Neurology" />
      <SpecialtyCard icon={faUserDoctor} text="Primary Care" />
      <SpecialtyCard icon={faTooth} text="Dentist" />
      <SpecialtyCard icon={faStethoscope} text="Pediatrician" />
      <SpecialtyCard icon={faHandHoldingMedical} text="Therapy" />
    </div>
  );
};

export default Specialties;
