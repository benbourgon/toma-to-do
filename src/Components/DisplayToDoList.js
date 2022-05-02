// DisplayToDoList.js

// Modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";

const DisplayToDoList = (props) => {
    const { toDoList, handleCompleteTask, handleRemoveToDo } = props; 
    return (
        <section
            id="toDos"
            className="toDos">
            <div className="wrapper">
                <ul>
                    {toDoList.map((toDo) => {
                        return (
                            <li key={toDo.key}>
                                <input
                                    type="checkbox"
                                    name="checkbox"
                                    id={`${toDo.task}CheckBox`}
                                    checked={toDo.complete}
                                    onChange={handleCompleteTask}
                                />
                                <label htmlFor={`${toDo.task}CheckBox`}>
                                    <FontAwesomeIcon icon={toDo.complete ? faSquareCheck : faSquare}/><span className="sr-only">Mark task complete</span>
                                </label>
                                <p>{toDo.task} - <span>{toDo.completedTomatoes}/{toDo.estimatedTomatoes} tomatoes</span></p>
                                <button
                                    onClick={() => handleRemoveToDo(toDo.key)}
                                    aria-label="Remove To-Do item"
                                >
                                    <FontAwesomeIcon icon={faTrashCan}/>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}

export default DisplayToDoList;