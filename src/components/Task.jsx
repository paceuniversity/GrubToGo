import React, { useState } from 'react'

function Task({ onAdd }) {
  const [task, setTask] = useState('')

  const handleClick = () => {
    if (task.trim() !== '') {
      onAdd(task)
      setTask('')
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleClick}>+</button>
    </div>
  )
}

export default Task
