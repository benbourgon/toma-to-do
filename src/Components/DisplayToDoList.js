// DisplayToDoList.js

// Modules
import React from "react";
import { GrCheckbox, GrCheckboxSelected, GrFormTrash } from "react-icons/gr"

const DisplayToDoList = (props) => {
    const { toDoList, handleCheckboxClick, handleRemoveToDo } = props; 
    return (
        <section
            id="toDos"
            className="toDos">
            <div className="wrapper">
                <form action="">
                    <h2>To-Do:</h2>
                    <ul className="toDoList">
                        {toDoList.map((toDo) => {
                            return (
                                <li className="toDoListItem" key={toDo.key}>
                                    <input
                                        type="checkbox"
                                        name="checkbox"
                                        id={`${toDo.key}CheckBox`}
                                        checked={toDo.complete}
                                        onChange={() => handleCheckboxClick(toDo.key, toDo.complete)}
                                    />
                                    <label htmlFor={`${toDo.key}CheckBox`}>
                                        {toDo.complete ? <GrCheckboxSelected /> : <GrCheckbox />}<span className="sr-only">Mark task complete</span>
                                    </label>
                                    <p>{toDo.task} <span className="tomatoes"> {toDo.completedTomatoes}/{toDo.estimatedTomatoes} tomatoes</span></p>
                                    <button
                                        onClick={() => handleRemoveToDo(toDo.key)}
                                        aria-label="Remove To-Do item"
                                    >
                                        <GrFormTrash />
                                    </button>
                                </li>
                            )
                        })}
                    </ul>

                </form>
            </div>
        </section>
    )
}

export default DisplayToDoList;