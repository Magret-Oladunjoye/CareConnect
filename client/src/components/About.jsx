import React from "react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-[70%] w-screen mx-auto" id="about">
      <div className="max-w-[80%] w-screen mx-auto text-center flex flex-col justify-center m-8">
        <h2 className="mt-8 mb-2 font-bold text-2xl">
          {t("At CareConnect, We Want to Make Finding the Right Doctor Easy")}
        </h2>
        <p className="text-lg mb-4">
          {t("That's why we're dedicated to improving your experience of finding a doctor that meets your needs")}
        </p>
      </div>
      <div className="md:grid gap-12 grid-cols-3 text-center mb-16 my-8">
        <div className="mb-6">
          <h3 className="font-bold m-auto">{t("How CareConnect Collects Reviews")}</h3>
          <p>{t("Patients are encouraged to search CareConnect for their provider and\nwrite a review. Every patient must sign up to ensure that all\nreviews are written by real people. We ask patients to leave honest,\nrespectful, and detailed reviews that follow our guidelines.")}</p>
        </div>
        <div className="mb-6">
          <h3 className="font-bold m-auto">{t("A Commitment to Reliable Reviews")}</h3>
          <p>{t("Every review on CareConnect goes through an approval process to\nensure that we are publishing the most trustworthy reviews. In\naddition, we never accept financial compensation from providers or\nhospitals in exchange for the removal of negative reviews.")}</p>
        </div>
        <div className="mb-6">
          <h3 className="font-bold m-auto">{t("Informative and Transparent Reviews")}</h3>
          <p>{t("When patients rate and review doctors or hospitals on CareConnect,\nthey take a variety of experiences into account, including\ntreatment, bedside manner, communication, wait times, administrative\nstaff, and scheduling.")}</p>
        </div>
      </div>
    </div>
  );
};

export default About;
