import { useState, useEffect } from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
function TimerForAllUser() {
  const TOTAL_TIME = 29 * 60 + 30; // 29 minutes 30 seconds

  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME); 
  const [isTokenAvailable, setIsTokenAvailable] = useState(false);

  // Format seconds into mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  useEffect(() => {
    // Check if the token and token_received_at are available in sessionStorage
    const token = sessionStorage.getItem("auth_access_token");
    const tokenReceivedAt = sessionStorage.getItem("auth_token_received_at");
  
    if (token && tokenReceivedAt) {
      const tokenReceivedAtTime = parseInt(tokenReceivedAt, 10); // Convert to an integer
      const timeElapsed = Math.floor((Date.now() - tokenReceivedAtTime) / 1000); // Time passed since token was received
  
      if (timeElapsed < TOTAL_TIME) { // Compare against TOTAL_TIME (in seconds)
        const timeLeft = TOTAL_TIME - timeElapsed; // Remaining time in seconds
  
        // Convert timeLeft to minutes and seconds
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
  
        setTimeLeft({ minutes, seconds }); // Set the remaining time as an object
        setIsTokenAvailable(true); // Token exists, start the timer
      } else {
        setTimeLeft({ minutes: 0, seconds: 0 }); // Token expired
        setIsTokenAvailable(false); // Token is no longer available
      }
    } else {
      setIsTokenAvailable(false); // No token, don't start the timer
    }
  }, [TOTAL_TIME]);
  


  return (
    <CountdownCircleTimer
      isPlaying={isTokenAvailable && timeLeft > 0}
      duration={timeLeft}
      size={50}
      strokeWidth={4}
      strokeLinecap="round"
      isSmoothColorTransition = "true"
      colors={['#004777', '#F7B801', '#A30000', '#A30000']}
      colorsTime={[10, 5, 2, 0]}
    >
      {({ remainingTime }) => (
        <>
          {isTokenAvailable ? (
            <>
              <div>
                {formatTime(remainingTime)}
              </div>
              {remainingTime <= 7 && (
                <p style={{ color: 'red', fontWeight: 'bold' }}>
                  Warning: Session will expire in {formatTime(remainingTime)}!
                </p>
              )}
              {remainingTime === 0 && <p>Session expired!</p>}
            </>
          ) : (
            <p>No active session.</p>
          )}
        </>
      )}
    </CountdownCircleTimer>
  );
}

export default TimerForAllUser;
