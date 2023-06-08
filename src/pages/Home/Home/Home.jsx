import Banner from "../Banner/Banner";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";

const Home = () => {
  return (
    <>
      <Banner />
      <div className="max-w-screen-xl mx-auto">
        <PopularClasses />
        <PopularInstructors />
      </div>
    </>
  );
};

export default Home;
