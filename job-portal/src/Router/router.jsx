import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import PostJob from "../pages/PostJob";
import MyJobs from "../pages/MyJobs";
import Login from "../pages/Login"; // Importing Login
import Register from "../pages/Register"; // Importing Register

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/post-job", element: <PostJob /> },
      { path: "/my-job", element: <MyJobs /> },
      { path: "/login", element: <Login /> }, // Adding Login route
      { path: "/register", element: <Register /> }, // Adding Register route
    ],
  },
]);

export default router;
