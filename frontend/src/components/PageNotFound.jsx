import React from "react";
import Lottie from "react-lottie-player";
import { Link } from "react-router-dom";
import NotFoundLottie from "../../src/icons/NotFound.json";
const PageNotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: NotFoundLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center">
        <Lottie
          animationData={NotFoundLottie}
          play
          style={{ width: 400, height: 400 }}
        />
      </div>
      <p className="text-center">
        Page not Found.
        <span className="underline text-green-600 ml-2">
          <Link to="/">Go back home.</Link>
        </span>
      </p>
    </div>
  );
};

export default PageNotFound;
