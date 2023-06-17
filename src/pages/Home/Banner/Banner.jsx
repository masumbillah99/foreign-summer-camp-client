import { Carousel } from "react-responsive-carousel";
import { Typewriter } from "react-simple-typewriter";
import banner1 from "../../../assets/banner/banner-1.jpg";
import banner2 from "../../../assets/banner/banner-2.jpg";
import banner3 from "../../../assets/banner/banner-3.png";
import banner4 from "../../../assets/banner/banner-4.jpg";

const Banner = () => {
  return (
    <Carousel
      autoPlay={true}
      interval={3000}
      showArrows={false}
      showIndicators={true}
      showStatus={false}
      showThumbs={false}
      className="text-center"
    >
      <div className="relative">
        <img
          className="h-[500px] md:h-[700px] xl:h-[951px]"
          src={banner4}
          alt="slider img"
        />
        {/* <div className="absolute flex flex-col items-center justify-center text-white top-1/3">
          <h3 className="font-4xl text-green-500">
            Welcome to Language Learning Platform
          </h3>
          <h2 className="text-5xl text-orange-600 font-bold my-3">
            <Typewriter
              words={[
                "Learn Foreign Language",
                "Learn Any Language Zero to Hero",
              ]}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h2>
          <p className="leading-8 text-lg my-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />{" "}
            Numquam sed delectus consequatur ipsum! Alias quisquam vero
            molestiae sapiente corporis ex. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Odio dolor placeat beatae dolorem
            laboriosam numquam iste cupiditate saepe expedita? Laboriosam?
          </p>
          <button className="btn btn-primary px-5">Learn More</button>
        </div> */}
      </div>
      <div className="relative">
        <img
          className="h-[500px] md:h-[700px] xl:h-[951px]"
          src={banner2}
          alt="slider img"
        />
        {/* <div className="absolute flex flex-col items-center justify-center text-white top-1/3">
          <h3 className="font-4xl text-green-500">
            Welcome to Language Learning Platform
          </h3>
          <h2 className="text-5xl text-orange-600 font-bold my-3">
            <Typewriter
              words={[
                "Learn Foreign Language",
                "Learn Any Language Zero to Hero",
              ]}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h2>
          <p className="leading-8 text-lg my-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />{" "}
            Numquam sed delectus consequatur ipsum! Alias quisquam vero
            molestiae sapiente corporis ex. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Odio dolor placeat beatae dolorem
            laboriosam numquam iste cupiditate saepe expedita? Laboriosam?
          </p>
          <button className="btn btn-primary px-5">Learn More</button>
        </div> */}
      </div>
      <div className="relative">
        <img
          className="h-[500px] md:h-[700px] xl:h-[951px]"
          src={banner3}
          alt="slider img"
        />
        <div className="absolute flex flex-col items-center justify-center text-white top-1/3">
          {/* <h3 className="font-4xl text-green-500">
            Welcome to Language Learning Platform
          </h3>
          <h2 className="text-5xl text-orange-600 font-bold my-3">
            <Typewriter
              words={[
                "Learn Foreign Language",
                "Learn Any Language Zero to Hero",
              ]}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h2>
          <p className="leading-8 text-lg my-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />{" "}
            Numquam sed delectus consequatur ipsum! Alias quisquam vero
            molestiae sapiente corporis ex. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Odio dolor placeat beatae dolorem
            laboriosam numquam iste cupiditate saepe expedita? Laboriosam?
          </p>
          <button className="btn btn-primary px-5">Learn More</button> */}
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
