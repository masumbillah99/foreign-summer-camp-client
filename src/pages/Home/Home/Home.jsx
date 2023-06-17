import Banner from "../Banner/Banner";
import OfficeInformation from "../OfficeInformation/OfficeInformation";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructor from "../PopularInstructors/PopularInstructor";

const Home = () => {
  return (
    <>
      <Banner />
      <div className="max-w-screen-xl mx-auto">
        <PopularClasses />
        <PopularInstructor />
        <OfficeInformation />
      </div>
    </>
  );
};

export default Home;
