import { useState } from "react";
import { FaStar } from "react-icons/fa";

function StarRating({ rating, onRatingChange }) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  const handleClick = (index) => {
    onRatingChange(index + 1);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const starColor =
          index <= (hoveredIndex !== -1 ? hoveredIndex : rating - 1)
            ? "text-yellow-400"
            : "text-gray-300";

        return (
          <span
            key={index}
            className={`inline-block mr-1 cursor-pointer ${starColor}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave()}
            onClick={() => handleClick(index)}
          >
            <FaStar />
          </span>
        );
      })}
    </div>
  );
}

export default StarRating;
