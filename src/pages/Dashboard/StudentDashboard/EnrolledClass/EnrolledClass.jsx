import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import EnrollClass from "./EnrollClass";

const EnrolledClass = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  // const [singleClass, setSingleClass] = useState([]);

  const { data: payments = [] } = useQuery(["payments"], async () => {
    const res = await axiosSecure.get(
      `${import.meta.env.VITE_SERVER_URL}/payments?email=${user?.email}`
    );
    return res.data;
  });

  // console.log(payments);
  // const getClassId = payments.map((item) => item);
  // console.log({ getClassId });

  // const { data: enrolledClass = [] } = useQuery(
  //   ["enrolled-class"],
  //   async () => {
  //     const res = await axiosSecure.get(
  //       `${import.meta.env.VITE_SERVER_URL}/enrolled-class/${classId}`
  //     );
  //     return res.data;
  //   }
  // );

  // console.log(payments);

  return (
    <div className="my-20 md:my-10">
      <h1 className="text-3xl text-center font-bold">
        My Total Enrolled Class - {payments?.length}
      </h1>
      <hr className="border-2 border-primary mt-5 mb-16 mx-auto w-1/2" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-3">
        {payments &&
          payments?.map((singleClass) => (
            <EnrollClass key={singleClass._id} singleClass={singleClass} />
          ))}
      </div>
    </div>
  );
};

export default EnrolledClass;
