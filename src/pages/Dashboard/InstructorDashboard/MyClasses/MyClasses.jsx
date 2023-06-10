import { useState } from "react";
import { useEffect } from "react";
import { getMyAddClass } from "../../../../api/class";
import useAuth from "../../../../hooks/useAuth";

const MyClasses = () => {
  const [myClass, setMyClass] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getMyAddClass(user.email).then((data) => {
      setMyClass(data);
    });
  }, [user]);

  return (
    <div className="my-10">
      <h1 className="text-3xl font-bold text-center underline mb-5">
        Review My Classes
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          <tbody>
            {myClass.map((mc, index) => (
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
      </div>
    </div>
  );
};

export default MyClasses;
