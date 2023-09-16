import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { saveUserDb } from "../../api/utils";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSign = () => {
    googleSignIn()
      .then((result) => {
        saveUserDb(result.user).then(() => {
          toast.success("sign in with google successful");
          navigate(from, { replace: true });
        });
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <>
      <button
        onClick={handleGoogleSign}
        type="button"
        className="hover:text-white border border-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center mr-2 mb-2"
      >
        <FaGoogle className="inline me-2" />
        Continue with Google
      </button>
      <ToastContainer />
    </>
  );
};

export default SocialLogin;
