import React from "react";

const CommentStats = ({ comments }) => {
  const numComments = comments ? comments.length : 0; // Check if comments is defined before accessing its length
  let avgRating = 0;

  if (numComments > 0) {
    avgRating =
      comments.reduce((sum, { rating }) => sum + rating, 0) / numComments;
  }

  return (
    <div className="inlineflex p-4">
      <p>
        <strong>{numComments}</strong> Reviews |
        <strong>{avgRating.toFixed(1)} out of 5 stars</strong>
      </p>
    </div>
  );
};

export default CommentStats;
