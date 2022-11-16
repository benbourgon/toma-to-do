// Instructions.js
import HideInstructionsButton from "./HideInstructionsButton";
const Instructions = () => {

    const handleHideInstructions = (event) => {
        console.log(event);
    }
    return (
        <section id="instructions" className="instructions">
                <div className="accordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <HideInstructionsButton
                                handleHideInstructions={handleHideInstructions}
                            />
                        </h2>
                        <div className="accordionCollapse">
                            <div className="accordion-body">
                                <ol className="instructionsList">
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