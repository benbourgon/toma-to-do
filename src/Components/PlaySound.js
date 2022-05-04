// TimerComplete.js

import { useEffect, useState } from "react";

const PlaySound = () => {
    const [audio] = useState(new Audio("../assets/bell.mp3"));
    useEffect(() => {
        audio.play()
    }, [audio])
    return (
        <>
            <audio className="notificationSound">
                <source src="../assets/bell.mp3" type="audio/mp3"/>
                Your browser doesn't support the HTML5 audio element.
            </audio>
        </>
    )
}

export default PlaySound;