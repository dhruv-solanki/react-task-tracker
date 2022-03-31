import './App.css';
import { Header } from './Components/Header';
import { Tasks } from './Components/Tasks';

import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Learn ReactJS',
        day: 'March 31, 2022 at 5:00 PM',
        reminder: true,
    },
    {
        id: 2,
        text: 'Read a new book',
        day: 'March 30, 2022 at 09:30 AM',
        reminder: false,
    },
    {
        id: 3,
        text: 'Do some Sketch Practice',
        day: 'March 31, 2022 at 10:00 AM',
        reminder: true,
    }
  ]);

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    console.log('Delete', id);
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder} : task));
    console.log('Toggle', id);

  }

  return (
    <div className="App d-flex justify-content-center mt-5 pt-3 pb-3 container">
      <div className='w-50'>
        <Header />
        {
        tasks.length !== 0 ? 
          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 
          <h5>No tasks to show</h5>
        }
      </div>
    </div>
  );
}

export default App;
