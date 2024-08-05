// import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
const ProtectCIC = () => {
  let token = sessionStorage.getItem('token');
  if (token) {
    try {
        // Decode the token
        const decodedToken = jwtDecode(token);     
        // Check if the token contains `isAdmin` flag and it is true
        if (decodedToken.isCic === true) {
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
export default ProtectCIC;