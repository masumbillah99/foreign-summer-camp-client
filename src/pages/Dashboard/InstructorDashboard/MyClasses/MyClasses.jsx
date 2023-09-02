import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MyClasses = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: myClassData = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${user?.email}`);
      return res.data;
    },
  });

  // TODO: enrolled students

  return (
    <div className="my-10">
      <h1 className="text-3xl font-bold text-center underline mb-5">
        Review My Classes
      </h1>
      <div className="overflow-x-auto">
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
      </div>
    </div>
  );
};

export default MyClasses;
