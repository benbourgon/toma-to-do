// Instructions.js
import HideInstructionsButton from "./HideInstructionsButton";
import React, { useState } from "react";
const Instructions = () => {
    const [ isOpen, setIsOpen ] = useState(true);
    const handleHideInstructions = () => setIsOpen(!isOpen);
    return (
        <section id="instructions" className="instructions">
                <div className="accordion">
                    <div className="accordionItem">
                        <h2 className="accordionHeader">
                            <HideInstructionsButton
                                handleHideInstructions={handleHideInstructions}
                                isOpen={isOpen}
                            />
                        </h2>
                        <div className="accordionCollapse">
                            <div className="accordionBody">
                                <ol className={ isOpen ? "instructionsList" : "instructionsList sr-only"}>
                                    <li className="instruction">Enter your task below and provide your best guess as to how many twenty-five-minute increments of time (or <span className="tomatoes">tomatoes</span>) it will take to complete.</li>
                                    <li className="instruction">When the timer ends, take a five-minute break before resuming work.</li>
                                    <li className="instruction">After four consecutive tomatoes, take a twenty-minute break.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    )
}

export default Instructions;