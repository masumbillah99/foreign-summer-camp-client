import { useQuery } from "@tanstack/react-query";
import { IoMail } from "react-icons/io5";

const AllInstructors = () => {
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/users/instructor`
      );
      return res.json();
    },
  });

  // const onlyInstructors = users.filter((user) => user?.role === "instructor");
  //   console.log(onlyInstructors);

  return (
    <div className="max-w-screen-xl mx-auto py-24 px-10 lg:px-0">
      <h3 className="text-2xl font-bold text-primary underline my-5">
        All Instructors
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-3">
        {users &&
          users.slice(0, 6)?.map((instructor) => (
            <div
              key={instructor._id}
              className="card w-96 gap-3 bg-base-100 shadow-xl p-5 hover:bg-gray-100 rounded-lg"
            >
              <figure>
                <img
                  src={instructor.image}
                  className="h-[200px] w-80"
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
    </div>
  );
};

export default AllInstructors;
