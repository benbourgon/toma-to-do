// DisplayTimer.js
import React from "react";

const DisplayTimer = (props) => {
    const {
        minutesLeft,
        secondsLeft,
    } = props
    return (
        <>
            <p className="timerDisplay">
                <span className="minutesDisplay">{minutesLeft}</span>:
                <span className="secondsDisplay">{secondsLeft < 10 ? ("0" + secondsLeft) : secondsLeft}</span>
            </p>
        </>
    )
}

export default DisplayTimer;