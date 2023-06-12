import { useQuery } from "@tanstack/react-query";
import { Fade, Slide } from "react-awesome-reveal";

const PopularInstructor = () => {
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/users/instructor`
      );
      return res.json();
    },
  });

  // console.log("users", users);
  // const onlyInstructors = users?.filter((user) => user?.email === user?.email);
  // console.log(onlyInstructors);

  // TOD0 : based on students show in ui

  return (
    <div className="max-w-screen-xl mx-5 lg:mx-auto mb-10 lg:px-0">
      <Slide>
        <h3 className="text-xl font-bold text-primary underline">
          Popular Instructors
        </h3>
        <h1 className="text-4xl font-bold mt-3 mb-5">
          Meet Your Favorite Instructors
        </h1>
      </Slide>
      <Fade delay={1e3} cascade damping={1e-1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-3">
          {users &&
            users.slice(0, 6)?.map((instructor) => (
              <div
                key={instructor._id}
                className="flex items-center w-96 gap-3 px-1 border hover:bg-gray-100 rounded-lg"
              >
                <figure>
                  <img
                    src={instructor.image}
                    className="w-24 h-24 rounded-full"
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
        </div>
      </Fade>
    </div>
  );
};

export default PopularInstructor;
