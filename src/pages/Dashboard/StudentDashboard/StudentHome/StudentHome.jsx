import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { MdNumbers } from "react-icons/md";
import { HiBadgeCheck, HiShoppingCart } from "react-icons/hi";
import useCart from "../../../../hooks/useCart";
// import PieDash from "../../../../components/PieChart/PieDash";
import Loader from "../../../../components/Loader";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

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

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="student-font">
      <div className="text-center mt-5 mb-10">
        <h3 className="text-3xl font-bold mb-2">
          Welcome, {user.displayName} Dashboard
        </h3>
        <p className="underline">Here you can see your all information</p>

        {/* <div className="dropdown dropdown-end">
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
        </div> */}
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

      <div className="my-10 w-60 mx-auto lg:mx-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={payments}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="price"
            >
              {payments.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StudentHome;
