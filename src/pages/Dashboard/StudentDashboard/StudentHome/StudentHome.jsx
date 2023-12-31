import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { MdNumbers } from "react-icons/md";
import { HiBadgeCheck, HiShoppingCart } from "react-icons/hi";
import { FcFeedback } from "react-icons/fc";
import useCart from "../../../../hooks/useCart";
import Loader from "../../../../components/Loader/Loader";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

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
    const res = await axiosSecure.get(`/my-payments?email=${user?.email}`);
    return res.data;
  });

  if (isLoading) return <Loader />;
  if (isError) return "Error......." + error.message;

  // console.log(payments, cart);

  const data = [
    { name: "Enrolled Class", value: payments.length },
    { name: "Selected Class", value: cart.length },
  ];

  const chartsData = [
    {
      name: "Selected & Enrolled Class",
      selectedClass: cart.length,
      enrolledClass: payments.length,
    },
  ];

  const COLORS = ["#FFBB28", "#0088FE", "#FF8042", "#00C49F"];

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
    <div className="dashboard-font">
      <div className="text-center mt-5 pb-3 mb-10 shadow-lg rounded-lg">
        <h3 className="text-xl md:text-3xl font-bold mb-2">
          Welcome,{" "}
          <span className="uppercase">{user.displayName || "User"}</span>{" "}
          Dashboard
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 justify-items-center gap-5">
        <div className="card w-full  bg-gradient-to-r from-[#4568DC] to-[#B06AB3] text-white">
          <div className="card-body">
            <span>
              <HiBadgeCheck className="text-2xl text-green-600" />
            </span>
            <h2 className="card-title">Enrolled Class</h2>
            <p>You enrolled some classes by payment with stripe</p>
            <p className="badge badge-warning font-bold text-2xl p-5 absolute right-5 bottom-5">
              <MdNumbers className="mr-1" />
              {payments?.length}
            </p>
          </div>
        </div>

        <div className="card w-full h-60 bg-gradient-to-r from-[#F2994A] to-[#F2C94C] text-white">
          <div className="card-body">
            <span>
              <HiShoppingCart className="text-2xl text-blue-500" />
            </span>
            <h2 className="card-title">Pending Class</h2>
            <p>
              You selected some class but not enrolled those class. Please,
              hurry up.
            </p>
            <p className="badge badge-info font-bold text-2xl p-5 absolute right-5 bottom-5">
              <MdNumbers className="mr-1" />
              {cart?.length}
            </p>
          </div>
        </div>

        <div className="card w-full bg-gradient-to-r from-[#EF3B36] to-[#F69794] text-white">
          <div className="card-body">
            <span>
              <FcFeedback className="text-2xl" />
            </span>
            <h2 className="card-title">Student Feedback</h2>
            <p>Your feedback is very important for company</p>
            {/* <p className="badge badge-warning font-bold text-2xl p-5 absolute right-5 bottom-5">
              <MdNumbers className="mr-1" />
              {payments?.length}
            </p> */}
          </div>
        </div>
      </div>

      <div className="my-10 grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-10">
        <div className="bg-gradient-to-r from-[#0088FE] to-[#ffbb28] p-10 rounded-md">
          <h3 className="text-xl text-white font-bold mb-5">
            Your Class Data Analytics With PieChart
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis
            aspernatur saepe unde officia ab dolores ipsam nam vel eum esse.
            Doloribus, distinctio quis deserunt eligendi veniam aliquam harum
            ipsum suscipit?
          </p>
        </div>

        <div className="">
          <h1 className="text-xl font-semibold">
            Your information in Pie-Chart
          </h1>
          <PieChart width={200} height={200}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      <div className="hidden md:block my-14 bg-gray-100 p-3 rounded-lg">
        <h3 className="text-xl font-bold mb-5 ml-10">
          Your Data Analytics With LineChart
        </h3>
        <LineChart
          width={700}
          height={300}
          data={chartsData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="selectedClass"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="enrolledClass" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
};

export default StudentHome;
