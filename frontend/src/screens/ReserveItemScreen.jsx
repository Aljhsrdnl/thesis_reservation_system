import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//component
import ReserveModal from "../components/ReserveModal";

//--------------------->> actions
import { getOneItem } from "../redux/actions/itemAction";

const ReserveItemScreen = () => {
  const { itemID, itemName } = useParams();
  // -------------------->> Item Details
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneItem(itemID));
  }, [dispatch]);

  const getItemData = useSelector((data) => data.item);
  const { items, isLoading } = getItemData;
  const avail_q = items.avail_quantity;
  const avail_q_arr = [];
  for (let i = 1; i <= avail_q; i++) {
    avail_q_arr.push([i]);
  }

  // ------------------>> Modal
  const modalRef = useRef();

  const openModal = () => {
    modalRef.current.openModal();
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    openModal();
    console.log(`request has been made`);
    console.log(reserveDetails);
  };

  //------------------>> Form data
  const [reserveDetails, setReserveDetails] = useState({
    itemName: itemName,
    quantity: 1,
    reservationDate: "",
    reservationTime: "",
    returnDate: "",
    returnTime: "",
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setReserveDetails({
      ...reserveDetails,
      [name]: value,
      err: "",
      success: "",
    });
  };

  return (
    <div>
      <form className="bg-white w-3/4 lg:w-1/2 rounded-lg shadow-lg p-6 block mx-auto">
        <div className="mb-4">
          <label htmlFor="item-name" className="block text-gray-800 text-sm">
            Item Name
          </label>
          <input
            value={itemName}
            type="text"
            id="item-name"
            name="itemName"
            className="text-gray-600 w-full cursor-pointer outline-none mt-1 border-2 p-2 rounded border-gray-100 focus:border-green-600 transition"
            disabled
          />
        </div>
        <div className="mb-4">
          <label htmlFor="" className="block text-gray-800 text-sm">
            Quantity
          </label>
          <select
            name="quantity"
            id=""
            className="w-full text-gray-600 cursor-pointer outline-none mt-1 border-2 p-2 rounded border-gray-100 focus:border-green-600 transition"
            value={reserveDetails.quantity}
            onChange={handleChangeInput}
          >
            {avail_q_arr.map((q) => (
              <option value={q} key={q}>
                {q}
              </option>
            ))}
          </select>
        </div>
        <div className="start-date-container mb-4 w-full">
          <label
            htmlFor="reservation-date"
            className="block text-gray-800 text-sm"
          >
            Reservation Date
          </label>
          <input
            type="date"
            name="reservationDate"
            id="reservation-date"
            className="text-gray-600 w-full cursor-pointer outline-none mt-1 border-2 p-2 rounded border-gray-100 focus:border-green-600 transition"
            onChange={handleChangeInput}
          />
        </div>
        <div className="start-date-container mb-4 w-full">
          <label
            htmlFor="reservation-time"
            className="block text-gray-800 text-sm"
          >
            Reservation Time
          </label>
          <input
            type="time"
            name="reservationTime"
            id="reservation-time"
            className="text-gray-600 w-full cursor-pointer outline-none mt-1 border-2 p-2 rounded border-gray-100 focus:border-green-600 transition"
            onChange={handleChangeInput}
          />
        </div>
        <div className="start-date-container mb-4 w-full mr-8">
          <label
            htmlFor="reservation-date"
            className="block text-gray-800 text-sm"
          >
            Return Date
          </label>
          <input
            type="date"
            name="returnDate"
            id="reservation-date"
            className="text-gray-600 w-full cursor-pointer outline-none mt-1 border-2 p-2 rounded border-gray-100 focus:border-green-600 transition"
            onChange={handleChangeInput}
          />
        </div>
        <div className="start-date-container mb-4 w-full">
          <label
            htmlFor="reservation-time"
            className="block text-gray-800 text-sm"
          >
            Return Time
          </label>
          <input
            type="time"
            name="returnTime"
            id="reservation-time"
            className="text-gray-600 w-full cursor-pointer outline-none mt-1 border-2 p-2 rounded border-gray-100 focus:border-green-600 transition"
            onChange={handleChangeInput}
          />
        </div>
        <button
          className="block w-full  py-2 rounded-lg  mt-6 bg-green-600 text-white hover:text-white    hover:bg-green-800  transition"
          onClick={handleSubmission}
        >
          REQUEST FOR RESERVATION
        </button>
      </form>
      <ReserveModal ref={modalRef}>
        <h1>Hello</h1>
      </ReserveModal>
    </div>
  );
};

export default ReserveItemScreen;
