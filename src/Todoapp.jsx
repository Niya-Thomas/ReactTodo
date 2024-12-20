import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';  
import './Todostyle.css'

function Todoapp() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");

  // Add Task
  const addTask = () => {
    if (!taskText.trim()) return;  // Prevent adding empty tasks
    const newTask = { id: uuidv4(), text: taskText, completed: false };
    setTasks([...tasks, newTask]);
    setTaskText("");
  };

  // Edit Task
  const editTask = (task) => {
    setTaskText(task.text);
    setEditingTask(task);
  };

  // Update Task
  const updateTask = () => {
    if (!taskText.trim()) return;
    const updatedTasks = tasks.map((task) =>
      task.id === editingTask.id ? { ...task, text: taskText } : task
    );
    setTasks(updatedTasks);
    setTaskText("");
    setEditingTask(null);
  };

  // Delete Task
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Toggle Task Completion
  const toggleCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Filter Tasks
  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => (filter === "completed" ? task.completed : !task.completed));

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder=" Enter task"
        style={{border:"none" , borderRadius:"10px", padding:"10px"}}
      />
      <button onClick={editingTask ? updateTask : addTask}>
        {editingTask ? "Update Task" : "Add Task"}
      </button>
      
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <button onClick={() => toggleCompletion(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => editTask(task)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todoapp;
