import {Outlet} from "react-router-dom";
import DashboardAdvisor from "./Dashboard/DashboardAdvisor.jsx";
function LayoutAdvisor() {
  return (
    <>
      <DashboardAdvisor/>
        <Outlet />
      </>
  )
}

export default LayoutAdvisor