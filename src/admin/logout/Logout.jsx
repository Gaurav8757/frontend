import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

// Logout button after login exports this to header
export default function Button() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login");
    toast.success("Logout Successfully !");
  };
  if (isLoggedIn && location.pathname !== "") {
    return (
      <button
        className="text-white  bg-red-600 hover:bg-red-700 focus:ring-2 focus:outline-none focus:ring-red-300  shadow shadow-red-500/50 font-medium rounded text-xs px-3 py-2  text-center mt-2 mb-2"
        onClick={handleLogout}
      >
        LOGOUT
      </button>
    );
  }
  return null;
}