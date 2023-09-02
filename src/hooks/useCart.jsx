import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useCart = () => {
  const { user, loading } = useAuth();
  const { data: cart = [], refetch } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/carts?email=${user?.email}`
      );
      return res.json();
    },
  });

  return [cart, refetch];
};

export default useCart;

/** use history -- enrolled payment api */
/** 

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useHistory = () => {
  const { user, loading } = useAuth();
  const { data: payments = [], refetch } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/payments?email=${user?.email}`
      );
      return res.json();
    },
  });

  return [payments, refetch];
};

export default useHistory;



*/
