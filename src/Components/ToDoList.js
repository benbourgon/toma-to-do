// To Do List.js

const ToDoList = (props) => {
    const toDoItem = props.toDo;
    const index = props.key
    return (
        <li>{toDoItem[index]}</li>
    )
}

export default ToDoList;