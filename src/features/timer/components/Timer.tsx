// features/timer/components/Timer.tsx
import { useState } from "react";
import { defaultTimerData } from "../stores/defaultTimerData.ts";
const Timer = () => {
  const [timerData, setTimerData] = useState(defaultTimerData);
  return (
    <h2>
      {timerData.secondsLeft / 60 < 10
        ? `0${timerData.secondsLeft / 60}`
        : timerData.secondsLeft / 60}
      :
      {timerData.secondsLeft % 60 < 10
        ? `0${timerData.secondsLeft % 60}`
        : timerData.secondsLeft % 60}
    </h2>
  );
};

export default Timer;
