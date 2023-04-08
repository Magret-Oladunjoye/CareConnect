import React from "react";

const SearchBar = () => {
  return (
    <div className="">
      <div className="justify-center flex flex-col md:flex-row">
        <label className="w-[60%] md:w-auto bg-gray-200 border border-gray-300 text-gray-500 font-sans shadow-xl rounded-sm px-4 py-2 mx-auto">
          SEARCH
        </label>
        <input
          type="text"
          className="block w-[60%] mx-auto px-4 py-2 bg-white border shadow-xl focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Doctor, Specialty"
        />
        <label className="w-[60%] md:w-auto bg-gray-200 border border-gray-300 text-gray-500 font-sans shadow-xl rounded-sm px-4 py-2 mx-auto">
          NEAR
        </label>
        <input
          type="text"
          className="block w-[60%] mx-auto px-4 py-2 bg-white border shadow-xl focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Country, City"
        />
        <button
          type="button"
          class="w-[60%] mx-auto md:w-auto shadow-xl text-gray-500 border border-gray-300 bg-gray-200 hover:bg-gray-500 hover:text-white rounded-md p-2.5 text-center inline-flex justify-center"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Icon description</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
