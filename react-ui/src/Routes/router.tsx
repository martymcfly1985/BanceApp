import { createBrowserRouter } from "react-router-dom";
import App from "../Components/App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "signin",
    element: <div>Sign In</div>
  }
]);

