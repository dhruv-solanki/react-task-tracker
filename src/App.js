import './App.css';
import { Header } from './Components/Header';
import { Tasks } from './Components/Tasks';
import { AddTask } from './Components/AddTask';

import { useEffect, useState } from "react";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  const url = 'http://localhost:5000/tasks';

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks();
  }, []);

  // Fetch data from server
  const fetchTasks = async () => {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  }

  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 1000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(url + `/${id}`, {
      method: 'DELETE',
    });
    
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Toggle Reminder by double clicking
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder} : task));
  }

  return (
    <div className="App d-flex justify-content-center mt-5 pt-3 pb-3 container">
      <div className='center-width'>
        <Header 
          onAdd={() => setShowAddTask(!showAddTask)} 
          showAddTask={showAddTask}
        />
        { showAddTask &&
          <AddTask onAdd={addTask}/>
        }
        { tasks.length !== 0 ? 
          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 
          <h5>No tasks to show</h5>
        }
      </div>
    </div>
  );
}

export default App;
