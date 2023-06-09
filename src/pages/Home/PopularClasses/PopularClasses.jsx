import { useEffect } from "react";
import { useState } from "react";
import { getAllClass } from "../../../api/class";
import PopularClassesDetails from "./PopularClassesDetails";

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getAllClass().then((data) => {
      setClasses(data);
    });
  }, []);

  return (
    <div className="my-20">
      <h5 className="text-xl font-bold text-blue-500 underline">
        Popular Classes
      </h5>
      <h2 className="text-4xl font-bold mt-3 mb-5">
        Choose Your Favorite Language
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {classes &&
          classes?.map((classDetails) => (
            <PopularClassesDetails
              key={classDetails._id}
              classDetails={classDetails}
            />
          ))}
      </div>
    </div>
  );
};

export default PopularClasses;
