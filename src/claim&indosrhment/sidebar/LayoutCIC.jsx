import {Outlet} from "react-router-dom";
import SidebarCIC from "./SidebarCIC.jsx";
function LayoutCIC() {
    return (
      <>
      <SidebarCIC/>
        <Outlet />
      </>
    );
  }
  
  export default LayoutCIC;