import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MyClasses = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: myClassData = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-classes/${user?.email}`);
      return res.data;
    },
  });

  // TODO: enrolled students

  return (
    <div className="mb-10">
      <div className="text-center mt-5 pb-3 mb-10 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center">My Add Classes</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 justify-items-center gap-3">
        {myClassData && myClassData.length > 0
          ? myClassData.map((detail) => (
              <div
                className="card w-96 bg-[#2C72E5] text-neutral-content"
                key={detail._id}
              >
                <div className="card-body">
                  <h2 className="card-title font-bold">{detail.name}</h2>
                  <p className="">Email: {detail.email}</p>
                  <p className="">Available Seats: {detail.available_seat}</p>
                  <p className="">Price: ${detail.price}</p>
                  <p className="badge badge-warning mb-5">
                    Status: {detail.status}
                  </p>
                  <button className="btn btn-success">update class</button>
                </div>
              </div>
            ))
          : "p"}
      </div>

      {/* <div className="overflow-x-auto">
        {myClassData && myClassData.length > 0 ? (
          <table className="table">
            <tbody>
              {myClassData.map((mc, index) => (
                <tr key={mc._id} className="border">
                  <td>{index + 1}.</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={mc.image} alt="class img" />
                        </div>
                      </div>
                      <div className="text-xl font-semibold">{mc.name}</div>
                    </div>
                  </td>
                  <td>Total Enrolled: {0}</td>
                  <td>
                    <span className="uppercase badge badge-outline text-primary font-semibold">
                      {mc.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-outline btn-ghost btn-xs">
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="my-10 w-3/4 mx-auto text-center bg-gray-200 p-10 rounded-lg">
            <p className="text-base font-bold mb-5">
              You don&apos;t add any classes. Please go to -
            </p>
            <Link className="btn btn-primary" to="/dashboard/addClass">
              Add New Class
            </Link>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default MyClasses;
