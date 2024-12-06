import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Signin from "./pages/signin";
import SignUp from "./pages/signup";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      // errorElement: <Home />,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
