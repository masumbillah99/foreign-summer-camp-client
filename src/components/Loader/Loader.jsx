import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <HashLoader size={100} color="red" />
      <h1 className="text-bold text-2xl uppercase mt-10">
        Are you waiting..........
      </h1>
    </div>
  );
};

export default Loader;
