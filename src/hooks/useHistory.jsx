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
