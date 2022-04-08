import { fetchTasksAPI, addTaskAPI, deleteTaskAPI, toggleReminderAPI } from "../services/taskService";

export function fetchTasks() { 
    return async dispatch => {
        const tasks = await fetchTasksAPI();
        dispatch({
            type: "FETCH_TASKS",
            payload: tasks,
        });    
    }
}

export function addTask(task) { 
    return async dispatch => {
        const createdTask = await addTaskAPI(task);
        dispatch({
            type: "ADD_TASK",
            payload: createdTask,
        })
    }
}

export function deleteTask(id) { 
    return async dispatch => {
        const deleteTaskID = await deleteTaskAPI(id);
        dispatch({
            type: "DELETE_TASK",
            payload: deleteTaskID,
        })
    }
}

export function toggleReminder(id) {
    return async dispatch => {
        const updatedTask = await toggleReminderAPI(id);
        dispatch({
            type: "TOGGLE_REMINDER",
            payload: updatedTask,
        })
    }
}
