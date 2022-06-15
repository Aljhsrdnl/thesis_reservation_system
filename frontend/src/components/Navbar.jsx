import React, { useEffect, useState } from "react";
import { FaShoppingBag, FaBell } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import school_logo from "../icons/school_logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import usePortal from "react-cool-portal";

function NavBar() {
  //----------->> Reservation Tooltip
  const { Portal, isShow, show, hide, toggle } = usePortal({
    defaultShow: false,
    internalShowHide: false,
    onShow: (e) => {
      console.log(isShow);
    },
    onHide: (e) => {
      console.log(hide);
    },
  });

  //------------->> Auth
  const auth = useSelector((state) => state.auth);

  const { user, isLogged } = auth;

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  const [toggleAcc, setToggle] = useState(false);
  const [divClass, setDivClass] = useState({
    primaryClass:
      "w-72 absolute right-0 bg-white p-3 rounded shadow-lg z-10 mt-3 ",
    display: "hidden",
  });
  const [rotate, setRotate] = useState("");
  const displayProfile = () => {
    toggleAcc
      ? setDivClass({ ...divClass, display: "block" })
      : setDivClass({ ...divClass, display: "hidden" });
  };
  const handleRotate = () => {
    toggleAcc ? setRotate("rotate-180") : setRotate("rotate-0");
  };
  const handleToggle = () => {
    setToggle(!toggleAcc);
    handleRotate();
    displayProfile();
  };
  const userLink = () => {
    return (
      <li className="flex items-center">
        {/* <Link to={{ pathname: `/bag/${user._id}` }}>
          <FaShoppingBag className="text-2xl text-green-600 hover:text-green-800 mr-2 transition-colors" />
        </Link> */}
        <h1
          className="mr-6 text-green-600 border-b-2 border-transparent hover:border-green-600 cursor-pointer"
          onClick={toggle}
        >
          Reservations
        </h1>
        <Portal>
          <div>Hello</div>
        </Portal>
        <FaBell className="text-2xl text-green-600 hover:text -green-800 mr-2 transition-colors" />
        <p className="text-2xl text-gray-300 pr-2">|</p>

        {/* Account */}
        <div className="relative transition-al">
          <button
            className="relative flex items-center cursor-pointer "
            onClick={handleToggle}
          >
            <p className="text-green-800 mr-2">{user.name}</p>
            <FiChevronDown className={rotate} />
          </button>
          <div className={divClass.primaryClass + divClass.display}>
            <div className="block">
              <p className="text-green-600 font-semibold text-lg px-2">
                {user.name}
              </p>
              <p className="text-gray-300 text-sm px-2">{user.email}</p>
              <hr className="border border-green-400 my-3 px-2" />
              <Link
                to="/"
                onClick={handleLogout}
                className="text-gray-700 w-full block hover:bg-green-400 hover:text-green-600 px-2 py-1 rounded"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
        {/* <Link to="#" className="avatar text-green-800">
          {user.name} <i className="fas fa-angle-down"></i>
        </Link>

        <ul className="dropdown">
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul> */}
      </li>
    );
  };

  return (
    <div className="flex justify-start items-center py-4 mb-6 border-b border-green-400">
      <Link to="/">
        <img src={school_logo} className="w-12 h-12 mr-2" />
      </Link>
      <Link to="/" className="flex-1 font-semibold text-2xl text-green-800">
        WVSU Central Laboratory
      </Link>
      {isLogged ? userLink() : null}
    </div>
  );
}

export default NavBar;
