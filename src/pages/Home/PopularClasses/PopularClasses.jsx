import { useState } from "react";
import PopularClassesDetails from "./PopularClassesDetails";

const PopularClasses = () => {
  const [classes, setClasses] = useState();

  fetch("popular-classes.json")
    .then((res) => res.json())
    .then((data) => {
      setClasses(data);
    });

  return (
    <div className="my-20">
      <h5 className="text-xl font-bold text-blue-500 underline">Popular Classes</h5>
      <h2 className="text-4xl font-bold mt-3 mb-5">
        Choose Your Favorite Language
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {classes &&
          classes?.map((classDetails) => (
            <PopularClassesDetails
              key={classDetails.id}
              classDetails={classDetails}
            />
          ))}
      </div>
    </div>
  );
};

export default PopularClasses;
