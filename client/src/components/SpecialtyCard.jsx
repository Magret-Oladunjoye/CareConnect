import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SpecialtyCard = (props) => {
  return (
    <div className="border-double border-2 border-sky-300 rounded-lg p-8 flex flex-col items-center justify-center bg-sky-100 hover:bg-white text-sky-900 font-semibold">
      <button>
        <FontAwesomeIcon icon={props.icon} size="6x" color="#0e7490" />
      </button>
      <p className="p-4">{props.text}</p>
    </div>
  );
};

export default SpecialtyCard;
