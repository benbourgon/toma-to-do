// Modules
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
// Components
import firebase  from "./Components/firebase.js";
// Styling
import './App.css';

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
      console.log(dbResponse.val());
    })

  }, [])
  return (
    <div className="App">
      <ul>
        {/* {toDoList.map((toDoItem) => {
          return (
            <li>{toDoItem}</li>
          )
        })} */}
      </ul>
    </div>
  );
}

export default App;
