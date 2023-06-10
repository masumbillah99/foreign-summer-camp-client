import { FaUsers } from "react-icons/fa";

const PopularClassesDetails = ({ classDetails }) => {
  const { image, instructor_name, name, available_seat, price, description } =
    classDetails;
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="p-5">
          <img src={image} alt="image" />
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
          </div>
          <button className="btn btn-primary w-full mt-2">Add To Cart</button>
        </div>
      </div>
    </>
  );
};

export default PopularClassesDetails;
