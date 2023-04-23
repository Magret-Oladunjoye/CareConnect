import React, { useState, useEffect } from 'react';

const DoctorSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (searchTerm !== '') {
        const response = await fetch(`/search_${searchType}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ [`${searchType}_term`]: searchTerm }),
        });
        const data = await response.json();
        setDoctors(data);
      } else {
        setDoctors([]);
      }
    };
    fetchDoctors();
  }, [searchTerm, searchType]);

  const searchTypes = [
    { value: 'name', label: 'Name' },
    { value: 'location', label: 'Location' },
    { value: 'specialty', label: 'Specialty' },
    { value: 'hospital', label: 'Hospital' },
  ];

  return (
    <div className="doctor-search">
      <h2>Search for doctors</h2>
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        {searchTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter search term"
      />
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.ID}>{doctor.Name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorSearch;
