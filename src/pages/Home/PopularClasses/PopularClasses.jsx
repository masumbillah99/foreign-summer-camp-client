import { useQuery } from "@tanstack/react-query";
import PopularClassesDetails from "./PopularClassesDetails";
import { Fade, Slide } from "react-awesome-reveal";

const PopularClasses = () => {
  // const [classes, setClasses] = useState([]);

  const { data: classData = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/classes`);
      return res.json();
    },
  });

  // TODO: based on students show in ui

  const approvedClass = classData.filter((data) => data.status === "approved");
  // const sliceClass = approvedClass.slice(0, 6);
  // console.log(sliceClass);
  // console.log(approvedClass);

  // useEffect(() => {
  //   getAllClass().then((data) => {
  //     setClasses(data);
  //   });
  // }, []);

  return (
    <div className="my-20 mx-5 lg:mx-20 xl:mx-0">
      <Slide className="text-center">
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
              .slice(0, 6)
              ?.map((classDetails) => (
                <PopularClassesDetails
                  key={classDetails._id}
                  classDetails={classDetails}
                />
              ))}
        </div>
      </Fade>
    </div>
  );
};

export default PopularClasses;
