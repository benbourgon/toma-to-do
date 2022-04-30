// DisplayToDoList.js

const DisplayToDoList = (props) => {
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
                                <p>{toDo.toDo}</p>
                                <button 
                                    onClick={() => handleRemoveToDo(toDo.key)} aria-label="Remove To-Do Item">
                                    x
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