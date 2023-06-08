import { Link, useRouteError } from "react-router-dom";
import Lottie from "lottie-react";
import animationError from "./404.json";

const ErrorPage = () => {
  const { error } = useRouteError();

  return (
    <>
      <div className="text-center">
        <Lottie className="w-1/3 mx-auto" animationData={animationError} />
        <p className="text-red-700 text-xl">{error?.message}</p> <br />
        <Link
          to="/"
          className="bg-red-500 hover:bg-red-700 text-white text-2xl py-3 px-4 mx-auto rounded-lg"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
