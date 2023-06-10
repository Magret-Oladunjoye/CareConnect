import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../DoctorDetails.css";
import ProfileBanner from './ProfileBanner';
import InfoTabs from './InfoTabs';
import CommentSection from "../components/CommentSection";
import Navbar from "../components/Navbar";

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`/search_doctor/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        setDoctor(data);
      } catch (error) {
        console.error('Failed to fetch doctor details:', error);
        // You can also update the component state to show an error message to the user.
      }
    };
    fetchDoctor();
  }, [id]);

  if (doctor === null) {
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
    Contact,
  } = doctor;

  return (
    <div className="doctor-details">
      <Navbar></Navbar>
      <ProfileBanner
        id={id}
        name={Name}
        specialty={Specialty}
        hospital={Hospital}
        location={Location}
        imageSrc={Image_Src}
      />
      <InfoTabs
        name={Name} 
        about={About}
        workExperience={Work_Experience}
        specialInterests={Special_Interests}
        treatmentsOffered={Treatments_Offered}
        contact={Contact}
      />
      <hr></hr>
      <CommentSection></CommentSection>
    </div>
  );
};

export default DoctorDetails;
