import {Outlet} from "react-router-dom";
import SidebarOps from "./SidebarOps.jsx";
function LayoutOps() {
    return (
      <>
      <SidebarOps/>
        <Outlet />
      </>
    );
  }
  
  export default LayoutOps;