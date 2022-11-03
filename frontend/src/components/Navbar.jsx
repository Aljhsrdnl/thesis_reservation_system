import React, { useEffect, useState } from "react";
import { FaShoppingBag, FaBell } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import school_logo from "../icons/school_logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { MdMenu } from "react-icons/md";
import { BiX } from "react-icons/bi";

import usePortal from "react-cool-portal";

// --------------------->> components
import Ticket from "./Ticket";

function NavBar() {
  //----------->> Reservation Tooltip
  const { Portal, isShow, show, hide, toggle } = usePortal({
    defaultShow: false,
    internalShowHide: true,
  });

  //------------->> Auth
  const auth = useSelector((state) => state.auth);

  const { user, isLogged, loading } = auth;

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

  //---------------------->> getting reservation
  let [reservation, setReservation] = useState([]);

  if (loading === undefined) {
  } else {
    let userId = user._id;
    axios.get(`/get_reservation/${userId}`).then((data) => {
      setReservation(data.data);
    });
  }
  const userLink = () => {
    return (
      <div>
        <div className="flex items-center">
          <p className="text-2xl text-gray-300 pr-2 hidden lg:block">|</p>

          {/* -------------------------->> Account */}
          <div className="relative transition-all hidden lg:block">
            <button
              className="relative flex items-center cursor-pointer "
              onClick={handleToggle}
            >
              <p className="text-gray-800 mr-2">{user.name}</p>
              <FiChevronDown className={rotate} />
            </button>
            <div className={divClass.primaryClass + divClass.display}>
              <div className="block">
                <p className="text-primary-500 font-semibold text-lg px-2">
                  {user.name}
                </p>
                <p className="text-gray-300 text-sm px-2">{user.email}</p>
                <hr className="border border-primary-500 my-3 px-2" />
                <Link
                  to="/"
                  onClick={handleLogout}
                  className="text-gray-700 w-full block hover:bg-primary-500 hover:text-white px-2 py-1 rounded ease-linear"
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
          {/* ----------------------->> Sidebar */}
          <div className="sidebar lg:hidden">
            <button onClick={show}>
              {/* MENU */}
              <MdMenu className="text-3xl text-gray-400 hover:text-primary-500 mr-2 transition-colors cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="flex justify-start items-center py-4 mb-6 border-b border-gray-300">
        <Link to="/">
          <img src={school_logo} className="w-12 h-12 mr-2" />
        </Link>
        <Link to="/" className="flex-1 font-semibold text-2xl text-primary-500">
          WVSU Central Laboratory
        </Link>
        {isLogged ? userLink() : null}
      </div>
      {/* ------------------------start of reservation tab--------------------------- */}
      <Portal>
        <div className="bar lg:hidden w-full md:w-3/4 absolute -right-0 top-0 bg-gray-50 h-fit z-10 shadow p-6 md:px-16 transition-all ease-in-out">
          <div className="flex mb-4 ">
            <div className="flex-grow"></div>
            <button onClick={hide}>
              {/* HIDE */}
              <BiX className="text-gray-400 text-3xl rounded hover:bg-primary-500 hover:text-white" />
            </button>
          </div>
          <p className="text-2xl font-bold text-primary-500">{user.name}</p>
          <p className=" text-gray-400 border-b border-primary-500 pb-2">
            {user.email}
          </p>
          <Link
            to="/"
            onClick={handleLogout}
            className="text-gray-400 w-full block hover:bg-primary-500 hover:text-white px-2 py-2 rounded mt-2 mb-6 ease-in-out"
          >
            Logout
          </Link>
          <div className="tickets">
            {reservation.length > 0 ? (
              reservation.map((r) => (
                <Ticket
                  key={r._id}
                  ticketID={r._id}
                  qty={r.quantity_to_borrow}
                  name={r.itemName}
                  borrowDate={r.borrowDate}
                  returnDate={r.returnDate}
                  status={r.status}
                  remarks={r.remarks}
                  circle_style_up="w-6 h-6 rounded-full bottom-11 -right-3 absolute bg-gray-50"
                  circle_style_down="circle w-6 h-6 rounded-full bottom-11 -left-3 absolute bg-gray-50"
                />
              ))
            ) : (
              <p>No Reservation yet.</p>
            )}
          </div>
        </div>
      </Portal>
      {/* --------------------------------end of reservation_tab------------------ */}
    </div>
  );
}

export default NavBar;
