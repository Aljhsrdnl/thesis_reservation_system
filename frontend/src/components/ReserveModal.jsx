import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";

//-------------------------->> Lottie
import Lottie from "react-lottie";
import PendingRequest from "../icons/Pending Request.json";
import { FaExclamationCircle } from "react-icons/fa";

const ReserveModal = forwardRef(({ defaultOpened = false }, ref) => {
  // ------------------------->> Modal
  const modalElement = document.getElementById("modal-root");
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: PendingRequest,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [isOpen, setIsOpen] = useState(defaultOpened);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpen(true),
      closeModal: () => setIsOpen(false),
    };
  });

  return createPortal(
    isOpen ? (
      <div className="bg-green-400 opacity-90 fixed inset-0 z-50">
        <div className="flex h-screen justify-center items-center">
          <div className="flex-col justify-center bg-white shadow-lg rounded-lg w-4/6 md:3/6 lg:w-2/6 h-fit px-4 py-6">
            <Lottie options={defaultOptions} width={200} height={200} />
            <div className="flex justify-center items-center mt-10">
              <FaExclamationCircle className="text-2xl text-green-600 mr-2" />
              <p className="text-center  text-gray-800">
                Your reservation is pending.
              </p>
            </div>
            <Link to="/">
              <p className="text-center underline text-green-800">
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
