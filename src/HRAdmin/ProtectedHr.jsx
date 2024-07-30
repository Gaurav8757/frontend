import { Navigate, Outlet } from "react-router-dom";

function ProtectedHrAdmin() {
    let auth = sessionStorage.getItem('token');
    if (auth !== undefined && auth?.length > 0) {
      return <Outlet />
    } else {
      return <Navigate to="/hr/admin" />
    }
  }

export default ProtectedHrAdmin;




 
