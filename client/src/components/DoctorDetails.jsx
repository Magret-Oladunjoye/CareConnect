import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      const response = await fetch(`/search_doctors?id=${id}`);
      const data = await response.json();
      if (data.length > 0) {
        setDoctor(data[0]);
      }
    };
    fetchDoctor();
  }, [id]);


  if (!doctor) {
    return <div>Loading...</div>;
  }

  const {
    Name,
    Specialty,
    About,
    Hospital,
    Location,
    Special_Interests,
    Treatments_Offered,
    Work_Experience,
    Image_Src,
  } = doctor;

  return (
    <div className="doctor-details">
      <img src={Image_Src} alt={`Dr. ${Name}`} />
      <h2>{Name}</h2>
      <p>Specialty: {Specialty}</p>
      <p>About: {About}</p>
      <p>Hospital: {Hospital}</p>
      <p>Location: {Location}</p>
      <p>Special Interests: {Special_Interests}</p>
      <p>Treatments Offered: {Treatments_Offered}</p>
      <p>Work Experience: {Work_Experience}</p>
    </div>
  );
};

export default DoctorDetails;
