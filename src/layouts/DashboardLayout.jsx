import { Link, NavLink, Outlet } from "react-router-dom";
import { FaHistory, FaHome, FaShoppingCart, FaWallet } from "react-icons/fa";
import { HiMail, HiShoppingCart } from "react-icons/hi";
import { HiBars3 } from "react-icons/hi2";
import { MdSettings, MdReviews } from "react-icons/md";
import { AiFillFileAdd, AiFillHome } from "react-icons/ai";
import useAdmin from "../hooks/useAdmin";
import useCart from "../hooks/useCart";
import logo from "../assets/logo.png";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user, role } = useAuth();
  const [isAdmin] = useAdmin();
  const [cart] = useCart();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content mx-5 md:mx-10 relative">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-neutral drawer-button lg:hidden fixed top-2 right-3"
        >
          <HiBars3 className="h-5 w-5" />
        </label>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-[#2C2C2C] text-lg">
          <div className="text-white pb-24 flex items-center justify-evenly">
            <img src={logo} className="w-10" alt="logo" />{" "}
            <span className="text-sm">Foreign Language School Camp</span>
          </div>
          {/* Sidebar content here */}
          {isAdmin && (
            <>
              <li>
                <NavLink
                  to="/dashboard/adminHome"
                  className={({ isActive }) =>
                    isActive ? "text-white" : "text-gray-400"
                  }
                >
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageUser"
                  className={({ isActive }) =>
                    isActive ? "text-white" : "text-gray-400"
                  }
                >
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageClass"
                  className={({ isActive }) =>
                    isActive ? "text-white" : "text-gray-400"
                  }
                >
                  Manage Classes
                </NavLink>
              </li>
            </>
          )}

          {role === "instructor" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/instructorHome"
                  className={({ isActive }) =>
                    isActive ? "text-white" : "text-gray-400"
                  }
                >
                  {" "}
                  <AiFillHome />
                  Instructor Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/addClass"
                  className={({ isActive }) =>
                    isActive ? "text-white" : "text-gray-400"
                  }
                >
                  <AiFillFileAdd /> Add Class
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myClasses"
                  className={({ isActive }) =>
                    isActive ? "text-white" : "text-gray-400"
                  }
                >
                  {" "}
                  <HiShoppingCart />
                  My Classes
                </NavLink>
              </li>
            </>
          )}

          {role === "student" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/studentHome"
                  className={({ isActive }) =>
                    isActive ? "text-white" : "text-gray-400"
                  }
                >
                  <AiFillHome /> Student Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/selectedClass"
                  className={({ isActive }) =>
                    isActive ? "text-white" : "text-gray-400"
                  }
                >
                  <FaShoppingCart /> Selected Class
                  <div className="badge badge-secondary ms-0">
                    {cart.length}
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/enrolledClass"
                  className={({ isActive }) =>
                    isActive ? "text-white" : "text-gray-400"
                  }
                >
                  <FaWallet />
                  Enrolled Classes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className={({ isActive }) =>
                    isActive ? "text-white" : "text-gray-400"
                  }
                >
                  <FaHistory />
                  Payment History
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink
              to="/dashboard/reviews"
              className={({ isActive }) =>
                isActive ? "text-white" : "text-gray-400"
              }
            >
              <MdReviews />
              Give Review
            </NavLink>
          </li>
          <hr className="px-5 my-7" />
          <li>
            <Link to="/" className="text-gray-400">
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-gray-400">
              <HiMail />
              contact
            </Link>
          </li>
          <div className="absolute bottom-14 left-8">
            <div className="text-4xl lg:ml-1">
              <NavLink to={"/dashboard/settings"}>
                <MdSettings
                  className="text-yellow-500 cursor-pointer"
                  title="settings"
                />
              </NavLink>
            </div>
            <div className="avatar top-6">
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={user?.photoURL}
                  alt=""
                  title={user?.displayName}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
