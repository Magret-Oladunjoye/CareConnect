import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "../SearchContext";
import Navbar from "../components/Navbar";
import SearchBar from "./SearchBar";
import { useTranslation } from 'react-i18next';
import avatar from "../images/avatar.png";
import axios from "axios"; 
import CommentStats from "./CommentStats";
import StarRating from "./StarRating";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import Modal from 'react-modal';

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
  const [averageRating, setAverageRating] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(`/search_doctor/${doctor.ID}/average_rating`);
        const { average_rating } = response.data;
        const formattedRating = parseFloat(average_rating).toFixed(1);
        setAverageRating(formattedRating);
        console.log(average_rating);
      } catch (error) {
        
        console.error("Error fetching average rating:", error);
      }
    };

    fetchAverageRating();
  }, [doctor.ID]);

  useEffect(() => {
    const fetchCommentsRatings = async () => {
      try {
        const response = await axios.get(
          `/search_doctor/${doctor.ID}/comments_ratings`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        const { data } = response; // The data will be an array of comments

        console.log("Fetched comments:", data);
        setComments(data || []);
      } catch (error) {
        console.log("Failed to fetch comments and ratings");
      }
    };

    fetchCommentsRatings();
  }, [doctor.ID]);

  const translatedSpecialty = t(doctor.Specialty);
  const translatedLocation = t(doctor.Location);
  const translatedInsurance = t(doctor.Insurance);
  const translatedViewDetails = t('View Details');

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="p-4 m-4 flex md:grid md:grid-cols-7 items-center border rounded-xl bg-gradient-to-br from-gray-200 to-sky-200 border-gray-200 shadow-xl">
      <div className="justify-center">
        <img
          className="w-24 h-24 rounded-full"
          src={imageError ? avatar : doctor.Image_Src}
          alt={`${doctor.Name}`}
          onError={handleImageError}
        />
      </div>
      <div className="col-span-4 text-center md:text-left">
        <h1 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{doctor.Name}</h1>
        <p>{t('Specialty')}: {translatedSpecialty}</p>
        <p>{t('Location')}: {translatedLocation}</p>
        <p>{t('Insurance Accepted')}: {translatedInsurance}</p>
        <Link to={`/search_doctor/${doctor.ID}`} style={{ color: 'blue', fontStyle: 'italic' }}>{translatedViewDetails}</Link>
      </div>
      <div className="col-span-2 items-center text-center">
      <CommentStats comments={comments} />
      <StarRating 
      rating = {averageRating}  
      readOnly={true}>
      </StarRating>
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




const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const AvailabilityFilterModal = ({ isOpen, onRequestClose, selectedDays, onSelectDay }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Availability Filter"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)', // This will give you a dark overlay that covers the entire page
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '30%', 
          height: '40%', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          border: '2px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '10px',
          outline: 'none',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        },
      }}
    >
      <h2>Select Available Days</h2>
      {daysOfWeek.map((day) => (
        <div key={day}>
          <input
            type="checkbox"
            id={day}
            name={day}
            checked={selectedDays.includes(day)}
            onChange={() => onSelectDay(day)}
          />
          <label htmlFor={day}>{day}</label>
        </div>
      ))}
      <button className="p-2 bg-gray-300 hover:bg-gray-200 rounded-md" onClick={onRequestClose}>Apply</button>
    </Modal>
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
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const toggleAvailabilityModal = () => {
    setShowAvailabilityModal(!showAvailabilityModal);
  };
  const handleSelectDay = (day) => {
    if (availabilityFilter.includes(day)) {
      setAvailabilityFilter(availabilityFilter.filter((d) => d !== day));
    } else {
      setAvailabilityFilter([...availabilityFilter, day]);
    }
  };
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
          <SearchBar
          onLocationChange={setLocationFilter}
          onRatingChange={setRatingFilter}></SearchBar>
          </div>
        <div className="grid md:flex justify-center md:justify-end text-center items-center p-2">
          <label className="filter-label">{t("Filter by:")}</label>
        
            <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)} className="p-2 border border-gray-300 rounded-md">
              <option value="">{t("All Ratings")}</option>
              <option value="5">{t("5 Stars")}</option>
              <option value="4">{t("4 Stars")}</option>
              <option value="3">{t("3 Stars")}</option>
              <option value="2">{t("2 Stars")}</option>
              <option value="1">{t("1 Star")}</option>
            </select>
         
            <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="p-2 border border-gray-300 rounded-md">
              <option value="">{t("All Locations")}</option>
              <option value="Ankara">Ankara</option>
              <option value="Kocaeli">Kocaeli</option>
              <option value="Izmir">Izmir</option>
              <option value="Istanbul">Istanbul</option>
            </select>
         
            <select value={insuranceFilter} onChange={(e) => setInsuranceFilter(e.target.value)} className="p-2 border border-gray-300 rounded-md">
              <option value="">{t("All Insurance Types")}</option>
              <option value="Allianz Sigorta AŞ">Allianz Sigorta AŞ</option>
              <option value="Sosyal Guvenlik Kurumu (SGK)">Sosyal Guvenlik Kurumu (SGK)</option>
              <option value="Aksigorta AŞ">Aksigorta AŞ</option>
              <option value="Anadolu Anonim Türk Sigorta Şirketi">Anadolu Anonim Türk Sigorta Şirketi</option>
              <option value="Mapfre Sigorta AŞ">Mapfre Sigorta AŞ</option>
            </select>
          
                    <button className="p-2 border border-gray-300 rounded-md" onClick={toggleAvailabilityModal}>
              {availabilityFilter.length === 0 ? t("All Days") : `${availabilityFilter.length} ${t("selected")}`}
            </button>
            <AvailabilityFilterModal
              isOpen={showAvailabilityModal}
              onRequestClose={toggleAvailabilityModal}
              selectedDays={availabilityFilter}
              onSelectDay={handleSelectDay}
            />
          <button
              onClick={resetFilters}
              className="p-2 bg-gray-300 hover:bg-gray-200 rounded-md"
            >
              {t("Reset Filters")}
            </button>
          <button className="p-2 bg-gray-300 hover:bg-gray-200 rounded-md" onClick={handleFilter}>
            {t("Apply Filters")}
          </button>
        </div>
        </div>

        <div className="doctor-cards justify-center items-center h-screen">
          {hasNoResults ? (
            <p className="text-center">
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
      </div>
      <div className="pagination fixed bottom-0 left-0 right-0  py-2" style={{ textAlign: 'center', padding: '10px' }}>
  <nav aria-label="Page navigation example">
    <ul className="list-none flex justify-center">
      {currentPage > 1 && (
        <li>
          <button
            className="relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            onClick={goToPreviousPage}
          >
            &lt;
          </button>
        </li>
      )}
      <li>
        <span className="relative block rounded-full bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300">
          {currentPage}
        </span>
      </li>
      {currentPage < totalPages && (
        <li>
          <button
            className="relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            onClick={goToNextPage}
          >
            &gt;
          </button>
        </li>
      )}
    </ul>
  </nav>
</div>

    </div>
  );
};

export default Doctorlist;
