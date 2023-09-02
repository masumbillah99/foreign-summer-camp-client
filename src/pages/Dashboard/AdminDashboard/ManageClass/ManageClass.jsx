import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateClassData } from "../../../../api/Class";
import ManageClassForm from "./ManageClassForm";

const ManageClass = () => {
  const [disable, setDisable] = useState(false);
  const { data: allClassData = [], refetch } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/classes`);
      return res.json();
    },
  });

  const handleApproved = (classData, id) => {
    const newData = { status: "approved" };
    updateClassData(newData, id).then((data) => {
      if (data.modifiedCount > 0) {
        toast.success("successfully approved class");
        refetch();
        setDisable(true);
      }
    });
  };

  const handleDenyRequest = (id) => {
    const newData = { status: "denied" };
    updateClassData(newData, id).then((data) => {
      if (data.modifiedCount < 0) {
        toast.success("Class approved request canceled");
        refetch();
      }
    });
  };

  // TODO : Handle feedback

  // const handleFeedback = (feedback, id) => {
  //   console.log(feedback);
  //   updateClassData(feedback, id).then((data) => {
  //     console.log(data);
  //   });
  // };

  return (
    <div className="my-10">
      <h1 className="text-3xl text-center font-bold">Manage Classes</h1>
      <hr className="w-1/2 mx-auto border-2 border-primary mt-3 mb-5" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 xl:gap-3">
        {allClassData.map((classDetails) => (
          <ManageClassForm
            key={classDetails._id}
            classDetails={classDetails}
            handleApproved={handleApproved}
            handleDenyRequest={handleDenyRequest}
            // handleFeedback={handleFeedback}
            disable={disable}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageClass;
