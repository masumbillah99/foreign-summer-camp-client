import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import useCart from "../../../../hooks/useCart";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import CheckOutForm from "../Payment/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const SelectedClass = () => {
  const [cart, refetch] = useCart();
  const [open, setOpen] = React.useState(false);
  const [price, setPrice] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [cartItemId, setCartItemId] = useState(null);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  const handleClickOpen = (itemId, itemPrice, _id) => {
    setOpen(true);
    setPrice(itemPrice);
    setSelectedItemId(itemId);
    setCartItemId(_id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // reduce total
  // how does reduce works
  const totalPrice = cart.reduce((sum, item) => item.price + sum, 0);

  const handleDelete = (item) => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/carts/${item._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("class deleted successfully");
          refetch();
        }
      });
  };

  // console.log(cart);

  return (
    <section className="mb-10">
      <div className="text-center mt-5 pb-5 mb-10 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center underline">
          My Selected Class
        </h1>
      </div>
      <div className="bg-gray-100 rounded-lg pb-5 px-5">
        <div className="uppercase font-semibold my-10 py-10 flex items-center justify-evenly">
          <h3>Total Classes: {cart.length}</h3>
          <h3>Total Amount: ${totalPrice}</h3>
        </div>
        <>
          {cart && cart.length > 0 ? (
            <div className="overflow-x-auto w-full px-5 lg:px-0">
              <table className="table w-full">
                {/* head */}
                <thead>
                  <tr className="bg-[#D1A054] text-white">
                    <th>#</th>
                    <th>Class Image</th>
                    <th>Class Name</th>
                    <th>Available Seat</th>
                    <th>Price</th>
                    <th>Enroll</th>
                    <th>Remove</th>
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
                      <td className="font-semibold">{item.available_seat}</td>
                      <td className="text-xl font-semibold">$ {item.price}</td>
                      <Button
                        variant="outlined"
                        className="top-5"
                        onClick={() =>
                          handleClickOpen(
                            item?.class_id,
                            item?.price,
                            item?._id
                          )
                        }
                      >
                        Payment
                      </Button>

                      <Dialog
                        fullWidth={fullWidth}
                        maxWidth={maxWidth}
                        open={open}
                        onClose={handleClose}
                        className="text-center"
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle
                          className="border"
                          sx={{ fontWeight: "bold" }}
                          id="alert-dialog-title"
                        >
                          {`Your Payable Amount: BDT ${price}`}
                        </DialogTitle>

                        <DialogContent className="mt-3 text-left">
                          <DialogContentText id="alert-dialog-description">
                            We assure you that our payment system is highly
                            secure. You can easily make payments through an easy
                            process.
                          </DialogContentText>
                          <DialogContentText
                            id="alert-dialog-description"
                            sx={{ fontWeight: "600", margin: "7px 0" }}
                          >
                            If you don&apos;t have any card? You can use this
                            demo card.
                          </DialogContentText>
                          <Typography className="text-primary">
                            Card Number: 5555555555554444
                          </Typography>
                          <Typography className="text-primary">
                            MM / YY: 12 / 25
                          </Typography>
                          <Typography className="text-primary">
                            CVC: 123
                          </Typography>
                          <Typography className="text-primary">
                            ZIP: 45612
                          </Typography>
                        </DialogContent>

                        <Elements stripe={stripePromise}>
                          <CheckOutForm
                            handleClose={handleClose}
                            itemInfo={item}
                            totalPrice={price}
                            selectedItemId={selectedItemId}
                            cartItemId={cartItemId}
                            refetch={refetch}
                          />
                        </Elements>
                      </Dialog>

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
          ) : (
            <div className="w-2/3 mx-auto flex flex-col lg:flex-row items-center gap-10">
              <div className="py-10 mx-auto text-center border p-5 rounded-lg">
                <p className="text-xl font-bold mb-3">
                  No selected class data found
                </p>
                <Link className="btn btn-primary" to={"/allClasses"}>
                  Select Class
                </Link>
              </div>
              <div className="py-10 mx-auto text-center border p-5 rounded-lg">
                <p className="text-xl font-bold mb-3">
                  See your all enroll class
                </p>
                <Link
                  className="btn btn-primary"
                  to={"/dashboard/enrolledClass"}
                >
                  My Enrolled Class
                </Link>
              </div>
            </div>
          )}
        </>
      </div>
    </section>
  );
};

export default SelectedClass;
