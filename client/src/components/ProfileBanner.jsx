import React from "react";
import { Link } from "react-scroll";
import Avatar from "./Avatar";

const ProfileBanner = ({ id, name, specialty, hospital, location, imageSrc }) => {
  return (
    <div className="w-full">
      <div className="md:grid md:grid-cols-7 items-start bg-gradient-to-r from-sky-100 to-700 w-full">
        <div className="col-span-3 flex justify-center items-start pt-8">
          <img src={imageSrc} alt="Avatar" className="avatar-image rounded-full" />
        </div>
        <div className="flex flex-col col-span-4 mt-12 ml-3">
          <h1 className="font-extrabold text-xl md:text-left mb-1">{name}</h1>
          <h2 className="font-light text-lg md:text-left">{specialty}</h2>
          <h3 className="font-light text-md pt-6 md:text-left">{hospital}</h3>
          <p className="font-light text-md md:text-left">{location}</p>

          <div className="flex flex-col items-center mt-10">
            <button className="hover:font-bold w-auto h-12 px-4 drop-shadow-xl bg-gradient-to-tr rounded-lg text-black mt-4">
              <Link to="comments">Leave a Review</Link>
            </button>
            <a href={`/doctor/claim/${id}`} target="_blank" rel="noopener noreferrer">
              <button className="pt-4 underline underline-offset-4 font-extralight">
                Is this you? Claim your profile here.
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
