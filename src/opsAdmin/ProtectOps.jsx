// import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { Link, useNavigate } from 'react-router-dom';
const ProtectOps = () => {
  let auth = sessionStorage.getItem('token');
  if (auth !== undefined && auth?.length > 0) {
    return <Outlet />
  } else {
    return <Navigate to="/" />
  }
}
export default ProtectOps;