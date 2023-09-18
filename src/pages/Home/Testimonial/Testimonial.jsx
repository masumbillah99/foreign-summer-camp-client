import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import { Fade, Slide } from "react-awesome-reveal";
import { Rating } from "@smastrom/react-rating";

const Testimonial = () => {
  const { data: reviews = [] } = useQuery({
    queryKey: ["user-review"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user-review`);
      return res.json();
    },
  });

  // console.log(reviews);

  return (
    <Fade delay={1e3} cascade damping={1e-1}>
      <div className="my-20 mx-5 md:mx-10 lg:mx-10 xl:mx-0">
        <Slide>
          <h3 className="text-2xl font-bold text-primary underline">
            Users Feedback
          </h3>
          <h1 className="text-4xl font-bold mt-3 mb-5">What Our Users Says</h1>
        </Slide>
        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="mySwiper bg-slate-700 text-white p-5 rounded-xl"
        >
          {reviews?.map((review) => (
            <SwiperSlide key={review?._id}>
              <div className="flex flex-col items-center gap-10 my-12 mx-12 md:mx-24">
                <Rating
                  style={{
                    maxWidth: 130,
                  }}
                  value={review.rating}
                  readOnly
                />
                {/* <FaQuoteLeft className="text-7xl text-yellow-500" /> */}
                <p>{review?.feedback}</p>
                <div className="text-center">
                  <h3 className="text-2xl uppercase text-orange-400 mb-1">
                    {review?.name}
                  </h3>
                  <p className="badge badge-warning">{review.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Fade>
  );
};

export default Testimonial;
