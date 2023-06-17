import React, { useState, useEffect } from "react";
import RecommendCard from "./RecommendCard";
import "../RecommendCard.css";

const Recommend = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetch("/recommend_doctors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        setRecommendations(data.recommendations);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4 text-sky-900">Personalized Doctor Recommendations Just for You</h2>
        <p className="text-center text-sky-900">
  We use advanced technology to analyze your previous activity and tailor our recommendations accordingly. 
  These doctors are suggested based on your unique needs and preferences. We hope this helps you in making informed healthcare decisions.
</p>
        <div className="recommend-card-container">
          {recommendations && recommendations.length > 0 ? (
            recommendations.map((doctor) => (
              <div key={doctor.id} className="recommend-card">
                <RecommendCard doctor={doctor} />
              </div>
            ))
          ) : (
            <p> </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommend;
