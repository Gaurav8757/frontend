import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";
function Layout() {
    return (
      <>
      <Sidebar/>
        <Outlet />
      </>
    );
  }
  
  export default Layout;