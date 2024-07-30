import {Outlet} from "react-router-dom";
import SidebarEmp from "./SidebarEmp.jsx";
function LayoutEmp() {
  return (
    <>
      <SidebarEmp/>
        <Outlet />
      </>
  )
}

export default LayoutEmp;