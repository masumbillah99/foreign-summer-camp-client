import { toast } from "react-toastify";
import { addNewClass } from "../../../../api/Class";
import { imageUpload } from "../../../../api/utils";
import AddClassForm from "./AddClassForm";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";

const AddClass = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const handleAddClass = (data) => {
    const photo = data.image[0];
    // upload image
    imageUpload(photo).then((imgData) => {
      const classData = {
        instructor_name: user.displayName,
        instructor_email: user.email,
        name: data.name,
        image: imgData.data.display_url,
        price: parseFloat(data.price),
        available_seat: parseFloat(data.available_seat),
        category: data.category,
        duration: data.duration,
        whoFor: data.whoFor,
        coupon: data.coupon,
        description: data.description,
        status: "pending",
      };

      // post class data to server
      addNewClass(classData)
        .then(() => {
          toast.success("successfully add a class");
          toast.info("wait for admin approval");
          reset();
        })
        .catch((err) => toast.error(err.message));
    });
  };

  return (
    <div className="mb-10">
      <div className="text-center mt-5 pb-3 mb-10 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center">Add A New Class</h1>
      </div>
      <AddClassForm
        handleAddClass={handleAddClass}
        handleSubmit={handleSubmit}
        register={register}
      />
    </div>
  );
};

export default AddClass;
