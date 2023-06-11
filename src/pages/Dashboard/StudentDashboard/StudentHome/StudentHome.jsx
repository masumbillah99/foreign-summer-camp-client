import useAuth from "../../../../hooks/useAuth";

const StudentHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <h3 className="text-3xl font-bold">Hello {user.displayName}</h3>
    </div>
  );
};

export default StudentHome;
