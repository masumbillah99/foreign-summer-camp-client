import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Table, { Row } from "../../../../components/reusable/Table";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const History = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: payments = [] } = useQuery(["payments"], async () => {
    const res = await axiosSecure.get(
      `${import.meta.env.VITE_SERVER_URL}/payments?email=${user?.email}`
    );
    return res.data;
  });

  const cols = [
    { label: "Email", value: "Email" },
    { label: "Total Price", value: "Total Price" },
    { label: "Payment Id", value: "Payment Id" },
    { label: "Payment Date", value: "Payment Date" },
    { label: "Actions", value: "Actions" },
  ];

  // console.log(payments);

  return (
    <div className="max-w-screen-xl mx-auto my-5">
      <h1 className="text-3xl text-center font-bold">Payment History</h1>
      <hr className="border-2 border-primary my-5 mx-auto w-1/2" />
      <div className="bg-gray-100 rounded-lg p-5">
        <h3 className="text-2xl font-bold mb-5">
          Total Payments: {payments.length}
        </h3>
        <>
          {payments && payments.length > 0 ? (
            <Table cols={cols}>
              {payments?.map((item, index) => (
                <Row key={item._id} index={index}>
                  <td className="py-3 px-6 text-left ">
                    <div className="flex items-center ">
                      <span className="font-medium">{item.email}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left ">
                    <div className="flex items-center ">
                      <span className="font-medium">{item.price}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left ">
                    <div className="flex items-center ">
                      <span className="font-medium">{item?.transactionId}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left ">
                    <div className="flex items-center ">
                      <span className="font-medium">{item.date}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left ">
                    <div className="flex items-center badge badge-warning">
                      <span className="font-medium">{item.status}</span>
                    </div>
                  </td>
                </Row>
              ))}
            </Table>
          ) : (
            <div className="w-2/3 py-10 mx-auto text-center">
              <p className="text-xl font-bold mb-5">
                You don&apos;t have any payment history
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
