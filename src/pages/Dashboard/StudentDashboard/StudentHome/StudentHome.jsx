import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { MdNumbers } from "react-icons/md";
import { HiBadgeCheck, HiShoppingCart } from "react-icons/hi";
import { FcFeedback } from "react-icons/fc";
import useCart from "../../../../hooks/useCart";
import Loader from "../../../../components/Loader/Loader";

const StudentHome = () => {
  const { user } = useAuth();
  const [cart] = useCart();
  const [axiosSecure] = useAxiosSecure();

  const {
    data: payments = [],
    isLoading,
    isError,
    error,
  } = useQuery(["payments"], async () => {
    const res = await axiosSecure.get(
      `${import.meta.env.VITE_SERVER_URL}/payments?email=${user?.email}`
    );
    return res.data;
  });

  if (isLoading) return <Loader />;
  if (isError) return "Error......." + error.message;

  // console.log(payments);

  return (
    <div className="dashboard-font">
      <div className="text-center mt-5 mb-10">
        <h3 className="text-3xl font-bold mb-2">
          Welcome, {user.displayName} Dashboard
        </h3>
        <p className="underline">Here you can see your all information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1  xl:grid-cols-2 2xl:grid-cols-3 justify-items-center gap-3 xl:w-full">
        <div className="card w-96 bg-base-100 shadow-xl shadow-slate-300">
          <div className="card-body">
            <span>
              <HiBadgeCheck className="text-2xl text-green-600" />
            </span>
            <h2 className="card-title text-purple-600">Enrolled Class</h2>
            <p>You enrolled some classes by payment with stripe</p>
            <p className="badge badge-warning font-bold text-2xl p-5 absolute right-5 bottom-5">
              <MdNumbers className="mr-1" />
              {payments?.length}
            </p>
          </div>
        </div>

        <div className="card w-96 h-60 bg-base-100 shadow-xl shadow-slate-300">
          <div className="card-body">
            <span>
              <HiShoppingCart className="text-2xl text-blue-500" />
            </span>
            <h2 className="card-title text-purple-600">Pending Class</h2>
            <p>
              You selected some class but not enrolled those class. Please,
              hurry up.
            </p>
            <p className="badge badge-warning font-bold text-2xl p-5 absolute right-5 bottom-5">
              <MdNumbers className="mr-1" />
              {cart?.length}
            </p>
          </div>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl shadow-slate-300">
          <div className="card-body">
            <span>
              <FcFeedback className="text-2xl" />
            </span>
            <h2 className="card-title text-purple-600">Student Feedback</h2>
            <p>Your feedback is very important for company</p>
            {/* <p className="badge badge-warning font-bold text-2xl p-5 absolute right-5 bottom-5">
              <MdNumbers className="mr-1" />
              {payments?.length}
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
