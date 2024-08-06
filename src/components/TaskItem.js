import React, { useState } from "react";

const TaskItem = ({ task, onUpdateTask, onMarkAsDone }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleUpdate = () => {
    if (title.trim() === "" || description.trim() === "") {
      alert("Task title and description cannot be empty!");
      return;
    }
    onUpdateTask({ ...task, title, description });
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div>
            <h3>{task.title}</h3>
            <p>{isExpanded && task.description}</p>
            {isExpanded && <p>{new Date(task.timestamp).toLocaleString()}</p>}
            <button onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Collapse" : "Expand"}
            </button>
            <button onClick={() => onMarkAsDone(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
