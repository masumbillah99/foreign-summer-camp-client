import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { MdNumbers, MdPending } from "react-icons/md";
import { HiBadgeCheck, HiShoppingCart } from "react-icons/hi";
import useCart from "../../../../hooks/useCart";

const StudentHome = () => {
  const { user } = useAuth();
  const [cart, refetch] = useCart();
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

  if (isLoading) return "Loading.................";

  if (isError) return "Error......." + error.message;

  // console.log(cart);

  return (
    <div className="student-font">
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between items-center my-4">
        <h3 className="text-3xl font-bold">Hello, {user.displayName}</h3>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="avatar cursor-pointer">
            <div className="w-20 rounded-full">
              <img
                src={user?.photoURL}
                className="w-20"
                alt="user img"
                referrerPolicy="no-referrer"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-700 text-white rounded-box w-32"
          >
            <li>
              <a className="justify-between">Edit</a>
            </li>
            <li>
              <a className="justify-between">Settings</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-3 xl:w-4/5">
        <div className="card w-96 bg-base-100 shadow-xl shadow-slate-300">
          <div className="card-body">
            <span>
              <HiBadgeCheck className="text-2xl" />
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
              <HiShoppingCart className="text-2xl" />
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
              <HiBadgeCheck className="text-2xl" />
            </span>
            <h2 className="card-title text-purple-600">Enrolled Class</h2>
            <p>You enrolled some classes by payment with stripe</p>
            <p className="badge badge-warning font-bold text-2xl p-5 absolute right-5 bottom-5">
              <MdNumbers className="mr-1" />
              {payments?.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
