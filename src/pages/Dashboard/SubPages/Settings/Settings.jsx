import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { imageUpload } from "../../../../api/utils";
import useAuth from "../../../../hooks/useAuth";

const Settings = () => {
  const { user, updateUserProfile, updateUserPassword } = useAuth();
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, handleSubmit, reset } = useForm();

  const handleUpdateInfo = (data) => {
    event.preventDefault();
    imageUpload(data.image[0]).then((imgResponse) => {
      console.log(imgResponse);
      updateUserProfile(data.name, imgResponse?.data?.display_url)
        .then(() => {
          toast.success("information updated successfully");
          reset();
        })
        .catch((error) => toast.error(error.message));
    });
  };

  // console.log(user);

  const handleUpdatePrivacy = () => {
    event.preventDefault();
    console.log(password, confirmPassword);

    if (password !== confirmPassword) {
      return toast.error("password does not match");
    }

    updateUserPassword(password)
      .then(() => {
        toast.success("update successful");
        event.target.reset();
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="">
      <div className="text-center mt-5 pb-5 mb-10 shadow-lg rounded-lg">
        <h3 className="text-3xl font-bold mb-2">Edit Your Profile</h3>
      </div>

      <div className="my-10 md:w-3/4 2xl:w-1/2 mx-auto ">
        <h3 className="text-xl font-bold">Update Your Profile Info</h3>
        <form
          onSubmit={handleSubmit(handleUpdateInfo)}
          className="border border-indigo-600 my-5 p-5 rounded-lg"
        >
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
          <div className="my-5  ">
            <label htmlFor="name" className="text-lg font-bold">
              Your Display Name
            </label>{" "}
            <br />
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="your user name"
              className="input input-bordered input-error w-full mt-2 focus:outline-none"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="image" className="text-lg font-bold">
              Your Profile Image
            </label>{" "}
            <br />
            <input
              type="file"
              {...register("image", { required: true })}
              placeholder="your profile picture"
              className="file-input file-input-bordered file-input-info w-full mt-2 focus:outline-none"
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
      </div>

      {/* update privacy */}
      <div className="my-10 md:w-3/4 2xl:w-1/2 mx-auto">
        <h3 className="text-xl font-bold">Update your Privacy</h3>
        <form
          onSubmit={handleUpdatePrivacy}
          className="my-5 p-5 rounded-lg border border-indigo-600 "
        >
          {/* <div>
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
          </div> */}
          <div className="my-5">
            <label htmlFor="password" className="text-lg font-bold">
              New Password
            </label>{" "}
            <div className="flex items-center relative">
              <input
                type={show ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="input input-bordered input-error w-full mt-2 focus:outline-none"
                required
              />
              <p
                className="absolute right-5 mt-2 text-xl cursor-pointer "
                onClick={() => setShow(!show)}
              >
                <small>
                  {show ? (
                    <span>
                      <FaRegEye className="" />
                    </span>
                  ) : (
                    <span>
                      <FaRegEyeSlash className="" />
                    </span>
                  )}
                </small>
              </p>
            </div>
          </div>
          <div className="my-5">
            <label htmlFor="confirm" className="text-lg font-bold">
              Confirm Password
            </label>{" "}
            <br />
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="confirm password"
              className="input input-bordered input-error w-full mt-2 focus:outline-none"
              required
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
      </div>
    </div>
  );
};

export default Settings;
