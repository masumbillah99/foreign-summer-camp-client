import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import logo from "../../../assets/logo.png";

const Navbar = () => {
  const { user, logOutUser } = useAuth();

  const handleLogout = () => {
    logOutUser()
      .then()
      .catch((error) => toast.success(error.message));
  };

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
      <li>
        <NavLink
          to={"/dashboard"}
          className={({ isActive }) =>
            isActive ? "text-[#EEFF25]" : "text-gray-300"
          }
        >
          dashboard
        </NavLink>
      </li>
      {user ? (
        <>
          <li>
            <img
              className="w-20 rounded-full"
              src={user.photoURL}
              referrerPolicy={"no-referrer"}
              alt="user profile img"
            />
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
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
            className="menu menu-sm dropdown-content mt-3 p-2 gap-2 shadow bg-slate-600 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        <div className="flex items-center gap-4 cursor-pointer">
          <img className="w-20 text-white pl-10" src={logo} alt="" />
          <h3 className="text-2xl font-bold logo-font">Learn_Do School</h3>
        </div>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-10 text-lg"> {navItems}</ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
