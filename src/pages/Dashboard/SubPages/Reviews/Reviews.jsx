import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { toast } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import ratingImg from "../../../../assets/banner/badge.png";

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();

  const handleReview = (data) => {
    event.preventDefault();

    if (data.feedback.length < 30) {
      return toast.error("write review minimum 31 characters");
    }

    const reviewData = {
      rating,
      name: user?.displayName,
      title: data.profession,
      feedback: data.feedback,
    };

    if (rating) {
      axios
        .post(`${import.meta.env.VITE_SERVER_URL}/give-review`, reviewData)
        .then((response) => {
          if (response.data.insertedId) {
            toast.success("thanks for your feedback");
            setRating(0);
            reset();
          }
        })
        .catch((err) => toast.error(err.message));
    } else {
      toast.error("Star Rating is required....");
    }
  };

  const CustomStar = (
    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
  );

  const myStyles = {
    itemShapes: CustomStar,
    itemStrokeWidth: 1,
    activeFillColor: "#FBBD23",
    activeStrokeColor: "#FBBD23",
    inactiveStrokeColor: "#FBBD23",
  };

  return (
    <div className="w-full md:w-3/4 xl:w-1/2 2xl:w-2/5 mx-auto my-20 border-2 border-indigo-300 hover:border-indigo-600 rounded text-center">
      <img className="w-2/5 mx-auto" src={ratingImg} alt="" />
      <h3 className="text-2xl font-bold my-5">Rate Our Website</h3>
      <hr className="border-indigo-600 h-1 mx-10 my-5" />
      <form
        onSubmit={handleSubmit(handleReview)}
        className="mx-5 flex flex-col items-center gap-5 pb-10"
      >
        <Rating
          style={{ maxWidth: 180 }}
          value={rating}
          onChange={setRating}
          itemStyles={myStyles}
          isRequired
        />
        <input
          type="text"
          className="p-3 w-5/6 py-3 rounded-md border focus:outline-indigo-600"
          {...register("profession", { required: true })}
          placeholder="your profession"
        />
        <textarea
          className="p-3 w-5/6 h-40 rounded-md border focus:outline-indigo-600"
          {...register("feedback", { min: 29, required: true })}
          placeholder="Please write your review (minimum 31 characters)"
        ></textarea>

        <button
          type="submit"
          className="btn btn-primary w-5/6 mt-5"
          disabled={!rating}
        >
          Add Feedback
        </button>
      </form>
    </div>
  );
};

export default Reviews;
