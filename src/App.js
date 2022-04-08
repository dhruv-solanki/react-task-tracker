import './App.css';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';

import { About } from './Components/About';

import { Tasks } from './Components/Tasks';
import { AddTask } from './Components/AddTask';

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchTasks, addTask, deleteTask, toggleReminder } from './Components/actions/taskActions';


function App(props) {
  const [showAddTask, setShowAddTask] = useState(false);

  // const url = 'http://localhost:5000/tasks';

  // const [tasks, setTasks] = useState([]);


  useEffect(() => {
    const getTasks = async () => {
      await props.fetchTasks();
      // const tasksFromServer = await fetchTasks();
      // setTasks(tasksFromServer);
    }

    getTasks();
  }, []);

  // // Toggle Reminder by double clicking
  // const toggleReminder = async (id) => {
  //   const taskToToggle = await fetchTaskAPI(id);
  //   const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

  //   const res = await fetch(url + `/${id}`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //     body: JSON.stringify(updatedTask),
  //   });

  //   const data = await res.json();

  //   setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder} : task));
  // }

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
                  <AddTask onAdd={props.addTask}/>
                }
                { props.tasks.length !== 0 ? 
                  <Tasks tasks={props.tasks} onDelete={props.deleteTask} onToggle={props.toggleReminder}/> : 
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

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTasks: () => {
      dispatch(fetchTasks());
    },
    addTask: (task) => {
      dispatch(addTask(task));
    },
    deleteTask: (id) => {
      dispatch(deleteTask(id));
    },
    toggleReminder: (id) => {
      dispatch(toggleReminder(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
