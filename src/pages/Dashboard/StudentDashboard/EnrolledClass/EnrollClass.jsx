// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const EnrollClass = ({ singleClass }) => {
  // const [axiosSecure] = useAxiosSecure();
  //   console.log(singleClass.classId);

  // const { data: enrolledClass = [] } = useQuery(
  //   ["enrolled-class"],
  //   async () => {
  //     const res = await axiosSecure.get(
  //       `${import.meta.env.VITE_SERVER_URL}/enrolled-class/${
  //         singleClass.classId
  //       }`
  //     );
  //     return res.data;
  //   }
  // );

  // console.log({ enrolledClass });
  const { name, price, date, classId, status } = singleClass;

  return (
    <div className="card w-96 bg-base-100 shadow-xl shadow-gray-300">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>
          Course Price:{" "}
          <span className="badge badge-warning ml-2">$ {price}</span>
        </p>
        <p>
          Enroll Date:
          <span className="badge badge-warning ml-2">{date}</span>
        </p>
        <p>
          Course Id:
          <span className="badge badge-warning ml-2">{classId}</span>
        </p>
        <p>
          Status: <span className="badge badge-warning ml-2">{status}</span>
        </p>
      </div>
    </div>
  );
};

export default EnrollClass;
