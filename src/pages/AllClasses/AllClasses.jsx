import { useQuery } from "@tanstack/react-query";
import PopularClassesDetails from "../Home/PopularClasses/PopularClassesDetails";

const AllClasses = () => {
  const { data: classData = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/classes`);
      return res.json();
    },
  });

  const approvedClass = classData.filter((data) => data.status === "approved");

  return (
    <div className="py-32 max-w-screen-xl mx-auto">
      <h5 className="text-xl font-bold text-blue-500 underline">
        All Language Course
      </h5>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {approvedClass &&
          approvedClass?.map((classDetails) => (
            <PopularClassesDetails
              key={classDetails._id}
              classDetails={classDetails}
            />
          ))}
      </div>
    </div>
  );
};

export default AllClasses;
