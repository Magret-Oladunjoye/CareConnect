import React from "react";
import logo2 from "../images/logo2.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-700 opacity-75 shadow">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="flex items-center mb-8 md:mb-0">
            <img src={logo2} className="h-12" alt="Logo" />
          </a>
       
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-300 sm:mb-0">
            <li>
              <a href="/doctor/claim" target="_blank" className="mr-4 hover:underline md:mr-6">
                {t("Claim Your Profile")}    
              </a>
            </li>
            <li>
              <a href="/" className="mr-4 hover:underline md:mr-6">
                {t("Privacy Policy")}
              </a>
            </li>
            <li>
              <a href="/" className="mr-4 hover:underline md:mr-6 ">
               {t("Terms of Service")}
              </a>
            </li>
            <li>
              <a href="/" className="mr-4 hover:underline md:mr-6 ">
               {t("Contact Us")}
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-300 sm:text-center">
          © 2023{" "}
          <a href="/" className="hover:underline">
            CareConnect
          </a>
          . {t("All Rights Reserved.")}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
