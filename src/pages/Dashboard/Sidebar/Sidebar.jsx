import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";
import { FaHistory, FaHome, FaShoppingCart, FaWallet } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { AiFillHome } from "react-icons//ai";
import useCart from "../../../hooks/useCart";
const Sidebar = () => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [cart] = useCart();
  const [isActive, setActive] = useState(false);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  // const isAdmin = true;
  // console.log(isAdmin, isInstructor);

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between :hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            Learn_Do School
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="p-4 focus:outline-none focus:bg-gray-200"
        >
          <HiBars3 className="h-5 w-5" />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-orange-300 w-64 space-y-6 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          <h2 className="text-xl font-bold text-center underline">
            Learn_Do School
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
                    Add Class
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/myClasses"
                    className={({ isActive }) =>
                      isActive ? "text-white" : "text-gray-500"
                    }
                  >
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
          {/* Nav Items */}
          {/* <div className='flex flex-col justify-between flex-1 mt-6'>
            <nav>
              {role && role === 'host' ? (
                <>
                  <label
                    htmlFor='Toggle3'
                    className='inline-flex w-full justify-center items-center px-2 rounded-md cursor-pointer text-gray-800'
                  >
                    <input
                      onChange={toggleHandler}
                      id='Toggle3'
                      type='checkbox'
                      className='hidden peer'
                    />
                    <span className='px-4 py-1 rounded-l-md bg-rose-400 peer-checked:bg-gray-300'>
                      Guest
                    </span>
                    <span className='px-4 py-1 rounded-r-md bg-gray-300 peer-checked:bg-rose-400'>
                      Host
                    </span>
                  </label> */}
          {/* Menu Links */}
          {/* {toggle ? <HostMenu /> : <GuestMenu />} */}
          {/* </>
              ) : (
                <GuestMenu />
              )}
            </nav>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
