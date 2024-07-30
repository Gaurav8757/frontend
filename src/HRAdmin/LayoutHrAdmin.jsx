import {Outlet} from "react-router-dom";
import SideBarHrAdmin from "./SideBarHrAdmin";
function LayoutHrAdmin() {
  return (
    <>
      <SideBarHrAdmin/>
        <Outlet />
      </>
  )
}

export default LayoutHrAdmin;