import { createBrowserRouter } from "react-router-dom";
import App from "../Components/App";
import SignIn from "../Components/sign-in/SignIn";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "signin",
    element: <SignIn/>
  }
]);

