import React from 'react'

export default function List({ tasks }) {
  return (
    <ul >
      {tasks.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}



















