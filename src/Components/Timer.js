// Timer.js

// Components
import PlaySound from "./PlaySound.js";
// Modules
import { useEffect, useState } from "react";
import { set, update } from "firebase/database"; 
// Styling

const Timer = (props) => {
    // destructure props
    const { dbTimerRef, timerRes } = props;
    // create state variables for the timer
    // state of the timer on load
    const [ timerSnapshot, setTimerSnapshot ] = useState({});
    // state: whether the timer is on or not
    const [ isActive, setIsActive ] = useState(false);
    // the minutes remaining to be printed to the page
    const [ minutesLeft, setMinutesLeft ] = useState(25);
    // the seconds remanining to be printed to the page
    const [ secondsLeft, setSecondsLeft ] = useState(0);
    // the total time left in seconds
    const [ timeLeft, setTimeLeft ] = useState(1500);
    // alternates between work mode and rest mode to change the starting timer value.
    const [ timerMode, setTimerMode ] = useState("work");

    // save the initial values of the timer from firebase on mount
    useEffect(() => {
        setTimerSnapshot(timerRes)
    },[])
    // if the timerRes receives a value, then set the initial state variables to it
    useEffect(() => {
        if(timerSnapshot){
                setIsActive(timerSnapshot.active)
                setMinutesLeft(timerSnapshot.minutesRemaining)
                setSecondsLeft(timerSnapshot.secondsRemaining)
                setTimeLeft(timerSnapshot.totalTimeRemaining)
                setTimerMode(timerSnapshot.mode)
        }
        return() => {
            // kill the snapshot after it has set the values the first time.
            setTimerSnapshot(null)
        }
    }, [timerSnapshot])

    // The timer function itself to change the values every second
    useEffect(() => {
        let timeInterval = null;
        if(isActive) {
            timeInterval = setInterval(() => {
                setTimeLeft(previousTime => previousTime - 1);
                setMinutesLeft(Math.floor(timeLeft / 60))
                setSecondsLeft(timeLeft % 60)
            }, 1000)
        } else {
            <PlaySound
            />
            clearInterval(timeInterval)
            setIsActive(false);
            alert("timer completed")
            if(timerMode==="work"){

            }
            setMinutesLeft()
        }
        return () => clearInterval(timeInterval);
    },[isActive, timeLeft])

    // Event handler for when the start timer button is clicked
    const handleStartTimer = () => {
        setIsActive(true);
        const activateTimer = {active: true};
        update(dbTimerRef, activateTimer)
    }
    // Event handler for when the stop timer button is clicked
    const handleStopTimer = () => {
        setIsActive(false);
        const newTimerObj = {
            active: false,
            minutesRemaining: minutesLeft,
            mode: timerMode,
            secondsRemaining: secondsLeft,
            totalTimeRemaining: timeLeft
        }
        set(dbTimerRef, newTimerObj)
    }
    const handleResetTimer = () => {
        if(timerMode==="work"){
            setIsActive(false);
            setMinutesLeft(25);
            setTimerMode("work");
            setSecondsLeft(0);
            setTimeLeft(1500);
        }else if(timerMode==="rest"){
            setIsActive(false);
            setMinutesLeft(5);
            setTimerMode("rest");
            setSecondsLeft(0);
            setTimeLeft(300);
        }
        const timerResetObj = {
                active: isActive,
                minutesRemaining: minutesLeft,
                mode: timerMode,
                secondsRemaining: secondsLeft,
                totalTimeRemaining: timeLeft
            }
        set(dbTimerRef, timerResetObj)
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