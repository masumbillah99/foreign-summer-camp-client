import { useQuery } from "@tanstack/react-query";

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
        Hello Teachers / Instructors
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-3">
        {users &&
          users?.map((instructor) => (
            <div
              key={instructor._id}
              className="flex items-center px-1 border hover:bg-gray-100"
            >
              <figure>
                <img
                  src={instructor.image}
                  className="w-24 rounded-full"
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
    </div>
  );
};

export default AllInstructors;
