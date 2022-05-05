// Timer.js

// Components
import PlaySound from "./PlaySound.js";
import TimerButtons from "./TimerButtons.js"
import DisplayTimer from "./DisplayTimer.js"
// Utilities
import firebase from "../utils/Firebase.js"
// Modules
import { useEffect, useState } from "react";
import { 
    getDatabase,
    ref, 
    set, 
    update
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
    const [ timerWorkMode, setTimerWorkMode ] = useState(true);
    

    // The timer function itself to change the values every second
    useEffect(() => {
        let timeInterval = null;
        // if the timer has been started, 
        if(isActive === true && timeLeft > 0) {
            timeInterval = setInterval(() => {
                setTimeLeft(previousTime => previousTime - 1);
                setMinutesLeft(Math.floor(timeLeft / 60))
                setSecondsLeft(timeLeft % 60)
            }, 1000)
        // if the timer has completed in work mode, switch to rest mode, and adjust values
        } else if(timeLeft < 0 && timerWorkMode === true){
            clearInterval(timeInterval);
            <PlaySound />;
            setIsActive(false);
            setTimeLeft(300);
            setMinutesLeft(5);
            setSecondsLeft(0);
            setTimerWorkMode(false);
            alert("Way to tackle that tomato, take a short break!");
            // store the new timer values in an object and push to firebase.
            const timerResetObj = {
                "active": isActive,
                "minutesRemaining": minutesLeft,
                "workMode": timerWorkMode,
                "secondsRemaining": secondsLeft,
                "totalTimeRemaining": timeLeft
            }
            set(dbTimerRef, timerResetObj)

        } else if(timeLeft < 0 && timerWorkMode === false){
            // when the timer runs out in work mode
            clearInterval(timeInterval);
            <PlaySound />;
            setIsActive(false);
            setTimeLeft(1500);
            setMinutesLeft(25);
            setSecondsLeft(0);
            setTimerWorkMode(true);
            alert("Hope that was a nice break. Work time starts now!");
            // store the new timer values in an object and push to firebase.
            const timerResetObj = {
                "active": isActive,
                "minutesRemaining": minutesLeft,
                "workMode": timerWorkMode,
                "secondsRemaining": secondsLeft,
                "totalTimeRemaining": timeLeft
            }
            set(dbTimerRef, timerResetObj)
        } else {
            clearInterval(timeInterval)
        }
        return() => {
            clearInterval(timeInterval)
        };
    }, [isActive, dbTimerRef, timeLeft, minutesLeft, secondsLeft, timerWorkMode])

    // Event handler for when the start timer button is clicked
    const handleStartTimer = () => {
        setIsActive(true);
        const activateTimer = {active: true};
        update(dbTimerRef, activateTimer)
    }
    // Event handler for when the stop timer button is clicked
    const handleStopTimer = () => {
        setIsActive(false);

        set(dbTimerRef, {
            "active": false,
            "minutesRemaining": minutesLeft,
            "workMode": timerWorkMode,
            "secondsRemaining": secondsLeft,
            "totalTimeRemaining": timeLeft
        })
    }
    const handleResetTimer = (timerMode) => {
        if(timerMode){
            setIsActive(false);
            setMinutesLeft(25);
            setTimerWorkMode(true);
            setSecondsLeft(0);
            setTimeLeft(1500);
            set(dbTimerRef, {
                "active": isActive,
                "minutesRemaining": minutesLeft,
                "workMode": timerWorkMode,
                "secondsRemaining": secondsLeft,
                "totalTimeRemaining": timeLeft
            })
        }else{
            setIsActive(false);
            setMinutesLeft(5);
            setTimerWorkMode(false);
            setSecondsLeft(0);
            setTimeLeft(300);
            set(dbTimerRef, {
                "active": isActive,
                "minutesRemaining": minutesLeft,
                "workMode": timerWorkMode,
                "secondsRemaining": secondsLeft,
                "totalTimeRemaining": timeLeft
            })
        }
    }
    const handleSwitchMode = (timerMode) => {
        if(timerMode===true){
            setTimerWorkMode(false);
            setMinutesLeft(5);
            setSecondsLeft(0);
            setTimeLeft(300);
            setIsActive(false);

            set(dbTimerRef, {
                "active": isActive,
                "minutesRemaining": minutesLeft,
                "workMode": timerWorkMode,
                "secondsRemaining": secondsLeft,
                "totalTimeRemaining": timeLeft
            })
        } else {
            setTimerWorkMode(true)
            setMinutesLeft(25);
            setSecondsLeft(0);
            setTimeLeft(1500);
            setIsActive(false);

            set(dbTimerRef, {
                "active": isActive,
                "minutesRemaining": minutesLeft,
                "workMode": timerWorkMode,
                "secondsRemaining": secondsLeft,
                "totalTimeRemaining": timeLeft
            })
        };
    }
    return (
        <section className="timerSection" id="timerSection">
            <div className="wrapper">
                <h2>Timer:</h2>
                <DisplayTimer
                    minutesLeft={minutesLeft}
                    secondsLeft={secondsLeft}
                />
                <TimerButtons 
                    isActive={isActive}
                    timerWorkMode={timerWorkMode}
                    handleResetTimer={handleResetTimer}
                    handleStartTimer={handleStartTimer}
                    handleStopTimer={handleStopTimer}
                    handleSwitchMode={handleSwitchMode}
                />
            </div>
        </section>
    )
}

export default Timer;