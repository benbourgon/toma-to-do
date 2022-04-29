// Modules
import { useState, useEffect, Fragment } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
// Components
import Header from "./Components/Header.js"
import Footer from "./Components/Footer.js"
import Instructions from "./Components/Instructions.js"
import ToDoList from './Components/ToDoList.js';
import firebase  from "./Components/Firebase.js";

// Styling
import "./styles/sass/App.scss";

const App = () => {
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

      // Use a for in loop to sort through the object and print its values
      for(let key in data){
        newToDoList.push(data[key])
      }
      setToDoList(newToDoList);
    })

  }, [])
  return (
    <div className="App">
      <Header />
      <main>
        <Instructions />
        return (
          <Fragment >
            <ul>
              {toDoList.map((toDoItem, index) => {
                return (
                  <ToDoList toDo={toDoItem} key={index} />
                )
              })}
            </ul>
          </Fragment>
        )
      </main>
      <Footer />
    </div>
  );
}

export default App;
