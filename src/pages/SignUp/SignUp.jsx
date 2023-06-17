import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { BiError } from "react-icons/bi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import loginImg from "../../assets/login.jpg";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { saveUser } from "../../api/auth";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // handle user registration
  const handleRegistration = (data, e) => {
    e.preventDefault();
    // const confirmPassword = e.target.confirm.value;
    // console.log(data, confirmPassword);
    const formData = new FormData();
    formData.append("image", data.image[0]);
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_UPLOAD_TOKEN
    }`;

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          const imgURL = imageData.data.display_url;
          // console.log(imgURL);
          if (data.password !== data.confirm) {
            setError("your password does not match");
            return;
          }
          registerUser(data.email, data.password).then((result) => {
            updateUserProfile(data.name, imgURL)
              .then(() => {
                console.log(result.user);
                toast.success("Sign up successful");
                // save user to db
                saveUser(result.user);
                navigate("/login");
              })
              .catch((err) => {
                console.log(err.message);
                toast.error(err.message);
              });
          });
        }
      });
  };

  return (
    <div className="max-w-screen-xl mx-auto my-20">
      <h1 className="mb-5 text-2xl font-bold text-center underline">
        Register Foreign Lab
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center">
        <img src={loginImg} className="w-3/4 lg:w-full" alt="" />
        <div>
          <form onSubmit={handleSubmit(handleRegistration)}>
            <div className="relative z-0 mb-6 mx-auto group">
              <input
                type="text"
                {...register("name", { required: true })}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Your Name
              </label>
            </div>
            <div className="relative z-0 mb-6 mx-auto group">
              <input
                className="file-input file-input-bordered w-full"
                {...register("image", { required: true })}
                type="file"
              />
            </div>
            <div className="relative z-0 mb-6 mx-auto group">
              <input
                type="email"
                {...register("email", { required: true })}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
              {errors.email?.type === "pattern" && (
                <p className="text-red-600">
                  <BiError />
                  Please provide a valid email
                </p>
              )}
            </div>
            <div className="relative z-0 mb-6 mx-auto group">
              <div className="flex items-center relative">
                <input
                  type={show ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                  })}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <p
                  className="absolute right-2 text-xl cursor-pointer "
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
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
              {errors.password?.type === "required" && (
                <p className="text-red-600">
                  {" "}
                  <BiError />
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">
                  {" "}
                  <BiError />
                  Password must be 6 characters
                </p>
              )}
            </div>
            <div className="relative z-0 mb-6 mx-auto group">
              <div className="flex items-center relative">
                <input
                  type={show ? "text" : "password"}
                  {...register("confirm", {
                    required: true,
                    minLength: 6,
                  })}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <p
                  className="absolute right-2 text-xl cursor-pointer "
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
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Confirm Password
              </label>
              {error && <span className="text-red-500">{error}</span>}
            </div>
            <input
              type="submit"
              className="w-full text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              value="Register"
            />
          </form>
          <div className="text-center mt-3">
            <p className="text-lg">
              Already registered Foreign Lab? Please
              <Link
                className="text-orange-500 ms-1 hover:underline"
                to="/login"
              >
                Login
              </Link>
            </p>
            <div className="flex items-center justify-center mx-auto my-3">
              <hr className="border-gray-500 border w-1/5" />
              <span className="mx-3">OR</span>
              <hr className="border-gray-500 border w-1/5" />
            </div>
            <SocialLogin />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
