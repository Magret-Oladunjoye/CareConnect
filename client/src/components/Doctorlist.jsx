import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "../SearchContext";
import "../Doctorlist.css";
import Navbar from "../components/Navbar";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <div className="doctor-card__image">
        <img src={doctor.Image_Src} alt={`Dr. ${doctor.Name}`} />
      </div>
      <div className="doctor-card__details">
        <h3>{doctor.Name}</h3>
        <p>Specialty: {doctor.Specialty}</p>
        <p>Location: {doctor.Location}</p>
        <Link to={`/search_doctor/${doctor.ID}`}>View Details</Link>
      </div>
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
    <div>
    <Navbar />
    <div className="doctor-list">
      {loading ? (
        <p>Loading...</p>
      ) : (
        doctors.map((doctor) => <DoctorCard key={doctor.ID} doctor={doctor} />)
      )}
    </div>
    </div>
  );
};

export default Doctorlist;
