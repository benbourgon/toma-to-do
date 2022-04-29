// Modules
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
// Components
import firebase  from "./Components/firebase.js";
// Styling
import './App.scss';

function App() {
  const [toDoList, setToDoList] = useState([])
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

      // Use a for in loop to sort through the object and print it's values
      for(let key in data){
        newToDoList.push(data[key])
      }
      setToDoList(newToDoList);
    })

  }, [])
  return (
    <div className="App">
      <h1>TOMA_TO-DO</h1>
      <ul>
        {toDoList.map((toDoItem) => {
          return (
            <li>{toDoItem}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
