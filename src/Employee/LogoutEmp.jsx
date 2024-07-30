import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import VITE_DATA from "../config/config.jsx";
import axios from "axios";
export default function LogoutOps() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = sessionStorage.getItem("token");
  const empid = sessionStorage.getItem("employeeId");
  const aid = sessionStorage.getItem('aid');
  function getCurrentTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const currentTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amOrPm}`;
    return currentTime;
  }
  const log = getCurrentTime();
  const handleLogout = () => {
    try {
      axios.put(`${VITE_DATA}/employee/logout/time/${empid}/${aid}`, {
        logouttime: log,
        // date: 
      });
      // Clear session storage and navigate to login page

      navigate("/login");
      sessionStorage.clear();
      toast.success("Logout Successfully !");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };
  return isLoggedIn && location.pathname !== "" ? (
    <button
      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded text-xs px-3 py-2 text-center mt-2 mb-2"
      onClick={handleLogout}
    >
      LOGOUT
    </button>
  ) : null;
}
