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
        email: user.email,
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
    <div className="my-10">
      <h1 className="font-bold text-2xl mb-5 text-center uppercase underline">
        add a new class
      </h1>
      <AddClassForm
        handleAddClass={handleAddClass}
        handleSubmit={handleSubmit}
        register={register}
      />
    </div>
  );
};

export default AddClass;
