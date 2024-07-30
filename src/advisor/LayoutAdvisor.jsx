import {Outlet} from "react-router-dom";
import DashboardAdvisor from "./DashboardAdvisor.jsx";
function LayoutAdvisor() {
  return (
    <>
      <DashboardAdvisor/>
        <Outlet />
      </>
  )
}

export default LayoutAdvisor