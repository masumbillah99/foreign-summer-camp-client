import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get(
      `${import.meta.env.VITE_SERVER_URL}/users`
    );
    // return res.json();
    return res.data;
  });

  //   handle make admin
  const handleMakeAdmin = (user) => {
    // const newRole = { role: 'admin' };
    fetch(`${import.meta.env.VITE_SERVER_URL}/users/admin/${user._id}`, {
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
    fetch(`${import.meta.env.VITE_SERVER_URL}/users/instructor/${user._id}`, {
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
    fetch(`${import.meta.env.VITE_SERVER_URL}/users/${user._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        refetch(), toast.error("delete user successfully");
      });
  };

  return (
    <div className="my-10 max-w-screen-xl mx-auto">
      <h1 className="text-4xl text-center font-bold">Manage All Users</h1>
      <hr className="w-1/2 mx-auto border-2 border-primary mt-3 mb-5" />
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Number</th>
              <th>Image</th>
              <th>Email &amp; Name</th>
              <th>User Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user.image}
                          alt="user image"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {user.email}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {user.name}
                  </span>
                </td>
                <td>
                  {user.role === "admin" || user.role === "instructor" ? (
                    <span className="uppercase badge badge-outline text-green-600 font-semibold">
                      {user.role === "admin" ? "admin" : "instructor"}
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-primary btn-xs"
                      >
                        Admin
                      </button>
                      <button
                        onClick={() => handleMakeInstructor(user)}
                        className="btn btn-primary btn-xs me-2"
                      >
                        Instructor
                      </button>
                    </>
                  )}
                  {/* {user.role === "instructor" ? (
                    <span className="uppercase badge badge-outline text-green-600 font-semibold">
                      instructor
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMakeInstructor(user)}
                      className="btn btn-primary btn-xs me-2"
                    >
                      Instructor
                    </button>
                  )} */}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
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
      <ToastContainer />
    </div>
  );
};

export default ManageUsers;
