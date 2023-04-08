import React from "react";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/5214962/pexels-photo-5214962.jpeg?auto=compress&cs=tinysrgb&w=1600")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="md:h-80 h-auto"
    >
      <div className="max-w-[70%] mx-auto text-center flex flex-col justify-center py-12">
        <h1 className="mt-2 text-3xl font-bold drop-shadow-lg">
          Find, Compare, and Review Doctors
        </h1>
        <p className="text-xl m-4 font-light drop-shadow-lg">
          Get honest and transparent information, ratings, and reviews on your
          healthcare providers
        </p>
        <SearchBar></SearchBar>
      </div>
    </div>
  );
};

export default Hero;
