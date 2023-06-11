import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useCart from "../../../hooks/useCart";
import { FaDollarSign } from "react-icons/fa";

const SelectedClass = () => {
  const [cart, refetch] = useCart();
  //   console.log(cart);

  // reduce total
  const total = cart.reduce((sum, item) => item.price + sum, 0);
  // console.log(typeof totalPrice);
  // const total = parseInt(totalPrice);

  const handleDelete = (item) => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/carts/${item._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Class cart deleted successfully");
          refetch();
        }
      });
  };

  return (
    <section className="w-full max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold text-center underline">
        Wanna Add More
      </h1>
      <div className="bg-gray-100 rounded-lg">
        <div className="uppercase font-semibold my-10 py-10 flex items-center justify-evenly">
          <h3>Total Classes: {cart.length}</h3>
          <h3>Total Amount: ${total}</h3>
          <Link to="/dashboard/payment">
            <button className="btn btn-warning">
              <FaDollarSign /> payment
            </button>
          </Link>
        </div>
        <div className="overflow-x-auto w-full px-5 lg:px-0">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr className="bg-[#D1A054] text-white">
                <th>#</th>
                <th>Class Image</th>
                <th>Class Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((item, index) => (
                <tr className="hover border" key={item?._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item?.image}
                          alt="Avatar Tailwind CSS Component"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold">{item.name}</td>
                  <td className="text-xl font-semibold">$ {item.price}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn btn-ghost text-white bg-red-500 hover:bg-red-600 btn-sm"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default SelectedClass;
