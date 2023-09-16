import ClassCompo from "../../components/reusable/classCompo";
import PopularClassesDetails from "../Home/PopularClasses/PopularClassesDetails";

const AllClasses = () => {
  const [approvedClass] = ClassCompo();

  return (
    <div className="py-32 max-w-screen-xl mx-auto">
      <h5 className="text-xl font-bold text-blue-500 underline">
        All Language Course
      </h5>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-3">
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
