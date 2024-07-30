import {Outlet} from "react-router-dom";
import BranchSidebar from "./BranchSidebar";
function BranchLayout() {
    return (
      <>
      <BranchSidebar/>
        <Outlet />
      </>
    );
  }
  
  export default BranchLayout;