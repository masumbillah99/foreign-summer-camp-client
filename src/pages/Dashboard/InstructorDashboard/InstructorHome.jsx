import { TextField } from "@mui/material";
import useAuth from "../../../hooks/useAuth";

const InstructorHome = () => {
  const { user } = useAuth();
  return (
    <div className="my-10 max-w-screen-xl mx-auto">
      <h3 className="text-2xl font-bold text-center">
        Welcome, {user.displayName}
      </h3>
      <div>
        <h4>Edit Your Information</h4>
        <form>
          <div className="form-control">
            <TextField
              id="standard-basic"
              label="Your Name"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="Your Subjects"
              variant="standard"
            />
          </div>
          <div className="form-control">
            <TextField
              id="standard-basic"
              label="Total Courses"
              variant="standard"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstructorHome;
