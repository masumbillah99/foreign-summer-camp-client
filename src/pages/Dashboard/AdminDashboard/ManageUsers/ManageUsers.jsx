import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: allUsers = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get(
      `${import.meta.env.VITE_SERVER_URL}/all-users`
    );
    return res.data;
  });

  //   handle make admin
  const handleMakeAdmin = (user) => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/make-admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success("Successfully make admin");
          refetch();
        }
      });
  };

  // handle make instructor role
  const handleMakeInstructor = (user) => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/make-instructor/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success("Set role is an instructor");
          refetch();
        }
      });
  };

  //   delete a user
  const handleDelete = (user) => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/delete-user/${user._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        refetch(), toast.error("delete user successfully!");
      });
  };

  return (
    <div className="my-10 max-w-screen-xl mx-auto">
      <h1 className="text-4xl text-center font-bold">Manage All Users</h1>
      <hr className="w-1/2 mx-auto border-2 border-primary mt-3" />
      <div className="overflow-x-auto my-7">
        <table className="table">
          <thead>
            <tr className="bg-warning">
              <th>Number</th>
              <th>Image</th>
              <th>Email &amp; Name</th>
              <th>User Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((singleUser, index) => (
              <tr key={singleUser._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={singleUser.image}
                          alt="user image"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {singleUser.email}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {singleUser.name}
                  </span>
                </td>
                <td>
                  {singleUser.role === "admin" ||
                  singleUser.role === "instructor" ? (
                    <span className="uppercase badge badge-outline text-green-600 font-semibold">
                      {singleUser.role === "admin" ? "admin" : "instructor"}
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => handleMakeAdmin(singleUser)}
                        className="btn btn-primary btn-xs"
                      >
                        Admin
                      </button>
                      <button
                        onClick={() => handleMakeInstructor(singleUser)}
                        className="btn btn-primary btn-xs ms-2"
                      >
                        Instructor
                      </button>
                    </>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(singleUser)}
                    className="btn btn-ghost text-white btn-sm bg-red-500"
                  >
                    <FaTrashAlt />
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

export default ManageUsers;
