import React from "react";

const About = () => {
  return (
    <div className="max-w-[70%] w-screen mx-auto" id="about">
      <div className="max-w-[80%] w-screen mx-auto text-center flex flex-col justify-center m-8">
        <h2 className="mt-8 mb-2 font-bold text-2xl">
          At CareConnect, We Want to Make Finding the Right Doctor Easy
        </h2>
        <p className="text-lg mb-4">
          That's why we're dedicated to improving your experience of finding a
          doctor that meets your needs
        </p>
      </div>
      <div className="md:grid gap-12 grid-cols-3 text-center mb-16 my-8">
        <div className="mb-6">
          <h3 className="font-bold m-auto">How CareConnect Collects Reviews</h3>
          <p>
            Patients are encouraged to search CareConnect for their provider and
            write a review. Every patient must sign up to ensure that all
            reviews are written by real people. We ask patients to leave honest,
            respectful, and detailed reviews that follow our guidelines.
          </p>
        </div>
        <div className="mb-6">
          <h3 className="font-bold m-auto">A Commitment to Reliable Reviews</h3>
          <p>
            Every review on CareConnect goes through an approval process to
            ensure that we are publishing the most trustworthy reviews. In
            addition, we never accept financial compensation from providers or
            hospitals in exchange for the removal of negative reviews.
          </p>
        </div>
        <div className="mb-6">
          <h3 className="font-bold m-auto">
            Informative and Transparent Reviews
          </h3>
          <p>
            When patients rate and review doctors or hospitals on CareConnect,
            they take a variety of experiences into account, including
            treatment, bedside manner, communication, wait times, administrative
            staff, and scheduling.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
