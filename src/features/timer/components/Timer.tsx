// features/timer/components/Timer.tsx
import { useState } from "react";

const Timer = (initialSecondsLeft: 30) => {
  const [time, setTime] = useState(initialSecondsLeft);
  return <h2>{time} seconds left</h2>;
};

export default Timer;
