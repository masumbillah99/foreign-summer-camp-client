import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";

const AddClassForm = ({ handleAddClass }) => {
  const { register, handleSubmit } = useForm();
  const { user } = useAuth();

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleAddClass)}
        className="bg-[#F3F3F3] p-12 rounded-lg mx-2 md:mx-5 lg:mx-0"
      >
        <div className="flex flex-col lg:flex-row gap-5 mb-5">
          <div className="form-control w-full">
            <label className="font-semibold mb-3">Class Name</label>
            <input
              type="text"
              {...register("name")}
              className="input input-bordered input-primary focus:outline-none w-full"
              placeholder="enter class name"
            />
          </div>
          <div className="form-control w-full">
            <label className="font-semibold mb-3">Class Image</label>
            <input
              type="file"
              {...register("image")}
              className="file-input file-input-bordered file-input-primary focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 mb-5">
          <div className="form-control w-full">
            <label className="font-semibold mb-3">Instructor Name</label>
            <input
              {...register("instructor_name")}
              className="input input-bordered input-primary focus:outline-none w-full"
              defaultValue={user?.displayName}
              readOnly
            />
          </div>
          <div className="form-control w-full">
            <label className="font-semibold mb-3">Instructor Email</label>
            <input
              type="email"
              {...register("email")}
              className="input input-bordered input-primary focus:outline-none w-full"
              defaultValue={user?.email}
              readOnly
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 mb-5">
          <div className="form-control w-full">
            <label className="font-semibold mb-3">Available Seats</label>
            <input
              type="number"
              {...register("available_seat")}
              className="input input-bordered input-primary focus:outline-none w-full"
              placeholder="Available seats"
            />
          </div>
          <div className="form-control w-full">
            <label className="font-semibold mb-3">Class Regular Price</label>
            <input
              type="number"
              {...register("price")}
              className="input input-bordered input-primary focus:outline-none w-full"
              placeholder="class regular price"
            />
          </div>
        </div>
        <div className="form-control">
          <textarea
            {...register("description")}
            placeholder="description about class"
            className="textarea textarea-bordered textarea-lg w-full focus:outline-none mb-5"
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
