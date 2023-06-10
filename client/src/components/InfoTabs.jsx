import React from "react";
import { Link } from "react-scroll";

const InfoTabs = ({
  name,
  about,
  workExperience,
  specialInterests,
  treatmentsOffered,
  contact
}) => {
  const treatmentsArray = treatmentsOffered.split("\n");
  return (
    <div>
      <div className="bg-sky-100 md:pl-64 md:pr-64">
        <ul className="text-center grid grid-cols-4">
          <li className="hover:font-bold hover:cursor-pointer pr-6 pl-6 pt-4 pb-4 font-light">
            <Link to="aboutUser" spy={true} smooth={true} offset={0} duration={500}>
              About
            </Link>
          </li>
          <li className="hover:font-bold hover:cursor-pointer pr-6 pl-6 pt-4 pb-4 font-light">
            <Link to="experience" spy={true} smooth={true} offset={0} duration={500}>
              Work Experience
            </Link>
          </li>
          <li className="hover:font-bold hover:cursor-pointer pr-6 pl-6 pt-4 pb-4 font-light">
            <Link to="interests" spy={true} smooth={true} offset={0} duration={500}>
              Special Interests
            </Link>
          </li>
          <li className="hover:font-bold hover:cursor-pointer pr-6 pl-6 pt-4 pb-4 font-light">
            <Link to="treatments" spy={true} smooth={true} offset={0} duration={500}>
              Treatments Offered
            </Link>
          </li>
        </ul>
      </div>
      <hr></hr>
      <div className="grid grid-rows-8">
        <div className="bg-sky-50 md:pr-64 md:pl-64 pt-12 pb-12 p-24 space-y-6">
          <h1 className="font-bold text-xl text-zinc-800" id="aboutUser">
            About
          </h1>
          <p className="text-justify text-lg font-sans text-zinc-700">{about}</p>
          <h1 className="font-bold text-xl text-zinc-800" id="experience">
            Work Experience
          </h1>
          <p className="text-justify text-lg font-sans text-zinc-700">{workExperience}</p>
          <h1 className="font-bold text-xl text-zinc-800" id="interests">
            Special Interests
          </h1>
          <p className="text-justify text-lg font-sans text-zinc-700">{specialInterests}</p>
          <h1 className="font-bold text-xl text-zinc-800">Treatments Offered</h1>
          <p className="text-justify text-lg font-sans text-zinc-700" id="treatments">
            {treatmentsOffered}
          </p>
          <button style={{ 
            backgroundColor: 'turquoise',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer'
          }}>
            <a href={contact} target="blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
              Contact {name}
            </a>
          </button>

          
        </div>
      </div>
    </div>
  );
};

export default InfoTabs;
