// Timer.js

// Components

// Utilities

// Modules
import { useState } from "react";

// Styling

const Timer = () => {
    const [totalTimeLeft, setTotalTimeLeft] = useState(150_000);
    const [seconds, setSeconds] = useState(0);
    const [minutesLeft, setMinutesLeft] = useState(totalTimeLeft / 6000);
    const [isActive, setIsActive] = useState(false);

    return (
        <section id="timer" class="timerSection">
            <div className="wrapper">
                <h2>Timer:</h2>
                <p class="timerDisplay"> 
                    <span class="minutesValue">{minutesLeft}</span>:
                    <span class="secondsValue">{seconds < 10 ? ("0" + seconds) : seconds}</span>
                    <span></span>
                </p>
            </div>
        </section>
    )
}

export default Timer;