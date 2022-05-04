// Timer.js

// Components
import PlaySound from "./PlaySound.js";
import firebase from "../utils/Firebase.js"
// Modules
import { useEffect, useState } from "react";
import { 
    getDatabase,
    ref, 
    set, 
    update, 
    get
} from "firebase/database";
// Styling

const Timer = () => {
    const database = getDatabase(firebase)
    // the database reference for the timer object
    const dbTimerRef = ref(database, "/timer")

    // create state variables for the timer

    // state of whether the timer is on or not
    const [ isActive, setIsActive ] = useState(false);
    // the minutes remaining to be printed to the page
    const [ minutesLeft, setMinutesLeft ] = useState(25);
    // the seconds remanining to be printed to the page
    const [ secondsLeft, setSecondsLeft ] = useState(0);
    // the total time left in seconds
    const [ timeLeft, setTimeLeft ] = useState(1500);
    // alternates between work mode and rest mode to change the starting timer value.
    const [ timerMode, setTimerMode ] = useState("work");
    
    // The timer function itself to change the values every second
    useEffect(() => {
        let timeInterval = null;
        // if the timer has been started, 
        if(isActive && timeLeft >=0) {
            timeInterval = setInterval(() => {
                setTimeLeft(previousTime => previousTime - 1);
                setMinutesLeft(Math.floor(timeLeft / 60))
                setSecondsLeft(timeLeft % 60)
            }, 1000)
        // if the timer has completed in work mode, switch to rest mode, and adjust values
        } else if(timeLeft <= 0 && timerMode ==="work"){
                clearInterval(timeInterval);
                <PlaySound />
                setIsActive(false)
                setTimeLeft(300);
                setMinutesLeft(5);
                setSecondsLeft(0);
                setTimerMode("rest");
                alert("Way to tackle that tomato, take a short break!")
                // store the new timer values in an object and push to firebase.
                const timerResetObj = {
                    active: isActive,
                    minutesRemaining: minutesLeft,
                    mode: timerMode,
                    secondsRemaining: secondsLeft,
                    totalTimeRemaining: timeLeft
                }
                set(dbTimerRef, timerResetObj)

        } else if(timeLeft <= 0 && timerMode ==="rest"){
                clearInterval(timeInterval);
                <PlaySound />
                setIsActive(false)
                setTimeLeft(1500);
                setMinutesLeft(25);
                setSecondsLeft(0);
                setTimerMode("work");
                alert("Hope that was a nice break. Work time starts now!")
                // store the new timer values in an object and push to firebase.
                const timerResetObj = {
                    active: isActive,
                    minutesRemaining: minutesLeft,
                    mode: timerMode,
                    secondsRemaining: secondsLeft,
                    totalTimeRemaining: timeLeft
                }
                set(dbTimerRef, timerResetObj)
        } else {
            clearInterval(timeInterval)
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
    const handleSwitchMode = () => {
        if(timerMode==="work"){
            setTimerMode("rest");
            setMinutesLeft(5);
            setSecondsLeft(0);
            setTimeLeft(300);
            setIsActive(false);

            const timerResetObj = {
            active: isActive,
            minutesRemaining: minutesLeft,
            mode: timerMode,
            secondsRemaining: secondsLeft,
            totalTimeRemaining: timeLeft
            }
            set(dbTimerRef, timerResetObj)
        }else{
            setTimerMode("work")
            setMinutesLeft(25);
            setSecondsLeft(0);
            setTimeLeft(1500);
            setIsActive(false);

            const timerResetObj = {
            active: isActive,
            minutesRemaining: minutesLeft,
            mode: timerMode,
            secondsRemaining: secondsLeft,
            totalTimeRemaining: timeLeft
            }
            set(dbTimerRef, timerResetObj)
        }
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
                    isActive ? (<button onClick={handleStopTimer}>Stop Timer</button>) 
                    : (<button onClick={handleStartTimer}>Start Timer</button>)
                }
                <button onClick={handleResetTimer}>Reset Timer</button>
                <h3>{timerMode} mode</h3>
                <button onClick={handleSwitchMode}>Switch Mode</button> 
            </div>
        </section>
    )
}

export default Timer;