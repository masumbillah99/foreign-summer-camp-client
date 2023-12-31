import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { BiError } from "react-icons/bi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import loginImg from "../../assets/login.jpg";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { imageUpload, saveUserDb } from "../../api/utils";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // handle user registration
  const handleRegistration = (data) => {
    event.preventDefault();

    if (data.password !== data.confirm) {
      setError("your password does not match");
      return;
    }

    registerUser(data.email, data.password)
      .then((result) => {
        if (result.user) {
          imageUpload(data.image[0]).then((imgResponse) => {
            updateUserProfile(data.name, imgResponse?.data?.display_url).then(
              () => {
                toast.success("sign up successful");

                // save user to db
                saveUserDb(result.user).then(() => {
                  reset();
                  navigate("/");
                });
              }
            );
          });
        }
      })
      .catch((err) => {
        if (err.message.includes("email-already-in-use")) {
          toast.error("User already exists. Try to login");
        } else {
          toast.error(err.message);
        }
      });
  };

  return (
    <div className="max-w-screen-xl mx-auto my-20">
      <h1 className="mb-5 text-2xl font-bold text-center underline">
        Register Foreign Language School Camp
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 items-center lg:justify-items-center mx-5 md:mx-20 lg:mx-0">
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
                {...register("image")}
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

            {/* <div className="relative z-0 mt-5 mb-5 mx-auto group">
              <FormControl>
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  sx={{ fontSize: "17px", fontWeight: "600", color: "black" }}
                >
                  Continue as a
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="student"
                    control={<Radio />}
                    label="student"
                    onClick={(e) => setRole(e.target.value)}
                  />
                  <FormControlLabel
                    value="instructor"
                    control={<Radio />}
                    label="instructor"
                    onClick={(e) => setRole(e.target.value)}
                  />
                </RadioGroup>
              </FormControl>
            </div> */}

            <input
              type="submit"
              className="w-full text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-400 disabled:cursor-none"
              value="Register"
              // disabled={!role}
            />
          </form>

          <div className="text-center mt-3">
            <p className="text-lg">
              Already registered Foreign Language School Camp? Please
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
    </div>
  );
};

export default SignUp;
