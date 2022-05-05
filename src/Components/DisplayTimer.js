// DisplayTimer.js

const DisplayTimer = (props) => {
    const {
        minutesLeft,
        secondsLeft,
    } = props
    return (
        <>
            <h2 className="timerDisplay">
                <span className="minutesDisplay">{minutesLeft}</span>:
                <span className="secondsDisplay">{secondsLeft < 10 ? ("0" + secondsLeft) : secondsLeft}</span>
            </h2>
        </>
    )
}

export default DisplayTimer;