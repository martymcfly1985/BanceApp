import { ConfigProvider } from "antd";
import { createBrowserRouter } from "react-router-dom";
import App from "../Components/App";
import SignIn from "../Components/sign-in/SignIn";
import SignUp from "../Components/sign-up/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ConfigProvider theme={{token: { colorBgContainer: "white", colorBgLayout: "#efefef"}}}><App/></ConfigProvider>
  },
  {
    path: "signin",
    element: <SignIn/>
  },
  {
    path: "signup",
    element: <SignUp/>
  }
]);

