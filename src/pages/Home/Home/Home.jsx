import Banner from "../Banner/Banner";
import PopularClasses from "../PopularClasses/PopularClasses";

const Home = () => {
  return (
    <>
      <Banner />
      <div className="max-w-screen-xl mx-auto">
        <PopularClasses />
      </div>
    </>
  );
};

export default Home;
