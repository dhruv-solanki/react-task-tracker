import { useState } from "react";

export const AddTask = ({onAdd}) => {
    const [text, setTask] = useState('');
    const [day, setday] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        if(!text) {
            alert('Please Add Task');
            return;
        }

        onAdd({text, day, reminder});

        setTask('');
        setday('');
        setReminder(false);
    }

  return (
    <form className="add-form" onSubmit={onSubmit}>
        <div className="mb-3">
            <label htmlFor="taskName">Task</label>
            <input 
                type="text" 
                className="form-control" 
                id="taskName" 
                placeholder="Add Task" 
                value={text} 
                onChange={(e) => setTask(e.target.value)}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="taskday">Day & Time</label>
            <input 
                type="text" 
                className="form-control" 
                id="taskday" 
                placeholder="Add Day & Time"
                value={day} 
                onChange={(e) => setday(e.target.value)}
            />
        </div>
        <div className="mb-3 form-check">
            <label htmlFor="reminder" className="form-check-label">Set Reminder</label>
            <input 
                type="checkbox" 
                className="form-check-input" 
                id="reminder"
                checked={reminder}
                value={reminder} 
                onChange={(e) => setReminder(e.currentTarget.checked)}
            />
        </div>
        <div className="d-grid">
            <button type="submit" className="btn form-button">Save Task</button>
        </div>
    </form>
  )
}
