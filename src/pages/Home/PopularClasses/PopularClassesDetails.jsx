import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAdmin from "../../../hooks/useAdmin";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import useInstructor from "../../../hooks/useInstructor";

const PopularClassesDetails = ({ classDetails }) => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [refetch] = useCart();
  const navigate = useNavigate();
  const {
    _id,
    image,
    instructor_name,
    name,
    available_seat,
    price,
    description,
  } = classDetails;

  // console.log(isInstructor);

  const handleAddToCart = () => {
    const selectedItem = {
      classId: _id,
      name,
      email: user?.email,
      image,
      price,
      available_seat,
    };
    if (user) {
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
            toast.success("Class added on the cart");
            refetch(); // refetch cart to update the number of items in the cart
          }
        });
    } else {
      toast.warn("Please login to add the class");
      navigate("/login");
    }
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
            {!isAdmin && !isInstructor ? (
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
