import { FaUsers } from "react-icons/fa";

const PopularClassesDetails = ({ classDetails }) => {
  const { id, image, instructor_name, course_name, seats, price } =
    classDetails;

  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="p-5">
          <img src={image} alt="image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl">{course_name}</h2>
          <h1 className="text-lg font-semibold">
            Instructor: {instructor_name}
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque
            ullam ea pariatur perspiciatis officia. Nobis!
          </p>
          <div className="card-actions">
            <div className="text-xl text-primary">${price}</div>
            <div className="flex items-center ms-auto">
              <FaUsers />
              <span className="text-bold text-xl text-primary mx-1">
                {seats} seats
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularClassesDetails;
