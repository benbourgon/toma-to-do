// TimerButtons.js

const TimerButtons = (props) => {
    const {
        handleResetTimer, 
        handleStartTimer,
        handleStopTimer,
        handleSwitchMode,
        timerWorkMode,
        isActive
    } = props
    return (
        <>
            {isActive ? (<button onClick={handleStopTimer}>Stop Timer</button>) 
                : (<button onClick={handleStartTimer}>Start Timer</button>)
            }
            <button onClick={() => handleResetTimer(timerWorkMode)}>Reset Timer</button>
            <h3>{timerWorkMode ? "work" : "rest"} mode</h3>
            <button onClick={() => handleSwitchMode(timerWorkMode)}>Switch Mode</button> 
        </>
    )
}

export default TimerButtons;