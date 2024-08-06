import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import tasksData from "../data/tasks.json";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const query = useQuery();
  const navigate = useNavigate();
  const searchQuery = query.get("search") || "";

  useEffect(() => {
    setTasks(tasksData);
  }, []);

  const addTask = (task) => {
    const newTask = {
      id: tasks.length + 1,
      title: task.title,
      description: task.description,
      completed: false,
      timestamp: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
    setIsFormOpen(false);
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id
        ? { ...updatedTask, timestamp: new Date().toISOString() }
        : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setIsFormOpen(false);
  };

  const markAsDone = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.completed - b.completed);

  return (
    <div className="task-list">
      <div className="task-list-header">
        <div className="task-list-name">ToDo List</div>
        <input
          type="text"
          placeholder="Search tasks"
          value={searchQuery}
          onChange={(e) => navigate(`?search=${e.target.value}`)}
          className="search-input"
        />
        <button onClick={() => setIsFormOpen(true)}>Add Task</button>
      </div>
      {isFormOpen && (
        <TaskForm
          onAddTask={addTask}
          onUpdateTask={updateTask}
          editingTask={editingTask}
          closeForm={() => setIsFormOpen(false)}
        />
      )}
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdateTask={updateTask}
          onMarkAsDone={markAsDone}
        />
      ))}
    </div>
  );
};

export default TaskList;
