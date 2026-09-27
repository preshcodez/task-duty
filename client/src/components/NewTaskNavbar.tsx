import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

import logo from "../assets/Group 2 (2).svg";
import profile from "../assets/Group 6.svg"

const MyTaskNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex px-42.5 max-md:px-5 justify-between items-center border-b border-[#B8B6B6]">
      <Link to="/" onClick={() => setIsOpen(false)}>
        <img src={logo} alt="TaskDuty" className="py-6.5 max-md:py-5" />
      </Link>

      {/* Desktop */}
      <div className="flex items-center gap-10 max-md:hidden">
        <Link
          to="/my-tasks"
          className="text-[22px] text-[#292929] font-medium font-signika py-8.25 hover:text-[#974FD0] transition-colors duration-300"
        >
          All Tasks
        </Link>

        <Link
          to="/"
          
        >
          <img src={profile} alt="profile" />
        </Link>
      </div>

      {/* Mobile Hamburger / X */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="hidden max-md:flex relative h-10 w-10 items-center justify-center text-[24px] text-[#974FD0] cursor-pointer"
        aria-label="Toggle menu"
      >
        <FaBars
          className={`absolute transition-all duration-300 ease-in-out ${
            isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
          }`}
        />

        <FaTimes
          className={`absolute transition-all duration-300 ease-in-out ${
            isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
          }`}
        />
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute left-0 top-full z-50 w-full overflow-hidden bg-white transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-5 border-b border-[#B8B6B6] py-6">
          <Link
            to="/my-tasks"
            onClick={() => setIsOpen(false)}
            className="text-[22px] text-[#292929] font-medium font-signika hover:text-[#974FD0] transition-colors duration-300"
          >
            All Tasks
          </Link>

          <Link
            to="/profile"
           
          >
            <img src={profile} alt="profile" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyTaskNavbar;
