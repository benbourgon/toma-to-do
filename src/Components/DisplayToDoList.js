// DisplayToDoList.js

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";

const DisplayToDoList = (props) => {
    console.log(props)
    const toDoList = props.list;
    const handleRemoveToDo = props.handleRemoveToDo;
    return (
        <section
            id="toDos"
            className="toDos">
            <div className="wrapper">
                <ul>
                    {toDoList.map((toDo) => {
                        return (
                            <li key={toDo.key}>
                                <button aria-label="Mark To-Do Item Complete">
                                    <FontAwesomeIcon icon={faSquare}/>
                                </button>
                                <p>{toDo.toDo}</p>
                                <button
                                    onClick={() => handleRemoveToDo(toDo.key)} aria-label="Remove To-Do Item">
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