import React, { useState, useEffect } from "react";

const TaskForm = ({ onAddTask, onUpdateTask, editingTask, closeForm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") {
      alert("Task title and description cannot be empty!");
      return;
    }
    if (editingTask) {
      onUpdateTask({ ...editingTask, title, description });
    } else {
      onAddTask({ title, description });
    }
    setTitle("");
    setDescription("");
    closeForm();
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
      <button type="button" onClick={closeForm}>
        Cancel
      </button>
    </form>
  );
};

export default TaskForm;
