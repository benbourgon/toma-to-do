// HideInstructionsButton.js
import React from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa"

const HideInstructionsButton = (props) => {
    const { handleHideInstructions, isOpen } = props;
    return (
        <>
            <button className="instructionsToggleButton" onClick={handleHideInstructions}>
                <p>Instructions</p> 
                <i>{isOpen ? <FaAngleUp /> : <FaAngleDown/>}</i>
            </button>
        </>
    )
}

export default HideInstructionsButton;