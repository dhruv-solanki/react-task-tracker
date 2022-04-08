const url = 'http://localhost:5000/tasks';

// Fetch Tasks from server
const fetchTasksAPI = async () => {
    const res = await fetch(url);
    const tasks = await res.json();

    return tasks;
}

// Fetch Task
const fetchTaskAPI = async (id) => {
    const res = await fetch(url + `/${id}`);
    const task = await res.json();

    return task;
}

// Add Task
const addTaskAPI = async (task) => {
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

    // setTasks([...tasks, data]);
    return data;
}

// Delete Task
const deleteTaskAPI = async (id) => {
    await fetch(url + `/${id}`, {
      method: 'DELETE',
    });

    return id;
    
    // setTasks(tasks.filter((task) => task.id !== id));
}

// Toggle Reminder by double clicking
const toggleReminderAPI = async (id) => {
  const taskToToggle = await fetchTaskAPI(id);
  const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

  const res = await fetch(url + `/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updatedTask),
  });

  const data = await res.json();

  return data;

  // setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder} : task));
}

export { fetchTasksAPI, fetchTaskAPI, addTaskAPI, deleteTaskAPI, toggleReminderAPI };