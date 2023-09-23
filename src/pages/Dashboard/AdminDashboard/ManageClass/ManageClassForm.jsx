import { useForm } from "react-hook-form";
import { FaUsers } from "react-icons/fa";

const ManageClassForm = ({
  classDetails,
  handleApproved,
  handleDenyRequest,
  handleDelete,
  // handleFeedback,
}) => {
  // todo handle feedback
  const { register } = useForm();

  const {
    _id,
    image,
    instructor_name,
    instructor_email,
    name,
    available_seat,
    price,
  } = classDetails;

  // console.log(classDetails);

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="p-5">
        <img src={image} alt="image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-bold">{name}</h2>
        <h1 className="font-semibold">
          Instructor: {instructor_name}
          <small className="font-normal ms-3">({instructor_email})</small>
        </h1>
        <div className="card-actions">
          <div className="text-xl text-primary">${price}</div>
          <div className="flex items-center ms-auto">
            <FaUsers />
            <span className="text-bold text-xl text-primary mx-1">
              {available_seat} seats
            </span>
          </div>
        </div>
        <div className="flex justify-between mt-3">
          {classDetails.status === "approved" ||
          classDetails.status === "denied" ? (
            <span className="uppercase badge badge-outline text-green-600 font-semibold">
              {classDetails.status === "approved" ? "approved" : "denied"}
            </span>
          ) : (
            <>
              <button
                onClick={() => handleDenyRequest(_id, classDetails)}
                className="btn bg-red-500 hover:bg-red-700 text-white"
              >
                Denied
              </button>
              <button
                onClick={() => handleApproved(_id, classDetails)}
                className="btn bg-green-700 hover:bg-green-800 text-white"
              >
                Approved
              </button>
            </>
          )}

          {/* The button to open modal */}
          <label htmlFor="my_modal_6" className="btn btn-primary">
            Feedback
          </label>
          {/* Put this part before </body> tag */}
          <input type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <h2 className="text-xl font-bold mb-3">
                Why you want to denied the post
              </h2>
              {/* TODO */}
              <form
              // onSubmit={handleSubmit(handleFeedback)}
              >
                <textarea
                  {...register("feedback")}
                  className="input input-bordered w-full h-40"
                ></textarea>
                <div className="modal-action">
                  <label htmlFor="my_modal_6" className="btn">
                    <input type="submit" value="Done" className="" />
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
        {classDetails.status === "pending" ||
        classDetails.status === "denied" ? (
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-neutral text-white"
          >
            Delete Class
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ManageClassForm;
