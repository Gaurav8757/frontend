
import { Navigate, Outlet } from "react-router-dom";
function ProtectedAdvisor() {
    let auth = sessionStorage.getItem('token');
    if (auth !== undefined && auth?.length > 0) {
      return <Outlet />
    } else {
      return <Navigate to="/advisor" />
    }
  }

export default ProtectedAdvisor;


 
