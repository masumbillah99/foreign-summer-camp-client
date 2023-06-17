// import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";
import { FaHistory, FaHome, FaShoppingCart, FaWallet } from "react-icons/fa";
import { HiMail, HiShoppingCart } from "react-icons/hi";
import { AiFillFileAdd, AiFillHome } from "react-icons/ai";
import useCart from "../../../hooks/useCart";
const Sidebar = () => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [cart] = useCart();
  // const [isActive, setActive] = useState(false);

  // Sidebar Responsive Handler
  // const handleToggle = () => {
  //   setActive(!isActive);
  // };

  // const isAdmin = true;
  // console.log(isAdmin, isInstructor);

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {isAdmin && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/adminHome"
                    className={({ isActive }) =>
                      isActive ? "text-white" : "text-gray-500"
                    }
                  >
                    Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manageUser"
                    className={({ isActive }) =>
                      isActive ? "text-white" : "text-gray-500"
                    }
                  >
                    Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manageClass"
                    className={({ isActive }) =>
                      isActive ? "text-white" : "text-gray-500"
                    }
                  >
                    Manage Classes
                  </NavLink>
                </li>
              </>
            )}
            {isInstructor && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/instructorHome"
                    className={({ isActive }) =>
                      isActive ? "text-white" : "text-gray-500"
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
                      isActive ? "text-white" : "text-gray-500"
                    }
                  >
                    <AiFillFileAdd /> Add Class
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/myClasses"
                    className={({ isActive }) =>
                      isActive ? "text-white" : "text-gray-500"
                    }
                  >
                    {" "}
                    <HiShoppingCart />
                    My Classes
                  </NavLink>
                </li>
              </>
            )}
            {!isAdmin && !isInstructor && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/studentHome"
                    className={({ isActive }) =>
                      isActive ? "text-white" : "text-gray-500"
                    }
                  >
                    <AiFillHome /> Student Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/selectedClass"
                    className={({ isActive }) =>
                      isActive ? "text-white" : "text-gray-500"
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
                      isActive ? "text-white" : "text-gray-500"
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
                      isActive ? "text-white" : "text-gray-500"
                    }
                  >
                    <FaHistory />
                    Payment History
                  </NavLink>
                </li>
              </>
            )}
            <div className="divider"></div>
            <li>
              <Link to="/">
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <HiMail />
                contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Small Screen Navbar */}
      {/* <div className="bg-gray-100 text-gray-800 flex justify-between :hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            Foreign Lab
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="p-4 focus:outline-none focus:bg-gray-200"
        >
          <HiBars3 className="h-5 w-5" />
        </button>
      </div>
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-orange-300 w-64 space-y-6 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          <h2 className="text-xl font-bold text-center underline">
            Foreign Lab
          </h2>
          <ul className="menu text-lg pt-20">
            {isAdmin && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/adminHome"
                    className={({ isActive }) =>
                      isActive ? "text-white" : "text-gray-500"
                    }
                  >
                    Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manageUser"
                    className={({ isActive }) =>
                      isActive ? "text-white" : "text-gray-500"
                    }
                  >
                    Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manageClass"
                    className={({ isActive }) =>
                      isActive ? "text-white" : "text-gray-500"
                    }
                  >
                    Manage Classes
                  </NavLink>
                </li>
              </>
            )}
            {isInstructor && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/instructorHome"
                    className={({ isActive }) =>
                      isActive ? "text-white" : "text-gray-500"
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
                      isActive ? "text-white" : "text-gray-500"
                    }
                  >
                    <AiFillFileAdd /> Add Class
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/myClasses"
                    className={({ isActive }) =>
                      isActive ? "text-white" : "text-gray-500"
                    }
                  >
                    {" "}
                    <HiShoppingCart />
                    My Classes
                  </NavLink>
                </li>
              </>
            )}
            {!isAdmin && !isInstructor && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/studentHome"
                    className={({ isActive }) =>
                      isActive ? "text-white" : "text-gray-500"
                    }
                  >
                    <AiFillHome /> Student Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/selectedClass"
                    className={({ isActive }) =>
                      isActive ? "text-white" : "text-gray-500"
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
                      isActive ? "text-white" : "text-gray-500"
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
                      isActive ? "text-white" : "text-gray-500"
                    }
                  >
                    <FaHistory />
                    Payment History
                  </NavLink>
                </li>
              </>
            )}
            <div className="divider"></div>
            <li>
              <Link to="/">
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <HiMail />
                contact
              </Link>
            </li>
          </ul>
        </div>
      </div> */}
    </>
  );
};

export default Sidebar;
