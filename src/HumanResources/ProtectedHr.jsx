import { Navigate, Outlet } from "react-router-dom";

function ProtectedHr() {
    let auth = sessionStorage.getItem('token');
    if (auth !== undefined && auth?.length > 0) {
      return <Outlet />
    } else {
      return <Navigate to="/hr" />
    }
  }

export default ProtectedHr;




 
