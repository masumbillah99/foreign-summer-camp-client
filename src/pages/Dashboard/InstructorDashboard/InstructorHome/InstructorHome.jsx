import { useQuery } from "@tanstack/react-query";
import { MdNumbers } from "react-icons/md";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import {
//   CartesianGrid,
//   Legend,
//   Line,
//   LineChart,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

const InstructorHome = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: myClassData = [] } = useQuery({
    queryKey: ["classesData"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_SERVER_URL}/classes/${user.email}`).then(
        (res) => res.json()
      ),
  });

  // console.log(myClassData);

  const approved = myClassData.filter((data) => data.status === "approved");
  const pending = myClassData.filter((data) => data.status === "pending");

  return (
    <div className="dashboard-font">
      <div className="text-center mt-5 pb-3 mb-10 shadow-lg rounded-lg">
        <h3 className="text-3xl font-bold mb-2">
          Welcome, {user.displayName || "User"} Dashboard
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1  xl:grid-cols-2 2xl:grid-cols-3 justify-items-center gap-3 xl:w-full">
        <div className="card w-96  bg-gradient-to-r from-[#4568DC] to-[#B06AB3] text-white">
          <div className="card-body">
            <span>
              {/* <HiBadgeCheck className="text-2xl text-green-600" /> */}
            </span>
            <h2 className="card-title">Total Add Class</h2>
            <p>
              Here your all add class total number both approved and pending
              class.
            </p>
            <p className="badge badge-warning font-bold text-2xl p-5 absolute right-5 bottom-5">
              <MdNumbers className="mr-1" /> {myClassData?.length || 0}
            </p>
          </div>
        </div>

        <div className="card w-96 h-60 bg-gradient-to-r from-[#F2994A] to-[#F2C94C] text-white">
          <div className="card-body">
            <span>
              {/* <HiShoppingCart className="text-2xl text-blue-500" /> */}
            </span>
            <h2 className="card-title">Approved Class</h2>
            <p>Here your all approved class number</p>
            <p className="badge badge-info font-bold text-2xl p-5 absolute right-5 bottom-5">
              <MdNumbers className="mr-1" /> {approved?.length || 0}
            </p>
          </div>
        </div>

        <div className="card w-96 h-60 bg-gradient-to-r from-[#EF3B36] to-[#F69794] text-white">
          <div className="card-body">
            <span>
              {/* <HiShoppingCart className="text-2xl text-blue-500" /> */}
            </span>
            <h2 className="card-title">Pending Class</h2>
            <p>Here your all pending class number</p>
            <p className="badge badge-warning font-bold text-2xl p-5 absolute right-5 bottom-5">
              <MdNumbers className="mr-1" /> {pending?.length || 0}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-500 text-white mt-20 mx-10 p-10 py-20">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex eos,
          nihil illo autem quos quis mollitia a distinctio impedit, repudiandae
          omnis fuga dolores odio vitae. Aperiam quam nobis tempora in! Lorem
          ipsum dolor sit amet consectetur, adipisicing elit. Libero et aperiam
          id incidunt placeat nesciunt, inventore vero ipsa delectus odio
          veritatis, sunt accusantium dolore recusandae velit suscipit? Aliquid
          sapiente ipsa earum nostrum quo modi magni harum, atque obcaecati
          totam, tenetur veritatis incidunt sint quas at fugit laudantium dolore
          quos suscipit. Eveniet, molestias? Repudiandae, magnam. Eius saepe
          excepturi voluptate corporis animi sapiente cupiditate ratione
          assumenda quaerat. Suscipit, minus omnis voluptates iusto cupiditate
          quasi hic aut velit harum ex in repellat praesentium assumenda quod
          similique nesciunt ducimus! Fugit ab, quos, odit et architecto,
          expedita odio suscipit amet velit minima aliquid accusamus neque?
        </p>
      </div>

      {/* <div className="hidden lg:block my-14">
        <h3 className="text-xl font-bold mb-5">Classes Data Analytics</h3>
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="instructor" stroke="#8884d8" />
          <Line type="monotone" dataKey="student" stroke="#82ca9d" />
        </LineChart>
      </div> */}
    </div>
  );
};

export default InstructorHome;
