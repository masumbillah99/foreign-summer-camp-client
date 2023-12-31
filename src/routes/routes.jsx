import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import AllClasses from "../pages/AllClasses/AllClasses";
import AllInstructors from "../pages/AllInstructors/AllInstructors";
import AdminHome from "../pages/Dashboard/AdminDashboard/AdminHome/AdminHome";
import ManageClass from "../pages/Dashboard/AdminDashboard/ManageClass/ManageClass";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers";
import AddClass from "../pages/Dashboard/InstructorDashboard/AddClass/AddClass";
import InstructorHome from "../pages/Dashboard/InstructorDashboard/InstructorHome/InstructorHome";
import MyClasses from "../pages/Dashboard/InstructorDashboard/MyClasses/MyClasses";
import EnrolledClass from "../pages/Dashboard/StudentDashboard/EnrolledClass/EnrolledClass";
import History from "../pages/Dashboard/StudentDashboard/History/History";
import SelectedClass from "../pages/Dashboard/StudentDashboard/SelectedClass/SelectedClass";
import StudentHome from "../pages/Dashboard/StudentDashboard/StudentHome/StudentHome";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import InstructorRoute from "./InstructorRoute";
import Reviews from "../pages/Dashboard/SubPages/Reviews/Reviews";
import Settings from "../pages/Dashboard/SubPages/Settings/Settings";
import MySingleClass from "../pages/Dashboard/InstructorDashboard/MySingleClass/MySingleClass";

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
  // dashboard routes (student, instructor, admin)
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
      { path: "enrolledClass", element: <EnrolledClass /> },
      { path: "paymentHistory", element: <History /> },

      // instructor dashboard
      {
        path: "instructorHome",
        element: (
          <InstructorRoute>
            <InstructorHome />
          </InstructorRoute>
        ),
      },
      {
        path: "addClass",
        element: (
          <InstructorRoute>
            <AddClass />
          </InstructorRoute>
        ),
      },
      {
        path: "myClasses",
        element: (
          <InstructorRoute>
            <MyClasses />
          </InstructorRoute>
        ),
      },
      {
        path: "myClasses/:id",
        element: (
          <InstructorRoute>
            <MySingleClass />
          </InstructorRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_SERVER_URL}/my-single-class/${params.id}`
          ),
      },

      // TODO: admin private route
      // admin dashboard
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "manageUser",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manageClass",
        element: (
          <AdminRoute>
            <ManageClass />
          </AdminRoute>
        ),
      },
      // common pages - dashboard
      {
        path: "reviews",
        element: <Reviews />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

export default router;
