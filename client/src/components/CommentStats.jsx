import React from "react";
import { useTranslation } from "react-i18next";


const CommentStats = ({ comments }) => {
  const { t } = useTranslation();
  const numComments = comments ? comments.length : 0; // Check if comments is defined before accessing its length
  let avgRating = 0;

  if (numComments > 0) {
    avgRating =
      comments.reduce((sum, { rating }) => sum + rating, 0) / numComments;
  }

  return (
    <div className="inlineflex p-4">
      <p>
        <strong>{numComments}</strong> {t("Reviews")} |
        <strong>{avgRating.toFixed(1)} {t("out of 5 stars")}</strong>
      </p>
    </div>
  );
};

export default CommentStats;
