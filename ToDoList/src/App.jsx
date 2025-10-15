import { useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Add new task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask }]);
      setNewTask("");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-red-400">
     <div className="bg-gray-900 p-15 rounded-4xl">
      <h1 className="text-3xl font-bold text-center mb-7 text-white">
        Chinmay's To-Do List
      </h1>

        {/* Input and Add button */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700"
          />
          <button
            onClick={addTask}
          >
            +
          </button>
        </div>

        <ul className="space-y-3 max-h-80">
          {tasks.map((t, index) => (
            <li
              key={index}
              className="bg-blue-700 px-4 py-2 rounded-md"
            >
              {t.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
