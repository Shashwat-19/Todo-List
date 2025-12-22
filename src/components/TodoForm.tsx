import React, { useState } from 'react';
import type { Priority } from '../App';

interface Props {
  onAdd: (text: string, priority: Priority, dueDate: string) => void;
}

const TodoForm: React.FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('low');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), priority, dueDate);
      setText('');
      setPriority('low');
      setDueDate('');
    }
  };

  return (
    <form id="todo-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input 
          type="text" 
          id="todo-input" 
          placeholder="Add a new task..." 
          autoComplete="off"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      
      <div className="input-options">
        <select 
          id="priority-select" 
          title="Select Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium</option>
          <option value="high">High Priority</option>
        </select>
        <input 
          type="date" 
          id="due-date-input" 
          title="Select Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button type="submit" id="add-button" aria-label="Add task">
        <svg viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </button>
    </form>
  );
};

export default TodoForm;
