import { toast } from "react-toastify";
import { addNewClass } from "../../../../api/Class";
import { imageUpload } from "../../../../api/utils";
import AddClassForm from "./AddClassForm";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import { useState } from "react";

const AddClass = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [courseFor, setCourseFor] = useState(null);
  const [categoryItem, setCategoryItem] = useState(null);

  const handleAddClass = (data) => {
    data.categories = categoryItem;
    data.courseFor = courseFor;
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
        duration: data.duration * 1000000,
        description: data.description,
        categories: data.categories,
        courseFor: data.courseFor,
        coupon: data.coupon,
        status: "pending",
      };

      // post class data to server
      addNewClass(classData)
        .then(() => {
          toast.success("successfully add a class");
          toast.info("& Wait for Admin approval");
          reset();
        })
        .catch((err) => toast.error(err.message));
    });
  };

  const categoryOptions = [
    { value: "arabic", label: "Arabic" },
    { value: "career-development", label: "Career development" },
    { value: "language-course", label: "Language Course" },
    { value: "programming", label: "Programming" },
    { value: "web-development", label: "Web development" },
  ];

  const courseForOptions = [
    { value: "all-person", label: "All Person" },
    { value: "non-cse", label: "Non CSE" },
    { value: "professional man", label: "Professional Man" },
    { value: "student", label: "Student" },
    { value: "unprofessional man", label: "Unprofessional Man" },
  ];

  return (
    <div className="mb-10">
      <div className="text-center mt-5 pb-3 mb-10 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center">Add A New Class</h1>
      </div>
      <AddClassForm
        handleAddClass={handleAddClass}
        handleSubmit={handleSubmit}
        register={register}
        categoryItem={categoryItem}
        setCategoryItem={setCategoryItem}
        categoryOptions={categoryOptions}
        courseFor={courseFor}
        setCourseFor={setCourseFor}
        courseForOptions={courseForOptions}
      />
    </div>
  );
};

export default AddClass;
