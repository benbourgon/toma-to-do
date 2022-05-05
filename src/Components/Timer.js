// Timer.js

// Components
import PlaySound from "./PlaySound.js";
import TimerButtons from "./TimerButtons.js"
import DisplayTimer from "./DisplayTimer.js"
// Utilities
import firebase from "../utils/Firebase.js"
// Modules
import { useEffect, useState, useRef } from "react";
import { 
    getDatabase,
    get,
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
    // holds the timer object as a whole
    const timer = useRef({})
    // hold the value of the setInterval function
    const [timeInterval, setTimeInterval] = useState(0);
    
    const handleTimerComplete = () => {
        // if the timer has completed in work mode, switch to rest mode, and adjust values
        if(timeLeft < 0 && timerWorkMode === true){
            clearInterval(timeInterval);
            <PlaySound />;
            setIsActive(false);
            setTimeLeft(300);
            setMinutesLeft(5);
            setSecondsLeft(0);
            setTimerWorkMode(false);
            alert("Way to tackle that tomato, take a short break!");
            // store the new timer values in an object and set on firebase
            const timerResetObj = {
                "active": isActive,
                "minutesRemaining": minutesLeft,
                "workMode": timerWorkMode,
                "secondsRemaining": secondsLeft,
                "totalTimeRemaining": timeLeft
            }
            set(dbTimerRef, timerResetObj)
        
        // when the timer completes in rest mode, switch to work mode
        } else if(timeLeft < 0 && timerWorkMode === false){
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
        }
    }
    // Retrieve the initial values of the timer from firebase
    // inspiration from https://dmitripavlutin.com/react-useeffect-explanation/
    useEffect(() => {
        async function getTimerData(){
            get(dbTimerRef).then((dbResponse) => {
                if(dbResponse.exists()){
                    const firebaseTimerData = dbResponse.val();
                    timer.current = firebaseTimerData;
                    setIsActive(timer.active);
                    setMinutesLeft(timer.minutesRemaining);
                    setSecondsLeft(timer.secondsRemaining);
                    setTimeLeft(timer.totalTimeRemaining);
                    setTimerWorkMode(timer.workMode);
                }
            })
        }
        getTimerData()
    },[dbTimerRef])

    // Event handler for when the start timer button is clicked
    // With help from: https://sebhastian.com/setinterval-react/
    const handleStartTimer = () => {
        // turn the timer's active state on.
        setIsActive(true);
        // update firebase to reflect the timer being turned on.
        const activateTimer = {active: true};
        update(dbTimerRef, activateTimer)
        // start the timer
        const newTimeInterval = setInterval(() =>{
            setTimeLeft(previousTime => previousTime - 1);
            setMinutesLeft(Math.floor(timeLeft / 60))
            setSecondsLeft(timeLeft % 60)
        }, 1000);
        setTimeInterval(newTimeInterval);
    }

    // Event handler for when the stop timer button is clicked
    const handleStopTimer = () => {
        // turn the timer's active state off
        setIsActive(false);
        // if the timerInterval value is not 0, switch it back to 0
        if(timeInterval){
            clearInterval(timeInterval);
            setTimeInterval(0);
            return (() => {
                // set the timer's current values on firebase
                set(dbTimerRef, {
                    "active": false,
                    "minutesRemaining": minutesLeft,
                    "workMode": timerWorkMode,
                    "secondsRemaining": secondsLeft,
                    "totalTimeRemaining": timeLeft
                })
            })
        }
    }
    // Event handler to reset values to default for current mode
    const handleResetTimer = (timerMode) => {
        // if the timer is in work mode, change it to rest mode
        if(timerMode===true){
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
        // if the timer is in rest mode, change to work mode.
        } else {
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
    // Event handler to switch between modes
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