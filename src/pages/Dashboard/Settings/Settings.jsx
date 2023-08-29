import { useState } from "react";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../api/utils";
import useAuth from "../../../hooks/useAuth";

const Settings = () => {
  const { user, updateUserProfile, updateUserPassword } = useAuth();
  const [imgUrl, setImgUrl] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdate = (data, e) => {
    e.preventDefault();
    // console.log(data);

    imageUpload(data.photoURL[0]).then((imageData) => {
      if (imageData.success) {
        // const imgURL = imageData.data.display_url;
        setImgUrl(imageData?.data.display_url);
      }
    });

    // const userData = {
    //   displayName: data.name,
    //   photoURL: imgUrl,
    //     phoneNumber: data.phone,
    // };

    updateUserProfile(data.name, imgUrl)
      .then((result) => console.log(result, user))
      .catch((err) => console.log(err));

    updateUserPassword(data.password)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div className="">
      <div className="mt-5 mb-10">
        <h3 className="text-3xl font-bold mb-2">Edit Your Profile</h3>
        <p>
          Here you can edit your profile by change your username, your email
          password etc.
        </p>
        <hr className="border-indigo-500 border-2 w-1/2 lg:w-1/3 xl:w-1/4 my-1" />
      </div>

      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="border border-indigo-600 md:w-3/4 xl:w-1/2 mx-auto p-5 rounded-lg"
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-lg font-bold">
            Update User Name
          </label>{" "}
          <br />
          <input
            type="text"
            {...register("displayName")}
            placeholder="your user name"
            className="input input-bordered input-error w-full mt-2 focus:outline-none"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="photoURL" className="text-lg font-bold">
            Update Your Profile
          </label>{" "}
          <br />
          <input
            type="file"
            {...register("photoURL")}
            placeholder="your profile picture"
            className="file-input file-input-bordered file-input-info w-full mt-2 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-lg font-bold">
            Your Email Address
          </label>{" "}
          <br />
          <input
            type="email"
            className="input input-bordered input-error w-full mt-2 focus:outline-none"
            defaultValue={user?.email}
            readOnly
          />
        </div>
        <div className="my-5">
          <label htmlFor="password" className="text-lg font-bold">
            Change Your Password
          </label>{" "}
          <br />
          <input
            type="password"
            {...register("password")}
            placeholder="your password"
            className="input input-bordered input-error w-full mt-2 focus:outline-none"
          />
        </div>
        <div className="my-5">
          <label htmlFor="phone" className="text-lg font-bold">
            Change Your Phone Number
          </label>{" "}
          <br />
          <input
            type="number"
            {...register("phone")}
            placeholder="your phone number"
            className="input input-bordered input-error w-full mt-2 focus:outline-none"
          />
        </div>
        <div className="relative mb-20">
          <button
            className="absolute right-0 border bg-indigo-500 hover:bg-indigo-700 text-white px-7 py-3 rounded-lg"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>

      {/* <p className="bg-error p-1 absolute bottom-0 w-1/2 mx-auto text-center">
        &copy; copyright from summer-camp authorization
      </p> */}
    </div>
  );
};

export default Settings;
