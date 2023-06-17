import { useQuery } from "@tanstack/react-query";
import { FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

const Testimonial = () => {
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/reviews`);
      return res.json();
    },
  });

  //   console.log(reviews);

  return (
    <div className="my-20 bg-slate-700 text-white p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-yellow-200 underline mb-3">
          What Our Student Says
        </h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae
          quisquam rem cupiditate, cum quaerat recusandae dolorem provident ipsa
          aperiam corrupti, ea quas, maxime consectetur voluptate ad
          exercitationem. Modi, asperiores consequuntur?
        </p>
      </div>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews?.map((review) => (
          <SwiperSlide key={review?._id}>
            <div className="flex flex-col items-center gap-10 my-12 mx-24">
              <FaQuoteLeft className="text-7xl text-yellow-500" />
              <p>{review?.description}</p>
              <div className="text-center">
                <h3 className="text-2xl uppercase text-orange-400">
                  {review?.student_name}
                </h3>
                <p>{review.title}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
