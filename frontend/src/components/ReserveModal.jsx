import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";

//-------------------------->> Lottie

import Lottie from "react-lottie-player";
import calendar from "../icons/calendar.json";
import { FaExclamationCircle } from "react-icons/fa";

const ReserveModal = forwardRef(({ defaultOpened = false }, ref) => {
  // ------------------------->> Modal
  const modalElement = document.getElementById("modal-root");

  const [isOpen, setIsOpen] = useState(defaultOpened);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpen(true),
      closeModal: () => setIsOpen(false),
    };
  });

  return createPortal(
    isOpen ? (
      <div className="bg-primary-500 opacity-90 fixed inset-0 z-50">
        <div className="flex h-screen justify-center items-center opacity-100">
          <div className="flex-col justify-center bg-white shadow-lg rounded-lg w-4/6 md:3/6 lg:w-2/6 h-fit px-4 py-6">
            <div className="block mx-auto">
              <Lottie
                loop
                animationData={calendar}
                play
                style={{ height: 300 }}
              />
            </div>
            <div className="flex justify-center items-center mt-10">
              <FaExclamationCircle className="text-2xl text-primary-500 mr-2" />
              <p className="text-center  text-gray-800">
                Your reservation is pending.
              </p>
            </div>
            <Link to="/">
              <p className="text-center underline text-primary-500">
                Go back to home.
              </p>
            </Link>
          </div>
        </div>
      </div>
    ) : null,
    modalElement
  );
});

export default ReserveModal;
