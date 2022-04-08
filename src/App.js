import './App.css';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';

import { About } from './Components/About';

import { Tasks } from './Components/Tasks';
import { AddTask } from './Components/AddTask';

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchTasks, addTask, deleteTask, toggleReminder } from './actions/taskActions';


function App(props) {
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      await props.fetchTasks();
    }

    getTasks();
  }, []);

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
