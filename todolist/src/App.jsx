import './App.css'; 
import { useState } from 'react';

import Task from './components/Task';
import List from './components/List';


export default function App() {
  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  return (
    <div >
      <h1>My To-Do List</h1>
      <Task addItem={addItem} />
      <List tasks={items} />
    </div>
  );
}

