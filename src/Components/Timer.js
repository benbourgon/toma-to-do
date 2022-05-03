// Timer.js
// Components
import firebase from "./Firebase.js";
// Modules
import { useEffect, useState } from "react";
import { update } from "firebase/database"; 
// Styling

const Timer = (props) => {
    // destructure props
    const { dbTimerRef } = props

    const [ isActive, setIsActive ] = useState(false);
    const [ minutesLeft, setMinutesLeft ] = useState(25);
    const [ secondsLeft, setSecondsLeft ] = useState(0);
    const [ timerMode, setTimerMode ] = useState("work");
    const [ timeLeft, setTimeLeft ] = useState(1500);

    useEffect(() => {
        let timeInterval = null;

        if(isActive) {
            timeInterval = setInterval(() => {
                setTimeLeft(previousTime => previousTime - 1);
                setMinutesLeft(Math.floor(timeLeft / 60))
                setSecondsLeft(timeLeft % 60)
            }, 1000)
        } else {
            clearInterval(timeInterval);
        }
        return () => clearInterval(timeInterval);
    },[isActive, timeLeft])
    // Event handler for when the start timer button is clicked
    const handleStartTimer = () => {
        setIsActive(true)
    }
    // Event handler for when the stop timer button is clicked
    const handleStopTimer = () => {
        setIsActive(false)
    }
    const handleResetTimer = () => {
        setIsActive(false);
        setMinutesLeft(25);
        setTimerMode("work");
        setSecondsLeft(0);
        setTimeLeft(1500);
    }
    return (
        <section className="timerSection" id="timerSection">
            <div className="wrapper">
                <h2>Timer:</h2>
                <h2 className="timerDisplay">
                    <span className="minutesDisplay">{minutesLeft}</span>:
                    <span className="secondsDisplay">{secondsLeft < 10 ? ("0" + secondsLeft) : secondsLeft}</span>
                </h2>
                {
                    isActive ? (<button onClick={() => handleStopTimer()}>Stop Timer</button>) 
                    : (<button onClick={() => handleStartTimer()}>Start Timer</button>)
                }
                <button onClick={() => handleResetTimer()}>Reset Timer</button>
                <h3>{timerMode} mode</h3>
            </div>
        </section>
    )
}

export default Timer;