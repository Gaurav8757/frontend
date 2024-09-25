/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Add useNavigate for redirection
import { toast } from "react-toastify";
import TimerForAllUser from "../../Timer/TimerForAllUser.jsx";
import VITE_DATA from "../../../config/config.jsx";

function Navbar({
  selectedOption,
  setSelectedOption,
  setMenuItems,
  selectedSubOption,
}) {
  const [timer, setTimer] = useState(1800); // 30 minutes in seconds
  const intervalRef = useRef(null); // To keep track of interval
  const location = useLocation();
  const navigate = useNavigate(); // Hook to handle navigation
  const { subCategories, logos, insuranceName } = location.state || {};

  // Load selectedOption from sessionStorage on mount
  useEffect(() => {
    const storedOption = sessionStorage.getItem("selectedOption");
    if (storedOption) {
      setSelectedOption(storedOption);
    }
  }, [setSelectedOption]);

  const handleSelectChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedOption(selectedCategory);
    sessionStorage.setItem("selectedOption", selectedCategory); // Store selectedOption in sessionStorage
    // Update menuItems based on the selected category
    if (subCategories && subCategories[selectedCategory]) {
      const items = Object.values(subCategories[selectedCategory]);
      setMenuItems(items);
    } else {
      setMenuItems([]);
    }
  };

  const startTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Clear any previous intervals
    }

    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalRef.current);
          sessionStorage.removeItem("auth_access_token");
          sessionStorage.removeItem("auth_token_received_at");
          sessionStorage.removeItem("selectedOption"); // Clear selectedOption when session expires
          sessionStorage.removeItem("selectedSubOption");
          toast.error("Session Expired..!");
          navigate("/advisor/home/insurance"); // Redirect to home page
          return 0;
        }
        return prevTimer;
      });
    }, 1000);
  };

  useEffect(() => {
    const auth_token_received_at = sessionStorage.getItem(
      "auth_token_received_at"
    );
    const auth_expires_in = sessionStorage.getItem("auth_expires_in");
    if (auth_token_received_at && auth_expires_in) {
      const currentTime = Date.now();
      const tokenAge = Math.floor(
        (currentTime - parseInt(auth_token_received_at, 10)) / 1000
      ); // in seconds
      const remainingTime = Math.max(1800 - tokenAge, 0); // 1800 is 30 minutes in seconds
      setTimer(remainingTime);

      if (remainingTime > 0) {
        startTimer();
      } else {
        sessionStorage.removeItem("auth_access_token");
        sessionStorage.removeItem("auth_token_received_at");
        sessionStorage.removeItem("selectedOption");
        sessionStorage.removeItem("selectedSubOption");
        toast.error("Session Expired...!");
        navigate("/advisor/home/insurance");
      }
    }
  }, [navigate]);

  // Handle clearing sessionStorage and resetting states
  useEffect(() => {
    // If the user navigates to the '/advisor/home/insurance' route, reset state and clear session
    if (location.pathname === `${VITE_DATA}/advisor/home/insurance`) {
      sessionStorage.clear(); // Clear all session data
      sessionStorage.removeItem("auth_access_token");
      sessionStorage.removeItem("auth_token_received_at");
      sessionStorage.removeItem("selectedOption");
      setSelectedOption(""); // Reset selectedOption
      setMenuItems([]); // Reset menuItems
    }
  }, [location.pathname, setSelectedOption, setMenuItems]);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between flex-wrap items-center p-2">
        {/* Logo */}
        <div className="text-xl font-bold">
          <img
            className="md:w-20 md:h-20 w-16 h-16 shadow-inner shadow-gray-300"
            src={logos}
            alt={insuranceName}
          />
        </div>
        <div className="container-flex flex justify-between">
          {/* Select Menu */}
          {subCategories ? (
            <select
              value={selectedOption}
              onChange={handleSelectChange}
              className="block appearance-none my-auto bg-white border-gray-300 py-2 ps-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="">Select Insurance</option>
              {Object.keys(subCategories).map((subCat, index) => (
                <option className="capitalize" key={index} value={subCat}>
                  {subCat}
                </option>
              ))}
            </select>
          ) : (
            <p>N/A</p>
          )}
        </div>
        {/* Timer Component */}
        {selectedSubOption ? (
          <TimerForAllUser currentTime={timer} />
        ) : (
          <div> </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
