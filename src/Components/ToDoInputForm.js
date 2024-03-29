// ToDoInputForm.js
import React from "react";
const ToDoInputForm = (props) => {

    const { 
        handleTaskInputChange,
        taskInputValue, 
        handleSubmit, 
        handleTomatoesAmountChange,
        tomatoesInputValue 
    } = props;
    return (
        <section className="toDoFormSection" id="toDoFormSection">
            <div className="wrapper">
                <h2>Add To-Do:</h2>
                <form
                    action="submit"
                    className="taskForm"
                >
                    <label 
                        htmlFor="taskInput"
                        className="sr-only">
                        Task to accomplish:
                    </label>
                    <input 
                        onChange={handleTaskInputChange} 
                        type="text"
                        id="taskInput" 
                        className="taskInput" 
                        placeholder="My task to accomplish"
                        value={taskInputValue} 
                        required
                    />
                    <p>in</p>
                    <label htmlFor="numberOfTomatoesSelect" className="sr-only">Estimated number of tomatoes to complete task</label>
                    <select
                        onChange={handleTomatoesAmountChange}
                        type="select"
                        id="numberOfTomatoesSelect"
                        className="numberOfTomatoesSelect"
                        value={tomatoesInputValue}
                    >
                        <option value="" disabled defaultValue={""}>estimated # of tomatoes</option>
                        <option value="10">10</option>
                        <option value="9">9</option>
                        <option value="8">8</option>
                        <option value="7">7</option>
                        <option value="6">6</option>
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </select>
                    <p><span className="tomatoes">tomatoes</span> = {tomatoesInputValue!== "" ? parseInt(tomatoesInputValue) * 25 : "_"} mins</p>
                    <button 
                        onClick={handleSubmit}
                        type="submit"> 
                        Add Task
                    </button>
                </form>
            </div>
        </section>
    )
}

export default ToDoInputForm;