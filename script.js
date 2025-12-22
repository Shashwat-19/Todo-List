/**
 * Modern Todo App Logic
 * Features: State management, LocalStorage, Animations, Confetti
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- State Management ---
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    
    // --- DOM Elements ---
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const taskList = document.getElementById('task-list');
    const emptyState = document.getElementById('empty-state');
    const progressNumber = document.getElementById('progress-number');
    const progressMsg = document.getElementById('progress-msg');
    const progressCircle = document.getElementById('progress-circle');

    // --- Functions ---

    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
        updateStats();
        renderTodos();
    };

    const updateStats = () => {
        const completed = todos.filter(t => t.completed).length;
        const total = todos.length;
        
        progressNumber.innerText = `${completed}/${total}`;
        
        // Calculate progress percentage
        const percent = total === 0 ? 0 : (completed / total) * 100;
        
        // Update conic-gradient for the circle
        progressCircle.style.background = `conic-gradient(var(--primary-color) ${percent}%, #dfe6e9 ${percent}%)`;
        
        // Update motivational message
        if (total === 0) {
            progressMsg.innerText = "Let's get started!";
        } else if (percent === 100) {
            progressMsg.innerText = "All done! Amazing job!";
        } else if (percent >= 50) {
            progressMsg.innerText = "Halfway there, keep going!";
        } else {
            progressMsg.innerText = "Keep it up!";
        }
    };

    const toggleComplete = (id) => {
        todos = todos.map(todo => {
            if (todo.id === id) {
                const isCompleted = !todo.completed;
                if (isCompleted) matchConfetti();
                return { ...todo, completed: isCompleted };
            }
            return todo;
        });
        saveTodos();
    };

    const deleteTask = (id) => {
        // Optimistic UI update handled in render, but for smooth exit animation:
        const item = document.getElementById(`todo-${id}`);
        if(item) {
            item.style.animation = 'slideOut 0.3s ease forwards';
            item.addEventListener('animationend', () => {
                todos = todos.filter(t => t.id !== id);
                saveTodos();
            });
        } else {
            todos = todos.filter(t => t.id !== id);
            saveTodos();
        }
    };

    const addTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        todos.push(newTodo);
        saveTodos();
        input.value = '';
    };

    const matchConfetti = () => {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    };

    // --- Rendering ---
    const renderTodos = () => {
        taskList.innerHTML = '';
        
        if (todos.length === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
        }

        todos.forEach(todo => {
            const li = document.createElement('li');
            li.id = `todo-${todo.id}`;
            if (todo.completed) li.classList.add('completed');
            
            // Checkbox Container
            const checkboxContainer = document.createElement('label');
            checkboxContainer.className = 'checkbox-container';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => toggleComplete(todo.id));
            
            const checkmark = document.createElement('span');
            checkmark.className = 'checkmark';
            
            checkboxContainer.appendChild(checkbox);
            checkboxContainer.appendChild(checkmark);
            
            // Text
            const span = document.createElement('span');
            span.className = 'todo-text';
            span.innerText = todo.text;
            
            // Delete Button
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360Z"/>
                </svg>
            `;
            deleteBtn.ariaLabel = "Delete task";
            deleteBtn.addEventListener('click', () => deleteTask(todo.id));
            
            li.appendChild(checkboxContainer);
            li.appendChild(span);
            li.appendChild(deleteBtn);
            
            taskList.appendChild(li);
        });
        
        updateStats(); // Ensure stats are sync
    };

    // --- Event Listeners ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
            addTodo(text);
        }
    });

    // Initial Init
    renderTodos();
});