import {Outlet} from "react-router-dom";
import SidebarFinance from "./SidebarFinance.jsx";
function LayoutFinance() {
    return (
      <>
      <SidebarFinance/>
        <Outlet />
      </>
    );
  }
  
  export default LayoutFinance;