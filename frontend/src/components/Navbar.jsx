import React, { useEffect } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import school_logo from "../icons/school_logo.png";

const Navbar = () => {
  return (
    <div className="flex justify-start items-center py-4 mb-6 border-b border-green-400">
      <img src={school_logo} className="w-12 h-12 mr-2" />
      <h1 className="flex-1 font-semibold text-2xl text-green-800">
        WVSU Central Laboratory
      </h1>

      <FaShoppingBag className="text-2xl text-green-600 hover:text-green-800 mr-2 transition-colors" />
      <FaBell className="text-2xl text-green-600 hover:text-green-800 mr-2 transition-colors" />
    </div>
  );
};

export default Navbar;
