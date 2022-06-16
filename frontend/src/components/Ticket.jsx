import React from "react";

const Ticket = ({ ticketID, qty }) => {
  return (
    <div className="relative mb-4">
      <div className=" w-4 h-4 absolute rounded-full left-11 -top-2 bg-green-400"></div>
      <div className="bg-white w-full rounded-lg shadow-lg flex  h-fit">
        <div className="ticket_id rotate-90 w-1/6 text-gray-400  h-full">
          <p className=" w-full"> ${ticketID}</p>
        </div>
        <div className="ticket_detail py-4 ml-2">
          <p className="text-gray-600">Item name:</p>
          <p className="text-gray-600">Quantity:</p>
          <p className="text-gray-600">Reservation Date:</p>
          <p className="text-gray-600">Reservation Time:</p>
          <p className="text-gray-600">Return Date:</p>
          <p className="text-gray-600">Return Time:</p>
          <p className="text-gray-600">Status:</p>
          <p className="text-gray-600">Remarks:</p>
        </div>
      </div>
      <div className=" w-4 h-4 absolute rounded-full left-11 -bottom-2 bg-green-400"></div>
    </div>
  );
};

export default Ticket;
