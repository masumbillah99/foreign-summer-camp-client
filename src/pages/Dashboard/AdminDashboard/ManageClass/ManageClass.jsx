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
    <div className="">
      <h1 className="text-3xl text-center font-bold">Manage Classes</h1>
      <hr className="w-1/2 mx-auto border-2 border-primary mt-3 mb-5" />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3 xl:gap-3">
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
