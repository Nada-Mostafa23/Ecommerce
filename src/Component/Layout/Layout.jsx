import { Outlet } from "react-router-dom";
// import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { Offline } from "react-detect-offline";



export default function Layout() {

 
  return <>
    <Navbar/>
      <Offline>
        <div className="network">
          <i className="fas fa-wifi-slash"></i>
          You Are Offline (surprise!)
        </div>
        </Offline>
        <Outlet></Outlet>

    {/* <Footer/> */}
  </>
}
