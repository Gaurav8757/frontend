/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function TimerForAllUser({ currentTime }) {
  const [isTokenAvailable, setIsTokenAvailable] = useState(false);

  // Fetch the auth token from sessionStorage
  useEffect(() => {
    const authToken = sessionStorage.getItem("auth_access_token");
    setIsTokenAvailable(!!authToken); // Set token availability based on the presence of auth token
  }, []);

  // Function to format remaining time in mm:ss format
  const formatTime = (remainingTime) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <>
      <div className="hidden md:block">
        {/* Timer Countdown */}
        <CountdownCircleTimer
          isPlaying={isTokenAvailable}
          duration={currentTime} // Assuming currentTime is in seconds
          size={50}
          strokeWidth={5}
          strokeLinecap="round"
          isSmoothColorTransition={true}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[600, 300, 120, 0]} // Color thresholds based on remaining time in seconds
        >
          {({ remainingTime }) => (
            <>
              {isTokenAvailable && remainingTime > 0 ? (
                <div className="text-base font-bold">
                  {formatTime(remainingTime)}
                </div>
              ) : (
                <p>Timeout</p>
              )}
            </>
          )}
        </CountdownCircleTimer>
      </div>

      <div className="md:hidden">
        {/* Timer Countdown */}
        <CountdownCircleTimer
          isPlaying={isTokenAvailable}
          duration={currentTime} // Assuming currentTime is in seconds
          size={40}
          strokeWidth={3}
          strokeLinecap="round"
          isSmoothColorTransition={true}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[600, 300, 120, 0]} // Color thresholds based on remaining time in seconds
        >
          {({ remainingTime }) => (
            <>
              {isTokenAvailable && remainingTime > 0 ? (
                <div className="text-base font-medium">
                  {formatTime(remainingTime)}
                </div>
              ) : (
                <p>Timeout</p>
              )}
            </>
          )}
        </CountdownCircleTimer>
      </div>
    </>
  );
}

export default TimerForAllUser;
