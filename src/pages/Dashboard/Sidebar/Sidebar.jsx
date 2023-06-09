import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FcSettings } from "react-icons/fc";
import { HiBars3 } from "react-icons/hi2";
import useAuth from "../../../hooks/useAuth";
const Sidebar = () => {
  const [toggle, setToggle] = useState(false);
  const { user, role } = useAuth();

  const [isActive, setActive] = useState("false");
  const toggleHandler = (event) => {
    setToggle(event.target.checked);
  };
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            Learn_Do School
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <HiBars3 className="h-5 w-5" />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-orange-300 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          <ul className="menu  px-10 text-lg">
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
                to="/dashboard/instructors"
                className={({ isActive }) =>
                  isActive ? "text-white" : "text-gray-500"
                }
              >
                My Classes
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
            <hr className="my-10" />
            <li>
              <Link to="/">Home</Link>
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
