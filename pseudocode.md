****************
***TOMA_TO-DO***
****************

***Pseudocode***

***App.js***
Create state variables to store data from the firebase database
- To-Do List
    - The name of the task
    - The user's estimated pomodoros for the task
    - Whether or not it has been completed
    - The number of pomodoros completed for each task
- Timer
    - the current minutes and seconds value of the timer
    - work mode or break mode

Once the app has been mounted, get the current data from the firebase component w/ useEffect
- add an onValue event listener to update all states on load
- error handling if the database cannot be reached

***Timer Component***
    - Get the state of the timer passed in through props
    - Display in work mode or break mode depending on state
    - Wait for when the user starts the timer
    - Allow the user to pause or reset the timer
    - If it is started:
        - if it's in work mode, start at 25 mins and count down
        - if it's in break mode, start at 5 mins
    Switch between work and break mode when timer reaches 0.

- Create a component to handle when a pomodoro completes
***Pomodoro Complete Component***
    - Alert the user
    - If completed pomodoros = estimated pomodoros, prompt the user to mark the task as complete or add additional pomodoros

Create a local method to handle onChange in the task input and pass it to a task component

***Task Component***
    - take the user's inputted task and update state with it

    Create a component to change To Do List state - task complete?
    Create a component to allow deleting the task

Create a method to render the data from the database on to the page
 - Display Timer Component
 - Display To Do Items Component

Render the page
- header
- The rendered timer
- Form for entering to-do items
- Instructions/explanation
- The rendered to-do list
- footer