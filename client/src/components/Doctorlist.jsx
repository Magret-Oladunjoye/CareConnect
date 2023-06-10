import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "../SearchContext";
import "../Doctorlist.css";
import Navbar from "../components/Navbar";
import SearchBar from "./SearchBar";
import { useTranslation } from 'react-i18next';
import avatar from "../images/avatar.png";


const availabilityOptions = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
];

const DoctorCard = ({ doctor }) => {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);
  let ratings = [];
  if (doctor.Ratings) {
    ratings = doctor.Ratings.split(',').map(Number);
  }

  const ratingsCount = ratings.length;
  const averageRating = ratingsCount > 0 ? ratings.reduce((a, b) => a + b, 0) / ratingsCount : "No ratings";

  const translatedSpecialty = t(doctor.Specialty);
  const translatedLocation = t(doctor.Location);
  const translatedInsurance = t(doctor.Insurance);
  const translatedViewDetails = t('View Details');

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="m-9 flex md:grid md:grid-cols-7 items-center border rounded-xl bg-gradient-to-r from-sky-100 to-700">
      <div className="doctor-card__image">
        <img
          className="m-8 w-24 h-24"
          src={imageError ? avatar : doctor.Image_Src}
          alt={`${doctor.Name}`}
          onError={handleImageError}
        />
      </div>
      <div className="col-span-4 text-left ml-12">
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{doctor.Name}</h1>
        <p>{t('Specialty')}: {translatedSpecialty}</p>
        <p>{t('Location')}: {translatedLocation}</p>
        <p>{t('Insurance Accepted')}: {translatedInsurance}</p>
        <p>{t('Average Rating')}: {averageRating}</p>
        
        <Link to={`/search_doctor/${doctor.ID}`} style={{ color: 'blue', fontStyle: 'italic' }}>{translatedViewDetails}</Link>
      </div>
    </div>
  );
};

const AvailabilityFilterCard = ({ availabilityFilter, setAvailabilityFilter, toggleCard }) => {
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setAvailabilityFilter((prevFilter) => [...prevFilter, value]);
    } else {
      setAvailabilityFilter((prevFilter) => prevFilter.filter((day) => day !== value));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="availability-card">
        <h4>Select Availability</h4>
        <div className="availability-checkboxes">
          {availabilityOptions.map((option) => (
            <div key={option.value} className="checkbox-label">
              <label>
                <input
                  type="checkbox"
                  value={option.value}
                  checked={availabilityFilter.includes(option.value)}
                  onChange={handleCheckboxChange}
                />
                {option.label}
              </label>
            </div>
          ))}
        </div>
  
          <button onClick={toggleCard}>Cancel</button>
          <button onClick={toggleCard}>Apply</button>

      </div>
    </div>
  );
  
  
};

const Doctorlist = () => {
  const { doctors, loading } = useSearch();
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [ratingFilter, setRatingFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [distanceFilter, setDistanceFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState([]);
  const [insuranceFilter, setInsuranceFilter] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [showAvailabilityCard, setShowAvailabilityCard] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 10;
  const hasNoResults = doctors.length === 0 && !loading;

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation(`${latitude},${longitude}`);
          },
          (error) => {
            console.error("Error getting user's location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();
  }, []);

  const handleFilter = () => {
    let filtered = doctors;

    if (ratingFilter) {
      filtered = filtered.filter((doctor) => doctor.rating === ratingFilter);
    }

    if (locationFilter) {
      filtered = filtered.filter((doctor) => doctor.Location.includes(locationFilter));
    }

    if (distanceFilter) {
      filtered = filtered.filter((doctor) => doctor.distance === distanceFilter);
    }

    if (availabilityFilter.length > 0) {
      filtered = filtered.filter((doctor) =>
        availabilityFilter.every((day) => doctor.Availability.includes(day))
      );
    }

    if (insuranceFilter) {
      filtered = filtered.filter((doctor) => doctor.Insurance === insuranceFilter);
    }

    setFilteredDoctors(filtered.slice(0, doctorsPerPage));
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const toggleAvailabilityCard = () => {
    setShowAvailabilityCard((prevValue) => !prevValue);
  };


  const resetFilters = () => {
    setRatingFilter("");
    setLocationFilter("");
    setAvailabilityFilter([]);
    setInsuranceFilter("");
    setShowAvailabilityCard(false);
  };
  const totalDoctors = filteredDoctors.length;
  const totalPages = Math.ceil(totalDoctors / doctorsPerPage);
  const startIndex = (currentPage - 1) * doctorsPerPage;
  const endIndex = startIndex + doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <div className="min-h-screen md:mx-12 lg:mx-32">
        <div className="md:p-12 border m-6 rounded-xl bg-sky-200 bg-opacity-30 shadow-xl">
        <div className="p-4">
          <SearchBar></SearchBar>
          </div>
        <div className="grid md:flex justify-center md:justify-end text-center items-center p-2">
          <label className="filter-label">Filter by:  </label>
          <div className="filter-item">
            <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          <div className="filter-item">
            <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
              <option value="">All Locations</option>
              <option value="Ankara">Ankara</option>
              <option value="Kocaeli">Kocaeli</option>
              <option value="Izmir">Izmir</option>
              <option value="Istanbul">Istanbul</option>
            </select>
          </div>

          <div className="filter-item">
            <select value={insuranceFilter} onChange={(e) => setInsuranceFilter(e.target.value)}>
              <option value="">All Insurance Types</option>
              <option value="Allianz Sigorta AŞ">Allianz Sigorta AŞ</option>
              <option value="Sosyal Guvenlik Kurumu (SGK)">Sosyal Guvenlik Kurumu (SGK)</option>
              <option value="Aksigorta AŞ">Aksigorta AŞ</option>
              <option value="Anadolu Anonim Türk Sigorta Şirketi">Anadolu Anonim Türk Sigorta Şirketi</option>
              <option value="Mapfre Sigorta AŞ">Mapfre Sigorta AŞ</option>
            </select>
          </div>

          <div className="filter-item">
            <button className="availability-filter-button" onClick={toggleAvailabilityCard}>
              {availabilityFilter.length === 0 ? "All Days" : `${availabilityFilter.length} selected`}
            </button>
            {showAvailabilityCard && (
              <AvailabilityFilterCard
                availabilityFilter={availabilityFilter}
                setAvailabilityFilter={setAvailabilityFilter}
                toggleCard={toggleAvailabilityCard}
              />
            )}
          </div>
          </div>
          <button className="filter-button" onClick={handleFilter}>
            Apply Filters
          </button>
        </div>

        <div className="doctor-cards justify-center items-center h-screen">
          {hasNoResults ? (
            <p className="no-results-text">
              No Results found.
              <br />
              Try changing your search criteria, location, and filters to improve your results.
              Click <button className="blue-underlined-button">here</button> to clear all filters.
            </p>
          ) : loading ? (
            <p>Loading...</p>
          ) : (
            currentDoctors.map((doctor) => (
              <DoctorCard key={doctor.ID} doctor={doctor} />
            ))
          )}
        </div>
        <div className="pagination" style={{ textAlign: 'center', position: 'fixed', bottom: 0, left: 0, right: 0 }}>
          {currentPage > 1 && (
            <button onClick={goToPreviousPage}>&lt; Previous</button>
          )}
          <span>{currentPage}</span>
          {currentPage < totalPages && (
            <button onClick={goToNextPage}>Next &gt;</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctorlist;
