/* eslint-disable react/prop-types */
// Navbar component with token handling and session management
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import TimerForAllUser from "../../Timer/TimerForAllUser.jsx";

function Navbar({
  selectedOption,
  setSelectedOption,
  setMenuItems,
  selectedSubOption,
}) {
  const [timer, setTimer] = useState(); // Default to 30 minutes
  const intervalRef = useRef(null); // To track the timer
  const location = useLocation();
  const navigate = useNavigate();
  const { subCategories, logos, insuranceName } = location.state || {};

  useEffect(() => {
    const storedOption = sessionStorage.getItem("selectedOption");
    if (storedOption) {
      setSelectedOption(storedOption);
    }
  }, [setSelectedOption]);

  // Start and manage the timer when a token is received
  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalRef.current);
          // handleSessionExpiry();
          return 0;
        }
        return prevTimer;
      });
    }, 1000);
  };

  useEffect(() => {
    const checkToken = () => {
      const auth_token_received_at = sessionStorage.getItem(
        "auth_token_received_at"
      );
      if (auth_token_received_at) {
        const currentTime = Date.now();
        const tokenAge = Math.floor(
          (currentTime - parseInt(auth_token_received_at, 10)) / 1000
        );
        console.log(tokenAge);
        const remainingTime = Math.max(1800 - tokenAge, 0); // 30 minutes (1800 seconds)
        if (remainingTime > 0) {
          setTimer(remainingTime);
          startTimer();
        }
        //  else{
        //   handleSessionExpiry();
        // }
      }
    };

    // const handleSessionExpiry = () => {
    //   sessionStorage.removeItem("auth_access_token");
    //   sessionStorage.removeItem("auth_expires_in");
    //   sessionStorage.removeItem("auth_token_received_at");
    //   sessionStorage.removeItem("uat_access_token");
    //   sessionStorage.removeItem("uat_expires_in");
    //   sessionStorage.removeItem("uat_token_received_at");
    //   navigate("/advisor/home/insurance");
    // };

    checkToken(); // Check token on mount
  }, [navigate, selectedOption]);

  const handleSelectChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedOption(selectedCategory);
    sessionStorage.setItem("selectedOption", selectedCategory);
    if (subCategories && subCategories[selectedCategory]) {
      const items = Object.values(subCategories[selectedCategory]);
      setMenuItems(items);
    } else {
      setMenuItems([]);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center p-2">
        <div className="text-xl font-bold">
          <img
            className="md:w-20 md:h-20 w-16 h-16 shadow-inner"
            src={logos}
            alt={insuranceName}
          />
        </div>
        <div className="container-flex flex justify-between">
          {subCategories ? (
            <select
              value={selectedOption}
              onChange={handleSelectChange}
              className="block appearance-none bg-white border-gray-300 py-2 ps-2 rounded leading-tight focus:outline-none"
            >
              <option value="">Select Insurance</option>
              {Object.keys(subCategories).map((subCat, index) => (
                <option key={index} value={subCat} className="capitalize">
                  {subCat}
                </option>
              ))}
            </select>
          ) : (
            <p>N/A</p>
          )}
        </div>
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
