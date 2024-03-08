import React, { useState, useEffect } from "react";

const CountdownTimer = ({ hours = 0, minutes = 0, seconds = 0 }) => {
  const [time, setTime] = useState({ hours, minutes, seconds });

  const tick = () => {
    if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) return;
    else if (time.minutes === 0 && time.seconds === 0)
      setTime({ hours: time.hours - 1, minutes: 59, seconds: 59 });
    else if (time.seconds === 0)
      setTime({ hours: time.hours, minutes: time.minutes - 1, seconds: 59 });
    else
      setTime({
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds - 1,
      });
  };

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId); // Clear interval on unmount
  }, [time]);

  return (
    <div>
      {`${time.hours.toString().padStart(2, "0")}:${time.minutes
        .toString()
        .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`}
    </div>
  );
};

export default CountdownTimer;
