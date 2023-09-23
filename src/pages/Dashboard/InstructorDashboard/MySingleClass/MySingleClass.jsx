import { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateClassData } from "../../../../api/Class";
import { imageUpload } from "../../../../api/utils";

const MySingleClass = () => {
  const singleClassData = useLoaderData();
  const { handleSubmit, register, reset } = useForm();
  const navigate = useNavigate();
  const [courseFor, setCourseFor] = useState(null);

  // const [categoryItem, setCategoryItem] = useState(null);
  // console.log(singleClassData);
  // const {_id, name, image,instructor_name,email,price,available_seat,description,status} = singleClassData;

  const handleUpdateClass = (data) => {
    // data.name = singleClassData.name;
    // data.price = singleClassData.price;
    // data.categories = singleClassData.categories;
    data.courseFor = courseFor;
    data.status = singleClassData.status;
    data.available_seat = singleClassData.available_seat;

    if (!data.image[0]) {
      data.image = singleClassData.image;
      updateClassData(data, singleClassData?._id)
        .then((res) => {
          if (res.modifiedCount > 0) {
            toast.success("course information updated successfully");
            reset();
            navigate("/dashboard/myClasses");
          }
        })
        .catch((error) => toast.error(error.message));
    } else {
      imageUpload(data.image[0]).then((imgRes) => {
        console.log(imgRes);
        updateClassData(data, singleClassData?._id)
          .then((res) => {
            if (res.modifiedCount > 0) {
              toast.success("course information updated successfully");
              reset();
              navigate("/dashboard/myClasses");
            }
          })
          .catch((error) => toast.error(error.message));
      });
    }
  };

  const courseForOptions = [
    { value: "all-person", label: "All Person" },
    { value: "student", label: "Student" },
    { value: "non-cse", label: "Non CSE" },
    { value: "professional man", label: "Professional Man" },
    { value: "unprofessional man", label: "Unprofessional Man" },
  ];

  return (
    <section>
      <div className="text-center mt-5 pb-3 mb-5 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center">
          Update Your Course Information
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(handleUpdateClass)}
        className="bg-[#F3F3F3] p-12 rounded-lg mx-2 md:mx-5 lg:mx-0"
      >
        <div className="flex flex-col lg:flex-row gap-5 mb-5">
          <div className="form-control w-full">
            <label className="font-semibold mb-3">Course Name</label>
            <input
              type="text"
              // {...register("name", { required: true })}
              className="input input-bordered input-primary focus:outline-none w-full text-black"
              defaultValue={singleClassData?.name}
              readOnly
            />
          </div>
          <div className="form-control w-full">
            <label className="font-semibold mb-3">Course Cover Photo</label>
            <input
              type="file"
              {...register("image")}
              className="file-input file-input-bordered file-input-primary focus:outline-none"
              // defaultValue={singleClassData.image}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 mb-5">
          <div className="form-control w-full">
            <label className="font-semibold mb-3">Course Category</label>
            <input
              type="text"
              className="input input-bordered input-primary focus:outline-none w-full"
              defaultValue={singleClassData?.categories?.label || " "}
              readOnly
            />
          </div>
          <div className="form-control w-full">
            <label className="font-semibold mb-3">Course Duration (min)</label>
            <input
              type="number"
              {...register("duration", { required: true })}
              className="input input-bordered input-primary focus:outline-none w-full"
              defaultValue={singleClassData?.duration || 0}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 mb-5">
          <div className="form-control w-full">
            <label className="font-semibold mb-3">Available Seats</label>
            <input
              type="number"
              // {...register("available_seat", { required: true })}
              className="input input-bordered input-primary focus:outline-none w-full"
              defaultValue={singleClassData?.available_seat}
              readOnly
            />
          </div>
          <div className="form-control w-full">
            <label className="font-semibold mb-3">Regular Price</label>
            <input
              type="number"
              // {...register("price", { required: true })}
              className="input input-bordered input-primary focus:outline-none w-full"
              defaultValue={singleClassData?.price}
              readOnly
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 mb-5">
          <div className="form-control w-full">
            <label className="font-semibold mb-3">Who this course is for</label>
            <Select
              defaultValue={singleClassData?.courseFor?.label || ""}
              onChange={setCourseFor}
              options={courseForOptions}
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="font-semibold mb-3">Coupon Code</label>
            <input
              type="text"
              {...register("coupon")}
              className="input input-bordered input-primary focus:outline-none w-full uppercase"
              defaultValue={singleClassData?.coupon || ""}
              placeholder="SUMMERCAMP23"
            />
          </div>
        </div>

        <div className="form-control">
          <textarea
            {...register("description")}
            defaultValue={singleClassData?.description}
            className="textarea textarea-bordered textarea-lg w-full h-40 focus:outline-none mb-5"
          ></textarea>
        </div>
        <input
          type="submit"
          className="btn btn-primary w-full"
          value="Update Course Information"
        />
      </form>
    </section>
  );
};

export default MySingleClass;
