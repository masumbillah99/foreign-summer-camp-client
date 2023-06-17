import Banner from "../Banner/Banner";
import OfficeInformation from "../OfficeInformation/OfficeInformation";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructor from "../PopularInstructors/PopularInstructor";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
  return (
    <>
      <Banner />
      <div className="max-w-screen-xl mx-auto">
        <PopularClasses />
        <PopularInstructor />
        <Testimonial />
        <OfficeInformation />
      </div>
    </>
  );
};

export default Home;
