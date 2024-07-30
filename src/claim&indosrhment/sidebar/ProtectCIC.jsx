// import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectCIC = () => {
  let auth = sessionStorage.getItem('token');
  if (auth !== undefined && auth?.length > 0) {
    return <Outlet />
  } else {
    return <Navigate to="/" />
  }
}
export default ProtectCIC;