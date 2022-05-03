// Timer.js

// Modules
import {update, ref} from "firebase/database";
// Components

// Styling

const Timer = (props) => {
    // destructure props to get the values of 
    const {active, minutesRemaining, mode, secondsRemaining} = props.timer;
    let totalTimeRemaining = (minutesRemaining * 60) + secondsRemaining;

    const updateTimer = () => {
        const minutesLeft = Math.floor(totalTimeRemaining / 60);
        let secondsLeft = totalTimeRemaining % 60;
        if(totalTimeRemaining <= 0){
            clearInterval(timeInterval)
        } else {
            totalTimeRemaining--;
            console.log(minutesLeft, ":", secondsLeft);
        }
    }
    const timeInterval = setInterval(updateTimer(), 1000)
    return (
        <section className="timerSection" id="timerSection">
            <div className="wrapper">
                <h2>{minutesRemaining}:{secondsRemaining < 10 ? ("0" + secondsRemaining) : secondsRemaining}</h2>
                {
                    active ? (<button>Stop</button>) 
                    : (<button>Start</button>)
                }
                <button>Reset</button>
                <h3>{mode} mode</h3>
            </div>
        </section>
    )
}

export default Timer;