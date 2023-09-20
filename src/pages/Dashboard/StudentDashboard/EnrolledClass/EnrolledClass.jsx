import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loader from "../../../../components/Loader/Loader";
// import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import EnrollClass from "./EnrollClass";

const EnrolledClass = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  // const [singleClass, setSingleClass] = useState([]);

  const { data: payments = [], isLoading } = useQuery(
    ["payments"],
    async () => {
      const res = await axiosSecure.get(`/my-payments?email=${user?.email}`);
      return res.data;
    }
  );

  if (isLoading) <Loader />;

  // console.log(payments);

  return (
    <div className="mb-10">
      <div className="text-center mt-5 pb-5 mb-10 shadow-lg rounded-lg">
        <h1 className="text-3xl text-center font-bold">
          My Total Enrolled Class - {payments?.length}
        </h1>
      </div>
      <div className="bg-gray-100 rounded-lg p-5">
        {payments && payments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-3">
            {payments?.map((singleClass) => (
              <EnrollClass key={singleClass._id} singleClass={singleClass} />
            ))}
          </div>
        ) : (
          <div className="w-2/3 py-10 mx-auto text-center">
            <p className="text-xl font-bold mb-5">
              You don&apos;t Enroll any class yet. Please go to -
            </p>
            <Link className="btn btn-primary" to={"/dashboard/selectedClass"}>
              My Selected Class
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledClass;
