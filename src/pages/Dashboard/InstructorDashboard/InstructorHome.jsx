import useAuth from "../../../hooks/useAuth";

const InstructorHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <h3>Welcome, {user.displayName}</h3>
    </div>
  );
};

export default InstructorHome;
