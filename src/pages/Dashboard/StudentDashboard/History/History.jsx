import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const History = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: payments = [] } = useQuery(["payments"], async () => {
    const res = await axiosSecure.get(
      `${import.meta.env.VITE_SERVER_URL}/payments?email=${user?.email}`
    );
    // return res.json();
    return res.data;
  });

  // console.log(payments);

  return (
    <div className="max-w-screen-xl mx-auto">
      <h1 className="text-3xl text-center font-bold">Payment History</h1>
      <hr className="border-2 border-primary my-5 mx-auto w-1/2" />
      <div className="bg-gray-100 rounded-lg p-5">
        <h3 className="text-2xl font-bold mb-3">
          Total Payments: {payments.length}
        </h3>
        <>
          {payments && payments.length > 0 ? (
            <div className="overflow-x-auto w-full px-5 lg:px-0">
              <table className="table w-full">
                {/* head */}
                <thead>
                  <tr className="bg-[#D1A054] text-white uppercase">
                    <th>Email</th>
                    <th>Class Quantity</th>
                    <th>Total Price</th>
                    <th>Payment date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments?.map((item) => (
                    <tr className="hover border" key={item?._id}>
                      <td>{item.email}</td>
                      <td>{item.quantity}</td>
                      <td className="text-xl font-semibold">$ {item.price}</td>
                      <td className="font-semibold">{item.date}</td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-2/3 py-10 mx-auto text-center">
              <p className="text-xl font-bold mb-3">
                You don&amp;t have any payment history
              </p>
              <Link className="btn btn-primary" to={"/dashboard/selectedClass"}>
                My Selected Class
              </Link>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default History;
