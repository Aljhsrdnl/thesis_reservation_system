import React from "react";
import { Link, useParams } from "react-router-dom";
import Lottie from "react-lottie";
import { primaryBtn } from "../components/styles";
import EmptyCart from "../icons/empty-bag.json";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

//actions
import { getCart } from "../redux/actions/bagAction";

//component
import ItemInBag from "../components/ItemInBag";

const BagScreen = () => {
  return (
    <div>
      <table className="table-auto border-x border-b w-full">
        <thead>
          <tr className="bg-green-600 text-white ">
            <th className="py-2 text-left font-semibold text-lg">Ticket ID</th>
            <th className="py-2 text-left font-semibold text-lg">
              Reserver's Name
            </th>
            <th className="py-2 text-left font-semibold text-lg">Item Name</th>
            <th className="py-2 text-left font-semibold text-lg">Quantity</th>
            <th className="py-2 text-left font-semibold text-lg">
              Borrow Date
            </th>
            <th className="py-2 text-left font-semibold text-lg">
              Borrow Time
            </th>
            <th className="py-2 text-left font-semibold text-lg">
              Return Date
            </th>
            <th className="py-2 text-left font-semibold text-lg">
              Return Time
            </th>
            <th className="py-2 text-left font-semibold text-lg">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 text-gray-800">123434</td>
            <td className="py-2 text-gray-800">Alejah Sardiniola</td>
            <td className="py-2 text-gray-800">Microscope</td>
            <td className="py-2 text-gray-800">3</td>
            <td className="py-2 text-gray-800">July 1, 2022</td>
            <td className="py-2 text-gray-800">8:00 AM</td>
            <td className="py-2 text-gray-800">Juy 1, 2022</td>
            <td className="py-2 text-gray-800">5:30 PM</td>
            <td className="py-2 text-gray-800">Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BagScreen;
