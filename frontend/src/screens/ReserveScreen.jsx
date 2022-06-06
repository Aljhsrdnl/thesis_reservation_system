import React from "react";

import { useDispatch, useSelector } from "react-redux";

//data

//component
import ListItem from "../components/ListItem";
const ReserveScreen = () => {
  return (
    <div className="container block lg:flex">
      <form
        action=""
        className="form bg-white rounded-lg w-full lg:w-1/2 p-8 h-fit  shadow-lg"
      >
        <div className="reservation-container flex">
          <div className="start-date-container mb-4 w-1/2 mr-8">
            <label
              htmlFor="reservation-date"
              className="block text-gray-800 text-sm"
            >
              Reservation Date
            </label>
            <input
              type="date"
              name=""
              id="reservation-date"
              className="text-gray-600 w-full cursor-pointer outline-none border-b-2 pb-1 border-gray-100 focus:border-green-600 transition"
            />
          </div>
          <div className="start-date-container mb-4 w-1/2">
            <label
              htmlFor="reservation-time"
              className="block text-gray-800 text-sm"
            >
              Reservation Time
            </label>
            <input
              type="time"
              name=""
              id="reservation-time"
              className="text-gray-600 w-full cursor-pointer outline-none border-b-2 pb-1 border-gray-100 focus:border-green-600 transition"
            />
          </div>
        </div>
        <div className="return-container flex">
          <div className="return-date-container mb-4 w-1/2 mr-8">
            <label
              htmlFor="return-date"
              className="block text-gray-800 text-sm"
            >
              Return Date
            </label>
            <input
              type="date"
              name=""
              id="reservation-date"
              className="text-gray-600 w-full cursor-pointer outline-none border-b-2 pb-1 border-gray-100 focus:border-green-600 transition"
            />
          </div>
          <div className="return-time-container mb-4 w-1/2">
            <label
              htmlFor="return-time"
              className="block text-gray-800 text-sm"
            >
              Return Time
            </label>
            <input
              type="time"
              name=""
              id="return-time"
              className="text-gray-600 w-full cursor-pointer outline-none border-b-2 pb-1 border-gray-100 focus:border-green-600 transition"
            />
          </div>
        </div>
        <button className="block w-full  py-2 rounded-lg  mt-6 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition">
          Request for Reservation
        </button>
      </form>
      <div className="items w-full lg:w-1/2 bg-white shadow-lg mr-8 rounded-lg p-8 order-first">
        <h1 className="text-2xl font-bold text-green-800">Apparatus</h1>
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
      </div>
    </div>
  );
};

export default ReserveScreen;