import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import AllClasses from "../pages/AllClasses/AllClasses";
import AllInstructors from "../pages/AllInstructors/AllInstructors";
import ManageClass from "../pages/Dashboard/AdminDashboard/ManageClass/ManageClass";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers";
import AddClass from "../pages/Dashboard/InstructorDashboard/AddClass/AddClass";
import InstructorHome from "../pages/Dashboard/InstructorDashboard/InstructorHome";
import MyClasses from "../pages/Dashboard/InstructorDashboard/MyClasses/MyClasses";
import History from "../pages/Dashboard/StudentDashboard/History/History";
import Payment from "../pages/Dashboard/StudentDashboard/Payment/Payment";
import SelectedClass from "../pages/Dashboard/StudentDashboard/SelectedClass";
import StudentHome from "../pages/Dashboard/StudentDashboard/StudentHome/StudentHome";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/allClasses", element: <AllClasses /> },
      { path: "/instructors", element: <AllInstructors /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <SignUp /> },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // student dashboard
      { path: "studentHome", element: <StudentHome /> },
      { path: "selectedClass", element: <SelectedClass /> },
      { path: "payment", element: <Payment /> },
      { path: "paymentHistory", element: <History /> },

      // instructor dashboard
      { path: "instructorHome", element: <InstructorHome /> },
      { path: "addClass", element: <AddClass /> },
      { path: "myClasses", element: <MyClasses /> },

      // TODO: admin private route
      // admin dashboard
      { path: "manageUser", element: <ManageUsers /> },
      { path: "manageClass", element: <ManageClass /> },
    ],
  },
]);

export default router;
