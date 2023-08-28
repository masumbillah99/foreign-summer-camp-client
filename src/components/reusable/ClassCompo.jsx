import { useQuery } from "@tanstack/react-query";

const ClassCompo = () => {
  const { data: classesData = [], refetch } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/classes`);
      return res.json();
    },
  });

  const approvedClass = classesData.filter(
    (data) => data.status === "approved"
  );

  return [approvedClass, refetch];
};

export default ClassCompo;
