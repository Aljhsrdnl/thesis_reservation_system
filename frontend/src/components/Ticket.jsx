import React from "react";
import moment from "moment";

const Ticket = ({
  ticketID,
  qty,
  name,
  borrowDate,
  returnDate,
  status,
  remarks,
  circle_style_up,
  circle_style_down,
}) => {
  const bDate = moment(`${borrowDate}`).format("MMM D[,] YYYY");
  const bTime = moment(`${borrowDate}`).format("hh[:]mm A");
  const rDate = moment(`${returnDate}`).format("MMM D[,] YYYY");
  const rTime = moment(`${returnDate}`).format("hh[:]mm A");
  return (
    <div className="relative mb-4">
      <div className={circle_style_up}></div>
      <div className="details grid grid-cols-2 grid-rows-8 bg-white w-full rounded-2xl shadow p-4">
        <div className="itemName col-span-2 mb-3">
          <p className=" text-gray-900 text-lg font-semibold uppercase">
            {name}
          </p>
          <p className="text-gray-400 text-xs pb-3 border-b border-gray-100">
            Show this ticket when getting and returning the item.
          </p>
        </div>
        <div className="col-span-2 mb-3">
          <p className="text-sm text-gray-400">Quantity</p>
          <p className="text-gray-800">{qty}</p>
        </div>
        <div className="col-span-1 mb-3">
          <p className="text-sm text-gray-400">Borrow Date</p>
          <p className="text-gray-800">{bDate}</p>
        </div>
        <div className="col-span-1 mb-3">
          <p className="text-sm text-gray-400">Borrow Time</p>
          <p className="text-gray-800">{bTime}</p>
        </div>
        <div className="col-span-1 mb-3">
          <p className="text-sm text-gray-400">Return Date</p>
          <p className="text-gray-800">{rDate}</p>
        </div>
        <div className="col-span-1 mb-3">
          <p className="text-sm text-gray-400">Return Time</p>
          <p className="text-gray-800">{rTime}</p>
        </div>
        <div className="col-span-2 mb-3">
          <p className="text-sm text-gray-400">Status</p>
          <p className="text-gray-800 capitalize">{status}</p>
        </div>
        <div className="col-span-2 mb-3">
          <p className="text-sm text-gray-400">Remarks</p>
          <p className="text-gray-800">{remarks}</p>
        </div>
        <div className="break border-b-2 border-dashed border-gray-300 col-span-2"></div>
        <div className="col-span-2">
          <p className="text-gray-900 text-center pt-4">{ticketID}</p>
        </div>
      </div>
      <div className={circle_style_down}></div>
    </div>
  );
};

export default Ticket;

{
  /* <div className=" w-4 h-4 absolute rounded-full left-11 -top-2 bg-green-400"></div>
      <div className="bg-white w-full rounded-lg shadow grid grid-cols-6 auto-rows-auto">
        <div className="ticket_id col-span-1 justify-self-center self-center rotate-90 ml-0">
          <p className=" text-sm text-center text-gray-700 "> {ticketID}</p>
        </div>
        <div className="ticket_detail py-4 ml-2 col-span-5 relative">
          <p className="text-gray-600">Item name: {name}</p>
          <p className="text-gray-600">Quantity: {qty}</p>
          <p className="text-gray-600">Reservation Date: {borrowDate}</p>
          <p className="text-gray-600">Reservation Time:</p>
          <p className="text-gray-600">Return Date: {returnDate}</p>
          <p className="text-gray-600">Return Time:</p>
          <p className="text-gray-600">Status: {status}</p>
          <p className="text-gray-600">Remarks: {remarks}</p>
        </div>
      </div>
      <div className=" w-4 h-4 absolute rounded-full left-11 -bottom-2 bg-green-400"></div> */
}
