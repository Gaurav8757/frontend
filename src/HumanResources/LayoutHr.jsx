import {Outlet} from "react-router-dom";
import SidebarHr from "./SidebarHr.jsx";
function LayoutHr() {
  return (
    <>
   
      <SidebarHr/>
        <Outlet />
        
      </>
  )
}

export default LayoutHr;