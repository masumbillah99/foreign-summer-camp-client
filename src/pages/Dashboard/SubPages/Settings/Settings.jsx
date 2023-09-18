// import { useState } from "react";
import { useForm } from "react-hook-form";
// import { BiError } from "react-icons/bi";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { imageUpload } from "../../../../api/utils";
import useAuth from "../../../../hooks/useAuth";

const Settings = () => {
  const { user, updateUserProfile } = useAuth();
  // const [imgUrl, setImgUrl] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [passError, setPassError] = useState("");
  // const [confirmError, setConfirmError] = useState("");
  // const [show, setShow] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const handleUpdateInfo = (data) => {
    event.preventDefault();
    // console.log(data);

    imageUpload(data.photoURL[0]).then((imageData) => {
      if (imageData.success) {
        const imgURL = imageData.data.display_url;

        updateUserProfile(data.displayName, imgURL)
          .then(() => {
            toast.success("profile info update successfully");
            reset();
          })
          .catch((err) => {
            // console.log(err.message);
            toast.error(err.message);
          });
      }
    });
  };

  // const handleUpdatePrivacy = () => {
  //   event.preventDefault();
  //   console.log(password, confirmPassword);

  //   if (
  //     !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
  //       password
  //     )
  //   ) {
  //     setPassError(
  //       "password must be at least one letter, one number and one special character"
  //     );
  //   }

  //   if (password !== confirmPassword) {
  //     setConfirmError("password does not match");
  //     return;
  //   }

  //   // if (user) {
  //   // const email = user.email;
  //   // const pass = prompt("Please enter your current password");

  //   updateUserPassword(password)
  //     .then(() => {
  //       toast.success("update password successfully");
  //       event.target.reset();
  //     })
  //     .catch((err) => console.log(err));

  //   // Create an EmailAuthProvider credential
  //   // const credential = { email, pass };

  //   //   reauthenticateUser(credential)
  //   //     .then(() => {
  //   //       updateUserPassword(password)
  //   //         .then(() => {
  //   //           toast.success("update password successfully");
  //   //           event.target.reset();
  //   //         })
  //   //         .catch((err) => console.log(err));
  //   //     })
  //   //     .catch((error) => console.log(error));
  //   // } else {
  //   //   console.log("no user");
  //   // }
  // };

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

      <div className="my-10 md:w-3/4 xl:w-1/2 mx-auto ">
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
          <div className="mb-5">
            <label htmlFor="name" className="text-lg font-bold">
              Your Name
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
              Your Profile Image
            </label>{" "}
            <br />
            <input
              type="file"
              {...register("photoURL")}
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

      {/* <div className="my-10 md:w-3/4 xl:w-1/2 mx-auto">
        <h3 className="text-xl font-bold">Update your Privacy</h3>
        <form
          onSubmit={handleUpdatePrivacy}
          className="my-5 p-5 rounded-lg border border-indigo-600 "
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
            {passError && (
              <p className="flex items-center gap-2 text-red-600">
                <BiError /> {passError}
              </p>
            )}
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
            {confirmError && (
              <p className="flex items-center gap-2 text-red-600">
                <BiError /> {confirmError}
              </p>
            )}
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
      </div> */}

      {/* <p className="bg-error p-1 absolute bottom-0 w-1/2 mx-auto text-center">
        &copy; copyright from summer-camp authorization
      </p> */}
    </div>
  );
};

export default Settings;
