// HideInstructionsButton.js
import React from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa"

const HideInstructionsButton = (props) => {
    const { handleHideInstructions, isOpen } = props;
    return (
        <>
            <button className="instructionsToggleButton" onClick={handleHideInstructions}>
                Instructions: {isOpen ? <FaAngleUp /> : <FaAngleDown/>}
            </button>
        </>
    )
}

export default HideInstructionsButton;