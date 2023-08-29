import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./Payment/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const PaymentModal = ({ closeModal, isOpen, itemInfo }) => {
  return (
    // <Transition appear show={isOpen} as={Fragment}>
    //   <Dialog as="div" className="relative z-10" onClose={closeModal}>
    //     <Transition.Child
    //       as={Fragment}
    //       enter="ease-out duration-300"
    //       enterFrom="opacity-0"
    //       enterTo="opacity-100"
    //       leave="ease-in duration-200"
    //       leaveFrom="opacity-100"
    //       leaveTo="opacity-0"
    //     >
    //       <div className="fixed inset-0 bg-black bg-opacity-25" />
    //     </Transition.Child>

    //     <div className="fixed inset-0 overflow-y-auto">
    //       <div className="flex min-h-full items-center justify-center p-4 text-center">
    //         <Transition.Child
    //           as={Fragment}
    //           enter="ease-out duration-300"
    //           enterFrom="opacity-0 scale-95"
    //           enterTo="opacity-100 scale-100"
    //           leave="ease-in duration-200"
    //           leaveFrom="opacity-100 scale-100"
    //           leaveTo="opacity-0 scale-95"
    //         >
    //           <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
    //             <Dialog.Title
    //               as="h3"
    //               className="text-lg font-medium text-center leading-6 text-gray-900"
    //             >
    //               Review Info Before Reserve
    //             </Dialog.Title>
    //             <Elements stripe={stripePromise}>
    //               <CheckOutForm closeModal={closeModal} itemInfo={itemInfo} />
    //             </Elements>
    //           </Dialog.Panel>
    //         </Transition.Child>
    //       </div>
    //     </div>
    //   </Dialog>
    // </Transition>
    <>handleClose</>
  );
};

export default PaymentModal;
