// import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
// import { Link, useNavigate } from 'react-router-dom';
const ProtectFinance = () => {
  let token = sessionStorage.getItem('token');
  if (token) {
    try {
        // Decode the token
        const decodedToken = jwtDecode(token);  
       
           
        // Check if the token contains `isFinance` flag and it is true
        if (decodedToken.isFinance === true) {

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
export default ProtectFinance;