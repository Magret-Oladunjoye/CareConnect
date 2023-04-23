import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "../SearchContext";
import "../Doctorlist.css";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <img src={doctor.Image_Src} alt={`Dr. ${doctor.Name}`} />
      <h3>{doctor.Name}</h3>
      <p>Specialty: {doctor.Specialty}</p>
      <p>Location: {doctor.Location}</p>
      <Link to={`/search_doctor/${doctor.ID}`}>View Details</Link>
    </div>
  );
};

const Doctorlist = () => {
  const { doctors, loading } = useSearch();

  useEffect(() => {
    console.log("Doctors updated:", doctors);
  }, [doctors]);

  console.log("Current doctors state:", doctors);
  console.log("Current loading state:", loading);

  return (
    <div className="doctor-list">
      {loading ? (
        <p>Loading...</p>
      ) : (
        doctors.map((doctor) => <DoctorCard key={doctor.ID} doctor={doctor} />)
      )}
    </div>
  );
};

export default Doctorlist;
