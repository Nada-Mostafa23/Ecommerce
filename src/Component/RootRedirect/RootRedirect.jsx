import { useContext } from "react";
import { userContext } from "../Context/Usercontext";
import Home from "../Home/Home";
import Login from "../Login/Login";

export default function RootRedirect() {
  const { userToken } = useContext(userContext);

  return userToken ? <Home /> : <Login />;
}
