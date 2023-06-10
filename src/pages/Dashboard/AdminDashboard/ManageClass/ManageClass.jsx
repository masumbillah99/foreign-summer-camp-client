import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAllClass } from "../../../../api/class";
import ManageClassForm from "./ManageClassForm";

const ManageClass = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getAllClass().then((data) => {
      setClasses(data);
    });
  }, []);

  const handleApproved = (classData, id) => {
    const newData = { status: "approved" };

    fetch(`${import.meta.env.VITE_SERVER_URL}/classes/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("successfully approved class");
        }
      });
  };

  return (
    <div className="my-10">
      <h1 className="text-3xl text-center font-bold mb-3 underline">
        Manage Classes
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-96 xl:gap-3">
        {classes.map((classDetails) => (
          <ManageClassForm
            key={classDetails._id}
            classDetails={classDetails}
            handleApproved={handleApproved}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageClass;
