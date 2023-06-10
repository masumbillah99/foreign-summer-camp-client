import useAuth from "../../../hooks/useAuth";

const InstructorHome = () => {
  const { user } = useAuth();
  return (
    <div className="my-10">
      <h3 className="text-2xl font-bold text-center">
        Welcome, {user.displayName}
      </h3>
    </div>
  );
};

export default InstructorHome;
