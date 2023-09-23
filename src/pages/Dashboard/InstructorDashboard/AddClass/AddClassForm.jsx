import Select from "react-select";

const AddClassForm = ({
  handleAddClass,
  handleSubmit,
  register,
  categoryItem,
  setCategoryItem,
  categoryOptions,
  courseFor,
  setCourseFor,
  courseForOptions,
}) => {
  return (
    <div>
      <form
        onSubmit={handleSubmit(handleAddClass)}
        className="bg-[#F3F3F3] p-12 rounded-lg mx-2 md:mx-5 lg:mx-0"
      >
        <div className="flex flex-col lg:flex-row gap-5 mb-5">
          <div className="form-control w-full">
            <label className="font-semibold mb-3">Course Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input input-bordered input-primary focus:outline-none w-full"
              placeholder="enter class name"
            />
          </div>
          <div className="form-control w-full">
            <label className="font-semibold mb-3">Course Cover Photo</label>
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input file-input-bordered file-input-primary focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 mb-5">
          <div className="form-control w-full">
            <label className="font-semibold mb-3">Course Category</label>
            <Select
              defaultValue={categoryItem}
              onChange={setCategoryItem}
              options={categoryOptions}
              required
            />
            {/* <input
              {...register("category", { required: true })}
              className="input input-bordered input-primary focus:outline-none w-full"
              placeholder="class category"
            /> */}
          </div>
          <div className="form-control w-full">
            <label className="font-semibold mb-3">Course Duration (hour)</label>
            <input
              type="duration"
              {...register("duration", { required: true })}
              className="input input-bordered input-primary focus:outline-none w-full"
              placeholder="class total duration"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 mb-5">
          <div className="form-control w-full">
            <label className="font-semibold mb-3">Available Seats</label>
            <input
              type="number"
              {...register("available_seat", { required: true })}
              className="input input-bordered input-primary focus:outline-none w-full"
              placeholder="Available seats"
            />
          </div>
          <div className="form-control w-full">
            <label className="font-semibold mb-3">Regular Price</label>
            <input
              type="number"
              {...register("price", { required: true })}
              className="input input-bordered input-primary focus:outline-none w-full"
              placeholder="class regular price"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 mb-5">
          <div className="form-control w-full">
            <label className="font-semibold mb-3">Who this course is for</label>
            <Select
              defaultValue={courseFor}
              onChange={setCourseFor}
              options={courseForOptions}
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="font-semibold mb-3">Coupon Code</label>
            <input
              type="text"
              {...register("coupon", { required: true })}
              className="input input-bordered input-primary focus:outline-none w-full"
              placeholder="coupon code for student (SUMMERCAMP99)"
            />
          </div>
        </div>

        <div className="form-control">
          <textarea
            {...register("description", { required: true })}
            placeholder="description about class"
            className="textarea textarea-bordered textarea-lg w-full h-40 focus:outline-none mb-5"
          ></textarea>
        </div>
        <input
          type="submit"
          className="btn btn-primary w-full"
          value="Add Class"
        />
      </form>
    </div>
  );
};

export default AddClassForm;
