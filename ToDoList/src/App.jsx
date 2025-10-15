import { useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, input]);
    setInput("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-400">
      <div className="bg-white p-6 rounded-2xl w-80 shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Pratik's To-Do List</h1>

        <div className="flex mb-4 gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 border rounded-lg px-2 py-1"
          />
          <button onClick={addTask} className="bg-blue-600 text-white px-3 rounded-lg">+</button>
        </div>

        <ul>
          {tasks.map((task, i) => (
            <li key={i} className="flex justify-between bg-gray-100 px-3 py-1 rounded mb-2">
              {task}
              <button onClick={() => deleteTask(i)} className="text-red-500">x</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
