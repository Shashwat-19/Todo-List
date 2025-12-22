import React, { useState } from 'react';
import type { Todo } from '../App';

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (e.animationName === 'slideOut') {
      onDelete(todo.id);
    }
  };

  const handleEditSubmit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim());
    } else {
        setEditText(todo.text);
    }
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <li 
      id={`todo-${todo.id}`} 
      className={`${todo.completed ? 'completed' : ''}`}
      style={isDeleting ? { animation: 'slideOut 0.3s ease forwards' } : {}}
      onAnimationEnd={isDeleting ? handleAnimationEnd : undefined}
    >
      <label className="checkbox-container">
        <input 
          type="checkbox" 
          checked={todo.completed} 
          onChange={() => onToggle(todo.id)} 
          aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
        />
        <span className="checkmark"></span>
      </label>

      <div className="task-content">
        {isEditing ? (
            <input 
                type="text" 
                value={editText} 
                className="edit-input" // Note: need to add this class to style.css if it was dynamic in js
                style={{ 
                    border: 'none', 
                    borderBottom: '2px solid var(--primary-color)', 
                    outline: 'none',
                    fontSize: '1rem',
                    width: '100%',
                    fontFamily: 'Poppins'
                 }}
                autoFocus
                onChange={(e) => setEditText(e.target.value)}
                onBlur={handleEditSubmit}
                onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit()}
                aria-label="Edit task"
            />
        ) : (
            <span className="todo-text">{todo.text}</span>
        )}

        {(todo.priority || todo.dueDate) && (
          <div className="meta-info">
            {todo.priority && (
              <span className={`badge badge-${todo.priority}`}>{todo.priority}</span>
            )}
            {todo.dueDate && (
              <span className="date-text">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {formatDate(todo.dueDate)}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="actions">
        <button className="edit-btn" aria-label="Edit task" onClick={() => setIsEditing(true)}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="feather feather-edit-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
        </button>
        <button className="delete-btn" aria-label="Delete task" onClick={handleDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360Z"/>
            </svg>
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
