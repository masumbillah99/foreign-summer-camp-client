import Banner from "../Banner/Banner";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructor from "../PopularInstructors/PopularInstructor";

const Home = () => {
  return (
    <>
      <Banner />
      <div className="max-w-screen-xl mx-auto">
        <PopularClasses />
        <PopularInstructor />
      </div>
    </>
  );
};

export default Home;
