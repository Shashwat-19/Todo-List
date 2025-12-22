import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import TodoForm from './components/TodoForm';
import FilterBar from './components/FilterBar';
import TodoList from './components/TodoList';

export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
  dueDate: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, priority: Priority, dueDate: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      priority,
      dueDate
    };
    setTodos([newTodo, ...todos]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(t => {
      if (t.id === id) {
        const isCompleted = !t.completed;
        if (isCompleted) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
        return { ...t, completed: isCompleted };
      }
      return t;
    }));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(todos.map(t => (t.id === id ? { ...t, text: newText } : t)));
  };

  // Stats
  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;
  const progressPercent = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  const getProgressMessage = () => {
    if (totalCount === 0) return "Let's get started!";
    if (progressPercent === 100) return "All done! Amazing job!";
    if (progressPercent >= 50) return "Halfway there, keep going!";
    return "Keep it up!";
  };

  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <>
      <div className="background-circles">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
      </div>

      <main className="container">
        <div className="dashboard-header">
          <header>
            <h1>Todo List</h1>
            <p className="subtitle">Stay productive, stay focused.</p>
          </header>

          <div className="stats-container">
            <div className="progress-text">
              <span className="progress-title">Your Progress</span>
              <span className="progress-subtitle">{getProgressMessage()}</span>
            </div>
            <div 
              className="progress-circle" 
              style={{ background: `conic-gradient(var(--primary-color) ${progressPercent}%, #dfe6e9 ${progressPercent}%)` }}
            >
              <span className="progress-number">{completedCount}/{totalCount}</span>
            </div>
          </div>
        </div>

        <TodoForm onAdd={addTodo} />
        
        <FilterBar currentFilter={filter} onFilterChange={setFilter} />

        <TodoList 
          todos={filteredTodos} 
          onToggle={toggleComplete} 
          onDelete={deleteTodo} 
          onEdit={editTodo} 
          emptyMessage={
            todos.length === 0 
              ? "No tasks yet. Add one to get started!" 
              : filter !== 'all' ? `No ${filter} tasks.` : ''
          }
        />
      </main>
    </>
  );
}

export default App;
