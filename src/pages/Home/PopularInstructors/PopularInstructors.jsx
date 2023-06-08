import { useState, useEffect } from "react";
import PopularInstructor from "./PopularInstructor";

const PopularInstructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/popularInstructors`)
      .then((res) => res.json())
      .then((data) => setInstructors(data));
  }, []);

  return (
    <div className="my-20">
      <h5 className="text-xl font-bold text-blue-500 underline mb-5">
        Popular Instructors
      </h5>
      <h2 className="text-4xl font-bold mt-3 mb-5">
        Find Your Most Favorite Instructor
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {instructors &&
          instructors?.map((instructorDetails) => (
            <PopularInstructor
              key={instructorDetails._id}
              instructorDetails={instructorDetails}
            />
          ))}
      </div>
    </div>
  );
};

export default PopularInstructors;
