import { addNewClass } from "../../../../api/class";
import { imageUpload } from "../../../../api/utils";
import AddClassForm from "./AddClassForm";

const AddClass = () => {
  const handleAddClass = (data, e) => {
    const photo = data.image[0];
    // upload image
    imageUpload(photo).then((imgData) => {
      const classData = {
        name: data.name,
        image: imgData.data.display_url,
        instructor_name: data.instructor_name,
        email: data.email,
        price: parseFloat(data.price),
        available_seat: parseFloat(data.available_seat),
        description: data.description,
        status: "pending",
      };
      // post class data to server
      addNewClass(classData)
        .then((result) => {
          console.log(result);
          e.target.reset();
        })
        .catch((err) => console.log(err));
    });
  };

  return (
    <div className="my-20">
      <h1 className="font-bold text-2xl mb-5 text-center uppercase underline">
        add a new class
      </h1>
      <AddClassForm handleAddClass={handleAddClass} />
    </div>
  );
};

export default AddClass;
