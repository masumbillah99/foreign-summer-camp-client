import { useEffect, useState } from "react";
import { Button, DialogActions } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast, ToastContainer } from "react-toastify";
import { updateClassData } from "../../../../api/Class";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import "./CheckoutForm.css";

const CheckOutForm = ({
  handleClose,
  itemInfo,
  totalPrice,
  selectedItemId,
  cartItemId,
  refetch,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState("");

  // 1. get clientSecret from backend
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          // console.log("{from 35}", res.data);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [totalPrice, axiosSecure]);

  // console.log(itemInfo);

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    // get a reference to a mounted care-element
    const card = elements.getElement(CardElement);
    if (card === null) return;

    // Use your card Element with other Stripe.js APIs
    const { error } = await stripe.createPaymentMethod({ type: "card", card });

    if (error) {
      console.log("error-54", error);
      setCardError(error.message);
    } else {
      setCardError("");
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) setCardError(confirmError.message);

    setProcessing(false);
    // console.log("[PaymentIntent]", paymentIntent);

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      // save payment information to the server
      const paymentData = {
        class_id: itemInfo.class_id,
        name: itemInfo.name,
        price: itemInfo.price,
        transactionId: paymentIntent.id,
        instructor_name: itemInfo.instructor_name,
        student_email: itemInfo.student_email,
        course_status: "service pending",
        date: new Date().toLocaleDateString(),
        _id: cartItemId,
      };

      const updateClassInfo = {
        status: itemInfo?.status,
        image: itemInfo?.image,
        coupon: itemInfo?.coupon,
        duration: itemInfo?.duration,
        courseFor: itemInfo?.courseFor,
        description: itemInfo?.description,
        available_seat: itemInfo?.available_seat - 1,
        class_id: "",
        student_email: "",
      };

      axiosSecure.post("/payments", paymentData).then((res) => {
        // console.log(res.data);
        if (res.data.insertResult.insertedId) {
          updateClassData(updateClassInfo, selectedItemId).then((data) => {
            if (data.modifiedCount) {
              toast.success("transaction completed successfully");
              handleClose();
              refetch();
            }
          });
        }
      });
    }
  };

  return (
    <>
      <form onSubmit={handlePaymentSubmit} className="pl-10">
        <CardElement
          className="border py-3"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <DialogActions className="mr-10 mb-5">
          <Button
            onClick={handleClose}
            sx={{
              border: "2px solid #4A07DA",
              padding: "3px 15px",
              margin: "0 15px",
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            onClick={handleClose}
            autoFocus
            sx={{
              backgroundColor: "#5E21F7",
              color: "white",
              padding: "5px 15px",
              margin: "0 15px",
            }}
            className="hover:btn-primary"
            disabled={!stripe || !clientSecret || processing}
          >
            Done Payment
          </Button>
        </DialogActions>
      </form>
      {cardError && (
        <p className="bg-red-600 text-white p-3 text-center mt-5 mb-10 mx-auto rounded-lg">
          {cardError}
        </p>
      )}
      {transactionId && (
        <p className="bg-green-700 text-white p-3 text-center mt-5 mx-auto rounded-lg mb-10">
          Your transaction id: {transactionId}
        </p>
      )}
      <ToastContainer />
    </>
  );
};

export default CheckOutForm;
