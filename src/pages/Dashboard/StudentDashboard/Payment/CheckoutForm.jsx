import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import "./CheckoutForm.css";

const CheckOutForm = ({ closeModal, itemInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  // const price = cart.map((item) => item.price);
  // console.log(typeof price);

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
        transactionId: paymentIntent.id,
        status: "service pending",
        date: new Date(),
      };
      axiosSecure.post("/payments", paymentData).then((res) => {
        console.log("response", res.data);
        if (res.data.insertResult.insertedId) {
          toast.success("Transaction complete successfully");
          navigate("/dashboard/selectedClass");
          closeModal();
        }
      });
    }
  };

  //  TODO: MY MODAL IS NOT WORKING
  // I post in facebook group about this topic but they delete my post.
  // Why they delete my post I don't. But my code is working

  return (
    <>
      <form onSubmit={handlePaymentSubmit}>
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
        <div className="flex mt-2 justify-around">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!stripe || !clientSecret || processing}
            className="inline-flex justify-center rounded-md border border-transparent bg-green-300 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            Payment
          </button>
        </div>
      </form>
      {cardError && (
        <p className="bg-red-600 text-white p-3 text-center mt-5 w-1/2 mx-auto rounded-lg">
          {cardError}
        </p>
      )}
      {transactionId && (
        <p className="bg-green-700 text-white p-3 text-center mt-5 w-1/2 mx-auto rounded-lg">
          Your transaction id: {transactionId}
        </p>
      )}
      <ToastContainer />
    </>
  );
};

export default CheckOutForm;
