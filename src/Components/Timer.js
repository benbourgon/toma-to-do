// Timer.js


// Modules
import React, { useState } from "react";
import DisplayTimer from "./DisplayTimer"
import TimerButtons from  "./TimerButtons"

const Timer = () => {
    const [totalTimeLeft, setTotalTimeLeft] = useState(150_000);
    const [seconds, setSeconds] = useState(0);
    const [minutesLeft, setMinutesLeft] = useState(totalTimeLeft / 6000);
    const [isActive, setIsActive] = useState(false);

    return (
        <section id="timer" className="timerSection">
            <div className="wrapper">
                <h2>Timer:</h2>
                <DisplayTimer 
                    minutesLeft={minutesLeft}
                    secondsLeft={seconds}
                />
                <TimerButtons />
            </div>
        </section>
    )
}

export default Timer;