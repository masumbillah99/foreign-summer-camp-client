import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import logo from "../../../assets/logo.png";
import useAdmin from "../../../hooks/useAdmin";
// import useInstructor from "../../../hooks/useInstructor";
import { becomeInstructorRole, becomeStudentRole } from "../../../api/utils";
// import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logOutUser, role, setRole } = useAuth();
  const [isAdmin] = useAdmin();
  // const [isInstructor] = useInstructor();
  // const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser()
      .then()
      .catch((error) => toast.success(error.message));
  };

  const closeModal3 = () => {
    document.getElementById("my_modal_3").close();
  };

  // console.log(role);

  // handle student role & dashboard
  const handleStudentDashboard = () => {
    becomeStudentRole(user.email, "student").then(() => {
      toast.success("You are student now, Enroll a class");
      setRole("student");
      closeModal3();
    });
  };

  // handle instructor role & dashboard
  const handleInstructorDashboard = () => {
    becomeInstructorRole(user.email, "instructor").then(() => {
      toast.success("You are instructor now, Add class");
      setRole("instructor");
      closeModal3();
    });
  };

  /**
   * !user == disabled
   */

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-[#EEFF25]" : "text-gray-300"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allClasses"
          className={({ isActive }) =>
            isActive ? "text-[#EEFF25]" : "text-gray-300"
          }
        >
          Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/instructors"
          className={({ isActive }) =>
            isActive ? "text-[#EEFF25]" : "text-gray-300"
          }
        >
          Instructors
        </NavLink>
      </li>

      {/* <li>
        <NavLink
          to={`${
            user
              ? `/dashboard/${
                  isAdmin
                    ? "manageUser"
                    : "studentHome" && isInstructor
                    ? "instructorHome"
                    : "studentHome"
                }`
              : "/login"
          }`}
          className={({ isActive }) =>
            isActive ? "text-[#EEFF25]" : "text-gray-300"
          }
        >
          dashboard
        </NavLink>
      </li> */}

      {user ? (
        <>
          {isAdmin || role === "instructor" || role === "student" ? (
            <li>
              <NavLink
                to={`/dashboard/${
                  role === "student"
                    ? "studentHome"
                    : role === "instructor"
                    ? "instructorHome"
                    : isAdmin && "manageUser"
                }`}
                // to={`${
                //   user
                //     ? `/dashboard/${
                //         isAdmin
                //           ? "manageUser"
                //           : isInstructor
                //           ? "instructorHome"
                //           : !isAdmin && !isInstructor
                //           ? "studentHome"
                //           : "studentHome"
                //       }`
                //     : "/login"
                // }`}
                className={({ isActive }) =>
                  isActive ? "text-[#EEFF25]" : "text-gray-300"
                }
              >
                dashboard
              </NavLink>
            </li>
          ) : (
            <></>
          )}

          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <li>
            <button
              className="disabled:cursor-auto"
              onClick={() => window.my_modal_3.showModal()}
              disabled={role || isAdmin}
            >
              <div className="avatar">
                <div className="w-12 rounded">
                  <img
                    className="w-8 rounded"
                    src={user?.photoURL}
                    referrerPolicy={"no-referrer"}
                    title={user?.email}
                  />
                </div>
              </div>
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="btn btn-ghost pt-4 bg-red-500 hover:bg-red-700"
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "text-[#EEFF25]" : "text-gray-300"
            }
          >
            Login
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar fixed z-10 px-0 lg:px-10 bg-opacity-50 bg-black text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden mx-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 gap-2 shadow bg-slate-600 rounded-box w-52 ml-10"
          >
            {navItems}
          </ul>
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            className="w-20 text-white pl-10 hidden lg:block"
            src={logo}
            alt=""
          />
          <h3 className="text-xl md:text-2xl lg:text-xl lg:hidden xl:block font-bold logo-font flex-initial w-64 lg:w-full">
            Foreign Language School Camp
          </h3>
        </div>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu items-center lg:flex-nowrap menu-horizontal px-10 text-lg">
          {" "}
          {navItems}
        </ul>
      </div>

      {/* modal */}
      <div className="ml-0">
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box bg-gradient-to-r from-[#3DB5F8] to-[#5D73F2]">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={closeModal3}
                className="btn btn-sm btn-circle btn-ghost hover:btn-info absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Continue As A</h3>
            <div className="my-10 flex items-center justify-center gap-10">
              <button
                onClick={handleStudentDashboard}
                className="btn btn-accent hover:text-white"
              >
                Student
              </button>
              <button
                onClick={handleInstructorDashboard}
                className="btn btn-primary"
              >
                Instructor
              </button>
            </div>
          </div>
        </dialog>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Navbar;
