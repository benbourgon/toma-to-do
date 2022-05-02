// Modules
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
// Components
import Header from "./Components/Header.js"
import Footer from "./Components/Footer.js"
import Instructions from "./Components/Instructions.js"
import DisplayToDoList from './Components/DisplayToDoList.js';
import ToDoInputForm from './Components/ToDoInputForm.js';
import firebase  from "./Components/Firebase.js";

// Styling
import "./styles/sass/App.scss";

const App = () => {
  // A state variable to hold the to-do list
  const [ toDoList, setToDoList ] = useState([])
  // A state variable to hold the value of the task input field
  const [ taskInputValue, setTaskInputValue ] = useState("")
  const [ tomatoesInputValue, setTomatoesInputValue ] = useState("")
  // store the database info
  const database = getDatabase(firebase);
  // the database reference point
  const dbReference = ref(database);
  // the database reference for the tasks object
  const dbTasksReference = ref(database, "/tasks/")

  useEffect(() => {
    // listen for changes in the database
    onValue(dbTasksReference, (dbResponse) => {
      // Create a variable to store our new to-do list when something changes
      const newToDoList = [];
      // store response from Firebase
      const data = dbResponse.val();
      console.log(data)
      // Use a for in loop to sort through the object and push its values to a new array.
      for(let key in data){
        // define the structure of each to-do object
        let newToDoObject = {key:key, task: data[key], complete: false, estimatedTomatoes: 1, completedTomatoes: 0};
        // add the object to the array
        newToDoList.push(newToDoObject);
      }
      setToDoList(newToDoList);
    })
  },[])
  // Event handler to set the value of the task input field.
  const handleTaskInputChange = (event) => {
    setTaskInputValue(event.target.value)
  }
  // Event handler to set the value of the # of tomatoes select element
  const handleTomatoesAmountChange = (event) => {
    setTomatoesInputValue(event.target.value)
  }
  // Event handler to push a new to-do-item to the Firebase database on submit
  const handleSubmit = (event) => {
    // prevent the default submit behaviour
    event.preventDefault();
    const toDoObject = {
      task: taskInputValue,
      complete: false,
      estimatedTomatoes: tomatoesInputValue,
      completedTomatoes: 0
    }
    // Use push to add the toDoObject to the database at the reference point
    push(dbTasksReference, toDoObject);

    // Reset the state of the Task Input to an empty string.
    setTaskInputValue("")
    setTomatoesInputValue("")
  }
  const handleRemoveToDo = (toDoKey) => {
    // remove the to-do item at the specific key value determined by the DisplayToDoList component

    // set the reference point for where to remove the to-do item
    const dbToDoReference = ref(database, `/tasks/${toDoKey}`)
    // remove the to-do item specified
    remove(dbToDoReference);
  }
  const handleCompleteTask = (toDoKey) => {
    // change the state of the checkbox for the specific to-do item

    // store the database and the reference point for this specific to-do item
    // const database =  getDatabase(firebase);
    // const dbToDoReference = ref(database, `/${toDoKey}`)
    // change the state of the specified to-do item
  }
  return (
    <div className="App">
      <Header />
      <main>
        <ToDoInputForm 
          handleTaskInputChange={handleTaskInputChange}
          handleTomatoesAmountChange={handleTomatoesAmountChange}
          handleSubmit={handleSubmit}
          taskInputValue={taskInputValue}
          tomatoesInputValue={tomatoesInputValue}
        />
        <Instructions />
        {/* <DisplayToDoList
          toDoList={toDoList}
          handleRemoveToDo={handleRemoveToDo}
          handleCompleteTask={handleCompleteTask}
        /> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
