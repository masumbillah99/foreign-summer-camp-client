import { useEffect } from "react";
import { getAllClass } from "../../../../api/class";

const MyClasses = () => {
  useEffect(() => {
    getAllClass().then((data) => {
      console.log(data);
    });
  });

  return (
    <div>
      <h3>Hello MY Classes</h3>
    </div>
  );
};

export default MyClasses;
