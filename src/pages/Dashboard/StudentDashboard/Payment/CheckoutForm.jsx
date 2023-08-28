import { Button, DialogActions } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import "./CheckoutForm.css";

const CheckOutForm = ({ handleClose, itemInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  // console.log(itemInfo);

  useEffect(() => {
    if (itemInfo?.price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: itemInfo?.price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [itemInfo, axiosSecure]);

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
      // console.log("[PaymentMethod]", paymentMethod);
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "unknown",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError.message);
    }
    setProcessing(false);
    // console.log("[PaymentIntent]", paymentIntent);

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      // TODO: next steps
      // save payment information to the server
      const paymentData = {
        ...itemInfo,
        available_seat: itemInfo?.available_seat - 1,
        transactionId: paymentIntent.id,
        status: "service pending",
        date: new Date().toLocaleDateString(),
      };
      axiosSecure.post("/payments", paymentData).then((res) => {
        console.log("response", res.data);
        if (res.data.insertResult.insertedId) {
          toast.success("Transaction complete successfully");
          navigate("/dashboard/selectedClass");
          handleClose();
          console.log(paymentData);
        }
      });
    }
  };

  //  TODO: MY MODAL IS NOT WORKING
  // I post in facebook group about this topic but they delete my post.
  // Why they delete my post I don't. But my code is working

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
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            autoFocus
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
