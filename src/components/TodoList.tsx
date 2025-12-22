import React from 'react';
import type { Todo } from '../App';
import TodoItem from './TodoItem';

interface Props {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
  emptyMessage: string;
}

const TodoList: React.FC<Props> = ({ todos, onToggle, onDelete, onEdit, emptyMessage }) => {
  return (
    <>
      <ul id="task-list">
        {todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onToggle={onToggle} 
            onDelete={onDelete} 
            onEdit={onEdit} 
          />
        ))}
      </ul>
      {todos.length === 0 && (
        <div id="empty-state" className="empty-state" style={{ display: 'block' }}>
          {emptyMessage}
        </div>
      )}
    </>
  );
};

export default TodoList;
