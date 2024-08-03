import { Navigate, Outlet } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
const ProtectRoute = () => {
  let token = sessionStorage.getItem('token');
  if (token) {
    try {
        // Decode the token
        const decodedToken = jwtDecode(token);     
        // Check if the token contains `isAdmin` flag and it is true
        if (decodedToken.isAdmin === true) {
            return <Outlet />;
        } else{
          return <Navigate to="/login" />;
        }
    } catch (error) {
        // Handle token decoding errors
        console.error("Token decoding failed:", error);
    }
} else {
    return <Navigate to="/login" />
  }
}
export default ProtectRoute;