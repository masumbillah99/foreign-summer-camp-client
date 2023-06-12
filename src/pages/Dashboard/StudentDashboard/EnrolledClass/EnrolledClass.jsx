// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../../hooks/useAuth";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const EnrolledClass = () => {
  //   const { user } = useAuth();
  //   const [axiosSecure] = useAxiosSecure();
  //   const { data: payments = [] } = useQuery(["payments"], async () => {
  //     const res = await axiosSecure.get(
  //       `${import.meta.env.VITE_SERVER_URL}/payments?email=${user?.email}`
  //     );
  //     // return res.json();
  //     return res.data;
  //   });
  //   const paymentClass = payments.map((items) => items.classItems);
  //   //   const classItems = paymentClass.map((items) => items);
  //   //   console.log(classItems);

  //   const { data: classData = [] } = useQuery({
  //     queryKey: ["classes"],
  //     queryFn: async () => {
  //       const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/classes`);
  //       return res.json();
  //     },
  //   });
  //   const approvedClass = classData.filter((data) => data.status === "approved");
  //   const classId = approvedClass.filter((item) => item._id === paymentClass);
  //   console.log(classId);

  return (
    <div>
      <h1 className="text-3xl text-center font-bold">My Enrolled Class</h1>
      <hr className="border-2 border-primary my-5 mx-auto w-1/2" />
    </div>
  );
};

export default EnrolledClass;
