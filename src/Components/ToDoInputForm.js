// ToDoInputForm.js

const ToDoInputForm = (props) => {

    const { handleTaskInputChange, taskInputValue, handleSubmit } = props;
    return (
        <div className="wrapper">
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
                    placeholder="My task to accomplish..."
                    value={taskInputValue} 
                    required
                />
                <button 
                    onClick={handleSubmit}
                    type="submit">
                    Add Task
                </button>
            </form>
        </div>
    )
}

export default ToDoInputForm;