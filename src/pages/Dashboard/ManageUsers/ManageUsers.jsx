import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const ManageUsers = () => {
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users`);
    return res.json();
  });

  //   handle make admin
  const handleMakeAdmin = (user) => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success("Successfully make admin");
        }
      });
  };

  //   delete a user
  const handleDelete = (user) => {
    console.log(user);
  };

  return (
    <div className="my-20">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>Number</label>
              </th>
              <th>Image</th>
              <th>Email &amp; Name</th>
              <th>User Role</th>
              <th>Delete User</th>
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
                        <img src={user.image} alt="user image" />
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
                  {user.role === "admin" ? (
                    <span className="uppercase badge badge-outline text-green-600 font-semibold">
                      admin
                    </span>
                  ) : (
                    <>
                      <button className="btn btn-primary btn-xs me-2">
                        Instructor
                      </button>
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-primary btn-xs"
                      >
                        Admin
                      </button>
                    </>
                  )}
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
