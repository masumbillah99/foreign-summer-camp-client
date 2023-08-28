// import { useQuery } from "@tanstack/react-query";
import PopularClassesDetails from "./PopularClassesDetails";
import { Fade, Slide } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import ClassCompo from "../../../components/reusable/ClassCompo";

const PopularClasses = () => {
  const [approvedClass] = ClassCompo();

  return (
    <div className="my-20 mx-5 lg:mx-10 xl:mx-0">
      <Slide>
        <h5 className="text-2xl font-bold text-primary underline">
          Popular Classes
        </h5>
        <h2 className="text-4xl font-bold mt-3 mb-5">
          Choose Your Favorite Language
        </h2>
      </Slide>
      <Fade delay={1e3} cascade damping={1e-1}>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
          {approvedClass &&
            approvedClass
              ?.sort((a, b) => a - b)
              .slice(0, 6)
              ?.map((classDetails) => (
                <PopularClassesDetails
                  key={classDetails._id}
                  classDetails={classDetails}
                />
              ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/allClasses" className="btn btn-primary">
            Explore All Classes
          </Link>
        </div>
      </Fade>
    </div>
  );
};

export default PopularClasses;
