import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import useAuth from "../hooks/useAuth";
import useInstructor from "../hooks/useInstructor";

const InstructorRoute = ({ children }) => {
  const { user } = useAuth();
  const [isInstructor, isInstructorLoading] = useInstructor();
  const location = useLocation();

  if (isInstructorLoading) {
    console.log("instructor-route");
    return <Loader />;
  }

  if (user && isInstructor) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default InstructorRoute;
