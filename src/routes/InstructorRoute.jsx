import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import useAuth from "../hooks/useAuth";
import useInstructor from "../hooks/useInstructor";

const InstructorRoute = ({ children }) => {
  const { user } = useAuth();
  const [isInstructor, isInstructorLoading] = useInstructor();
  const location = useLocation();

  if (isInstructorLoading) {
    return <Loader />;
  }

  if (user && isInstructor) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

// export default InstructorRoute;

// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";

// const useInstructor = () => {
//   const { user, loading } = useAuth();
//   const [axiosSecure] = useAxiosSecure();

//   const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
//     queryKey: ["isInstructor", user?.email],
//     enabled: !loading,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/instructor/${user?.email}`);
//       //   console.log("is admin response", res);
//       return res.data.instructor;
//     },
//   });
//   return [isInstructor, isInstructorLoading];
// };

// export default useInstructor;
