import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { BiTime } from "react-icons/bi";

const OfficeInformation = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 my-10 mx-3 lg:mx-10 xl:mx-0">
      <div className="flex items-center gap-3 bg-slate-800 text-white p-12 rounded-lg">
        <FaPhoneAlt className="text-3xl" />
        <div>
          <h4 className="text-xl mb-2">Contact Us</h4>
          <p>
            +88 01305 00 00 00 <br /> +88 01605 00 00 00
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 bg-orange-500 text-white p-12 rounded-lg">
        <MdLocationPin className="text-3xl" />
        <div>
          <h4 className="text-xl mb-2">Our Location</h4>
          <p>Gazipur 31, Dhaka, Bangladesh</p>
        </div>
      </div>
      <div className="flex items-center gap-3 bg-indigo-600 text-white p-12 rounded-lg">
        <BiTime className="text-3xl" />
        <div>
          <h4 className="text-xl mb-2">Opening Hours</h4>
          <p>
            Open 9.00 am to 5.00 pm <br /> Everyday
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfficeInformation;
