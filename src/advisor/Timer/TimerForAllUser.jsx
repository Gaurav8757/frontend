/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function TimerForAllUser({ currentTime }) {
  const [isTokenAvailable, setIsTokenAvailable] = useState(false);

  useEffect(() => {
    const authToken = sessionStorage.getItem("auth_access_token");
    setIsTokenAvailable(!!authToken);
  }, []);

  const formatTime = (remainingTime) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="timer">
      <CountdownCircleTimer
        isPlaying={isTokenAvailable}
        duration={currentTime}
        size={50}
        strokeWidth={5}
        strokeLinecap="round"
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[300, 80, 20, 0]}
      >
        {({ remainingTime }) =>
          isTokenAvailable && remainingTime > 0 ? (
            <div>{formatTime(remainingTime)}</div>
          ) : (
            <p>Timeout</p>
          )
        }
      </CountdownCircleTimer>
    </div>
  );
}

export default TimerForAllUser;
