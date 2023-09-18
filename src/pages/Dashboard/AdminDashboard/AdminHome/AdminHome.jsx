import { useQuery } from "@tanstack/react-query";
import { MdNumbers } from "react-icons/md";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AdminHome = () => {
  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();
  const { data: allUsers = [] } = useQuery(["all-users"], async () => {
    const res = await axiosSecure.get(
      `${import.meta.env.VITE_SERVER_URL}/all-users`
    );
    return res.data;
  });

  // console.log(allUsers);

  const instructor = allUsers.filter((data) => data.role === "instructor");
  const student = allUsers.filter((data) => data.role === "student");

  const data = [
    {
      name: "users",
      instructor: instructor.length,
      student: student.length,
    },
  ];

  return (
    <div className="dashboard-font">
      <div className="text-center mt-5 mb-10 shadow-lg rounded-lg">
        <h3 className="text-3xl font-bold pb-4">Welcome, {user.displayName}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1  xl:grid-cols-2 2xl:grid-cols-3 justify-items-center gap-3 xl:w-full">
        <div className="card w-96 bg-base-100 shadow-xl shadow-slate-300">
          <div className="card-body">
            <span>
              {/* <HiBadgeCheck className="text-2xl text-green-600" /> */}
            </span>
            <h2 className="card-title text-purple-600">Total Users</h2>
            <p>This number is total users in this website.</p>
            <p className="badge badge-warning font-bold text-2xl p-5 absolute right-5 bottom-5">
              <MdNumbers className="mr-1" />
              {allUsers?.length}
            </p>
          </div>
        </div>

        <div className="card w-96 h-60 bg-base-100 shadow-xl shadow-slate-300">
          <div className="card-body">
            <span>
              {/* <HiShoppingCart className="text-2xl text-blue-500" /> */}
            </span>
            <h2 className="card-title text-purple-600">Total Instructors</h2>
            <p>This number is how many instructors has in this website.</p>
            <p className="badge badge-warning font-bold text-2xl p-5 absolute right-5 bottom-5">
              <MdNumbers className="mr-1" />
              {instructor?.length}
            </p>
          </div>
        </div>
        <div className="card w-96 h-60 bg-base-100 shadow-xl shadow-slate-300">
          <div className="card-body">
            <span>
              {/* <HiShoppingCart className="text-2xl text-blue-500" /> */}
            </span>
            <h2 className="card-title text-purple-600">Total Students</h2>
            <p>This number is how many students has in this website.</p>
            <p className="badge badge-warning font-bold text-2xl p-5 absolute right-5 bottom-5">
              <MdNumbers className="mr-1" />
              {student?.length}
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block my-14 bg-gray-100 p-5 rounded-lg">
        <h3 className="text-xl font-bold mb-5 ml-10">User Analytics</h3>
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="instructor" stroke="#8884d8" />
          <Line type="monotone" dataKey="student" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
};

export default AdminHome;
