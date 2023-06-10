import React, { useState, useEffect } from "react";

const Recommend = () => {
  const [trainingData, setTrainingData] = useState([]);

  useEffect(() => {
    // Fetch the training data from your API endpoint
    fetch("/api/search_history", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTrainingData(data.search_history);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>Training Data:</h2>
      <ul>
        {trainingData.map((term, index) => (
          <li key={index}>{term}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommend;
