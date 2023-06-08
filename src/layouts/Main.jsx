import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/shared/Footer/Footer";
import Navbar from "../components/shared/Navbar/Navbar";

const Main = () => {
  const location = useLocation();
  const loginLayout = location.pathname.includes("login");
  const signUpLayout = location.pathname.includes("signUp");

  return (
    <>
      {loginLayout || signUpLayout || <Navbar />}
      <Outlet />
      {loginLayout || signUpLayout || <Footer />}
    </>
  );
};

export default Main;
