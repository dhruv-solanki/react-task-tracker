const initialState = {
    tasks: []
}

const taskReducer = (state = initialState, action) => {
    switch(action.type) {
        case "FETCH_TASKS":
            state = {
                tasks: action.payload
            };
            break;
        case "ADD_TASK":
            state = {
                tasks: [...state.tasks, action.payload]
            };
            break;
        case "DELETE_TASK":
            state = {
                tasks: state.tasks.filter((task) => task.id !== action.payload)
            };
            break;
        case "TOGGLE_REMINDER":
            state = {
                tasks: state.tasks.map((task) => task.id === action.payload.id ? {...task, reminder: action.payload.reminder} : task)
            }
    }

    return state;
}

export default taskReducer;