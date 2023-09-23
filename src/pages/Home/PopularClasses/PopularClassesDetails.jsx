import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import useAdmin from "../../../hooks/useAdmin";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";

const PopularClassesDetails = ({ classDetails }) => {
  const { user, role } = useAuth();
  // const [isAdmin] = useAdmin();
  const [refetch] = useCart();
  const navigate = useNavigate();
  const {
    _id,
    instructor_name,
    // instructor_email,
    name,
    image,
    price,
    available_seat,
    description,
  } = classDetails;

  // console.log(user);

  const handleAddToCart = () => {
    const selectedItem = {
      student_email: user?.email,
      class_id: _id,
      instructor_name,
      name,
      image,
      price,
      available_seat,
      duration: classDetails?.duration,
      description,
      categories: classDetails?.categories,
      courseFor: classDetails?.courseFor,
      coupon: classDetails?.coupon,
      status: classDetails?.status,
    };
    if (!user) {
      toast.warn("Please login to enroll the Course");
      navigate("/login");
      return;
    }

    // const cartItem = { foodId: _id, name, image, price, email: user.email };
    fetch(`${import.meta.env.VITE_SERVER_URL}/carts`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(selectedItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Course added on the cart");
          refetch(); // refetch cart to update the number of items in the cart
        }
      });
  };

  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="p-5">
          <img
            className="hover:scale-125 transition-all"
            src={image}
            alt="image"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl">{name}</h2>
          <h1 className="text-md font-semibold">
            Instructor: {instructor_name}
          </h1>
          <p>{description.slice(0, 75)}...</p>
          <div className="card-actions">
            <div className="text-xl text-primary">${price}</div>
            <div className="flex items-center ms-auto">
              <FaUsers />
              <span className="text-bold text-xl text-primary mx-1">
                {available_seat} seats
              </span>
            </div>
            {role === "student" || role === undefined || role === null ? (
              <button
                onClick={() => handleAddToCart(classDetails)}
                className="btn btn-primary w-full mt-2"
              >
                add to cart
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularClassesDetails;
