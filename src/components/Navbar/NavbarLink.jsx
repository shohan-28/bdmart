import React from "react";
import { NavLink } from "react-router-dom";
import Contact from './../Contact/Contact';
import Services from './../Services/Services';
import About from './../About/About';

const NavbarLink = () => {
  return (
    <div className="w-[90%] mx-auto max-w-5x py-2">
      <div className="flex justify-center gap-1 sm:gap-2 md:gap-4 lg:gap-15 bg-gray-200/70 shadow-md p-1.5 rounded-l-3xl rounded-r-3xl font-bold text-black text-[10px] lg:text-[15px] md:text-lg  w-full z-50">
        
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-2 py-2.5 rounded-full font-semibold transition-all duration-300 ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/Product"
          className={({ isActive }) =>
            `px-5 py-2.5 rounded-full font-semibold transition-all duration-300 ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          Product
        </NavLink>

        <NavLink
          to="/About"
          className={({ isActive }) =>
            `px-5 flex justify-center items-center rounded-full font-semibold transition-all duration-300 ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          About
        </NavLink>

        <NavLink
          to="/Services"
          className={({ isActive }) =>
            `px-5 py-2.5 rounded-full font-semibold transition-all duration-300 ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          Services
        </NavLink>

        <NavLink
          to="/Contact"
          className={({ isActive }) =>
            `px-5 py-2.5 rounded-full font-semibold transition-all duration-300 ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          Contact
        </NavLink>
      </div>
    </div>
  );
};

export default NavbarLink;
