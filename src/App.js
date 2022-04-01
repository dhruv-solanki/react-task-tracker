import './App.css';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';

import { About } from './Components/About';

import { Tasks } from './Components/Tasks';
import { AddTask } from './Components/AddTask';

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

  // Fetch Tasks from server
  const fetchTasks = async () => {
    const res = await fetch(url);
    const tasks = await res.json();

    return tasks;
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(url + `/${id}`);
    const task = await res.json();

    return task;
  }

  // Add Task
  const addTask = async (task) => {
    // const id = Math.floor(Math.random() * 1000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json();

    setTasks([...tasks, data]);
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(url + `/${id}`, {
      method: 'DELETE',
    });
    
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Toggle Reminder by double clicking
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(url + `/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder} : task));
  }

  return (
    <div className="App d-flex justify-content-center mt-5 pt-3 pb-3 container">
      <Router>
        <div className='center-width'>
          <Header 
            onAdd={() => setShowAddTask(!showAddTask)} 
            showAddTask={showAddTask}
          />
          <Routes>
            <Route path='/' element={
              <div>
                { showAddTask &&
                  <AddTask onAdd={addTask}/>
                }
                { tasks.length !== 0 ? 
                  <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 
                  <h5>No tasks to show</h5>
                }
              </div>
            }/>
            <Route path='/about' element={<About />}/>
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
