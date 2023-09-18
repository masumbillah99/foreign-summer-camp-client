import { useQuery } from "@tanstack/react-query";
import { Fade, Slide } from "react-awesome-reveal";
import { IoMail } from "react-icons/io5";
import { Link } from "react-router-dom";

const PopularInstructor = () => {
  const { data: instructors = [] } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/all-instructors`
      );
      return res.json();
    },
  });

  // TOD0 : based on students show in ui

  return (
    <div className="my-20 mx-5 lg:mx-10 xl:mx-0">
      <Slide>
        <h3 className="text-2xl font-bold text-primary underline">
          Popular Instructors
        </h3>
        <h1 className="text-4xl font-bold mt-3 mb-5">
          Meet Your Favorite Instructors
        </h1>
      </Slide>
      <Fade delay={1e3} cascade damping={1e-1}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-3 mt-10">
          {instructors &&
            instructors.slice(0, 6)?.map((instructor) => (
              <div
                key={instructor._id}
                className="card w-96 gap-3 border hover:border-indigo-500 p-5 rounded-lg"
              >
                <figure>
                  <img
                    src={instructor.image}
                    className="w-40 rounded-full"
                    alt="instructor image"
                    referrerPolicy="no referrer"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{instructor.name}</h2>
                  <p className="flex items-center gap-2">
                    <IoMail /> {instructor.email}
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Iure, obcaecati.
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/instructors" className="btn btn-primary">
            Meet All Instructors
          </Link>
        </div>
      </Fade>
    </div>
  );
};

export default PopularInstructor;

{
  /* <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-3">
          {users &&
            users.slice(0, 6)?.map((instructor) => (
              <div
                key={instructor._id}
                className="flex items-center w-full gap-3 px-1 border hover:bg-gray-100 rounded-lg"
              >
                <figure>
                  <img
                    src={instructor.image}
                    className="w-28 h-28 rounded-full"
                    alt="instructor image"
                    referrerPolicy="no referrer"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{instructor.name}</h2>
                  <p>{instructor.email}</p>
                </div>
              </div>
            ))}
</div> */
}
