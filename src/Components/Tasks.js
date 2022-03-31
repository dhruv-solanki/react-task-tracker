import { FaTimes } from 'react-icons/fa';

export const Tasks = ({tasks, onDelete, onToggle}) => {
  return (
    <div className="mt-3">
        {tasks.map((task) => (
            <div className= {`card p-2 mt-3 mb-3 ${task.reminder ? 'reminder' : ''}`} key={task.id} onDoubleClick={() => onToggle(task.id)}>
                <div className='d-flex justify-content-between'>
                    <h5> {task.text} </h5>
                    <FaTimes className='delete-icon' onClick={() => onDelete(task.id)} />
                </div>
                <p> {task.day} </p>
            </div>
        ))}
    </div>
  )
}
