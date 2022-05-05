// App.js

// Modules
import { useState, useEffect } from "react";
import {
        getDatabase,
        ref,
        push,
        get,
        remove, 
        update 
} from "firebase/database";
// Components
import Header from "./Components/Header.js"
import Timer from "./Components/Timer.js"
import Instructions from "./Components/Instructions.js"
import DisplayToDoList from './Components/DisplayToDoList.js';
import ToDoInputForm from './Components/ToDoInputForm.js';
import Footer from "./Components/Footer.js"
// Utilities
import firebase from "./utils/Firebase.js";
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
  // store the location of the tasks on the database
  const dbTasksReference = ref(database, "/tasks/")

  useEffect(() => {
    // listen for changes in the tasks database
    get(dbTasksReference).then((dbResponse) => {
      // Create a variable to store our new to-do list when something changes
      const newToDoList = [];
      // store response from Firebase
      const data = dbResponse.val();
      
      // Use a for in loop to sort through the object and push its values to a new array.
      for(let key in data){
        // define the structure of each to-do object
        let newToDoObject = {
          key:key, 
          task: data[key].task, 
          complete: data[key].complete, 
          estimatedTomatoes: data[key].estimatedTomatoes, completedTomatoes: data[key].completedTomatoes
        };
        // add the object to the array
        newToDoList.push(newToDoObject);
      }
      setToDoList(newToDoList);
    })
  },[dbTasksReference])

  //Event Handlers

  // Event handler to set the value of the task input field.
  const handleTaskInputChange = (event) => {
    setTaskInputValue(event.target.value)
  }
  // Event handler to set the value of the # of tomatoes select element
  const handleTomatoesAmountChange = (event) => {
    if (event.target.value !== ""){
      setTomatoesInputValue(event.target.value)
    }
  }
  // Event handler to push a new to-do-item to the Firebase database on submit
  const handleSubmit = (event) => {
    // prevent the default submit behaviour
    event.preventDefault();
    // if the task is not empty
    if(taskInputValue && tomatoesInputValue !== ""){
      // create a new object from the values provided
      const toDoObject = {
        task: taskInputValue,
        complete: false,
        estimatedTomatoes: tomatoesInputValue,
        completedTomatoes: 0
      }
      // Use push to add the toDoObject to the database at the tasks object reference point
      push(dbTasksReference, toDoObject);
    } else if(taskInputValue && tomatoesInputValue === ""){
      alert("Please estimate your time in tomatoes (aka 25-minute blocks) before clicking Add Task")
    } else {
      alert("Oops, please enter a task before clicking Add Task")
    }
    // Reset the state of the inputs to an empty string.
    setTaskInputValue("")
    setTomatoesInputValue("")
  }  // Event handler to delete a to-do item
  const handleRemoveToDo = (toDoKey) => {
    // remove the to-do item at the specific key value determined by the DisplayToDoList component 
    // set the reference point for where to remove the to-do item
    const dbToDoReference = ref(database, `/tasks/${toDoKey}`)
    // remove the to-do item specified
    remove(dbToDoReference);
  }
  const handleCheckboxClick = (toDoKey, toDoChecked) => {
    // change the state of the checkbox for the specific to-do item
    const dbTaskCompleteRef = ref(database, `/tasks/${toDoKey}`)
    // create a variable to store the new setting for to-do item's completion state
    let checkChange;
    if(!toDoChecked){
      checkChange = {complete: true};
    } else {
      checkChange = {complete: false};
    }
    update(dbTaskCompleteRef, checkChange)
  }
  return (
    <div className="App">
      <Header />
      <main>
        <Instructions />
        <div className="flexContainer wrapper">
          <Timer/>
          <ToDoInputForm 
            handleTaskInputChange={handleTaskInputChange}
            handleTomatoesAmountChange={handleTomatoesAmountChange}
            handleSubmit={handleSubmit}
            taskInputValue={taskInputValue}
            tomatoesInputValue={tomatoesInputValue}
          />
          <DisplayToDoList
            toDoList={toDoList}
            handleRemoveToDo={handleRemoveToDo}
            handleCheckboxClick={handleCheckboxClick}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
