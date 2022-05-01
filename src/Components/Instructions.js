// Instructions.js

const Instructions = () => {
    return (
        <section id="instructions" className="instructions">
            <div className="wrapper">
                <p><span className="nameOfApp">Toma_to-do</span> is a productivity app based on the pomodoro technique developed by Francisco Cirillo for maximum productivity.</p>
                <p>Enter your task below and provide your best guess as to how many twenty-five-minute increments of time (or <span className="tomatoes">tomatoes</span>) it will take to complete.</p>
                <p>When the timer ends, take a five-minute break before resuming work.</p>
                <p>After four consecutive tomatoes, take a twenty-minute break.</p>
            </div>
        </section>
    )

}

export default Instructions;