import React from 'react'

function List({ tasks }) {
  return (
    <div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  )
}

export default List
