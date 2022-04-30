// Modules
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push } from 'firebase/database';
// Components
import Header from "./Components/Header.js"
import Footer from "./Components/Footer.js"
import Instructions from "./Components/Instructions.js"
import ToDoList from './Components/ToDoList.js';
import ToDoInputForm from './Components/ToDoInputForm.js';
import firebase  from "./Components/Firebase.js";

// Styling
import "./styles/sass/App.scss";

const App = () => {
  // A state variable to hold the to-do list
  const [toDoList, setToDoList] = useState([])
  // A state variable to hold the value of the task input field
  const [taskInputValue, setTaskInputValue] = useState("")
  useEffect(() => {
    // store the database info
    const database = getDatabase(firebase);

    // the database reference point
    const dbReference = ref(database);

    // listen for changes in the database
    // and console log the values
    onValue(dbReference, (dbResponse) => {
      // Create a variable to store our new to-do list when something changes
      const newToDoList = [];

      // store response from Firebase
      const data = dbResponse.val();

      // Use a for in loop to sort through the object and print its values
      for(let key in data){
        newToDoList.push(data[key])
      }
      setToDoList(newToDoList);
    })
  },[])
  // Event handler to set the value of the task input field.
  const handleTaskInputChange = (event) => {
    setTaskInputValue(event.target.value)
  }
  const handleSubmit = (event) => {
    // prevent the default submit behaviour
    event.preventDefault();
    // store the database and its reference point for the to-do list
    const database = getDatabase(firebase);
    const dbReference = ref(database);
    // Use push to add the value of the TaskInput to the database at the reference point
    push(dbReference, taskInputValue);

    // Reset the state of the Task Input to an empty string.
    setTaskInputValue("")
  }
  return (
    <div className="App">
      <Header />
      <main>
        <ToDoInputForm 
          handleTaskInputChange={handleTaskInputChange}
          taskInputValue={taskInputValue}
          handleSubmit={handleSubmit}
        />
        <Instructions />
        <ToDoList list={toDoList}/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
