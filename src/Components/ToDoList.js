// To Do List.js

const ToDoList = (props) => {
    const toDos = props.list;
    return (
        <section
            id="toDos"
            className="toDos">
            <div className="wrapper">
                <ul>
                    {toDos.map((toDo, index) => {
                        return (
                            <li key={index}>{toDo}</li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}

export default ToDoList;