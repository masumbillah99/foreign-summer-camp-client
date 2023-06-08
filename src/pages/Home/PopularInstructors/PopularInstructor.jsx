import { MdEmail } from "react-icons/md";

const PopularInstructor = ({ instructorDetails }) => {
  const { name, image, email, num_taken_classes, taken_classes } =
    instructorDetails;

  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="p-5">
          <img className="w-1/2 rounded-full" src={image} alt="image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl">{name}</h2>
          <p className="text-semibold">
            <MdEmail className="inline" /> {email}
          </p>
          <p>
            Taken Classes:{" "}
            <span className="font-bold text-primary">{num_taken_classes}</span>
          </p>
          <div>
            Name of the Classes:
            <ul className="list-decimal pl-10">
              {taken_classes?.map((tc, index) => (
                <li key={index}>{tc}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularInstructor;
