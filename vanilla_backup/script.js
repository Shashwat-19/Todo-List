/**
 * Modern Todo App Logic with Advanced Features
 * Features: Priority, Due Dates, Filtering, Editing, LocalStorage, Animations, Confetti
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- State Management ---
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let currentFilter = 'all'; // 'all', 'active', 'completed'
    
    // --- DOM Elements ---
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const prioritySelect = document.getElementById('priority-select');
    const dueDateInput = document.getElementById('due-date-input');
    const taskList = document.getElementById('task-list');
    const emptyState = document.getElementById('empty-state');
    const progressNumber = document.getElementById('progress-number');
    const progressMsg = document.getElementById('progress-msg');
    const progressCircle = document.getElementById('progress-circle');
    const filterBtns = document.querySelectorAll('.filter-btn');

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
        
        const percent = total === 0 ? 0 : (completed / total) * 100;
        
        progressCircle.style.background = `conic-gradient(var(--primary-color) ${percent}%, #dfe6e9 ${percent}%)`;
        
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

    const editTask = (id, newText) => {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, text: newText };
            }
            return todo;
        });
        saveTodos();
    };

    const enableEditMode = (id, textSpan) => {
        const originalText = textSpan.innerText;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = originalText;
        input.className = 'edit-input';
        
        // Replace text with input
        textSpan.innerHTML = '';
        textSpan.appendChild(input);
        input.focus();

        const saveEdit = () => {
            const newText = input.value.trim();
            if (newText && newText !== originalText) {
                editTask(id, newText);
            } else {
                renderTodos(); // Revert to original
            }
        };

        input.addEventListener('blur', saveEdit);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') saveEdit();
        });
    };

    const addTodo = (text, priority, dueDate) => {
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false,
            priority: priority,
            dueDate: dueDate
        };
        todos.unshift(newTodo); // Add to top
        saveTodos();
        input.value = '';
        dueDateInput.value = '';
        prioritySelect.value = 'low'; // Reset to default
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

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // --- Rendering ---
    const renderTodos = () => {
        taskList.innerHTML = '';
        
        let filteredTodos = todos;
        if (currentFilter === 'active') {
            filteredTodos = todos.filter(t => !t.completed);
        } else if (currentFilter === 'completed') {
            filteredTodos = todos.filter(t => t.completed);
        }
        
        if (filteredTodos.length === 0) {
            emptyState.style.display = 'block';
            emptyState.innerText = currentFilter === 'all' 
                ? "No tasks yet. Add one to get started!" 
                : `No ${currentFilter} tasks.`;
        } else {
            emptyState.style.display = 'none';
        }

        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.id = `todo-${todo.id}`;
            if (todo.completed) li.classList.add('completed');
            
            // Checkbox
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
            
            // Content Wrapper
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'task-content';

            // Text
            const span = document.createElement('span');
            span.className = 'todo-text';
            span.innerText = todo.text;
            
            // Meta Info (Priority + Date)
            const metaInfo = document.createElement('div');
            metaInfo.className = 'meta-info';
            
            // Priority Badge
            if (todo.priority) {
                const badge = document.createElement('span');
                badge.className = `badge badge-${todo.priority}`;
                badge.innerText = todo.priority;
                metaInfo.appendChild(badge);
            }
            
            // Due Date
            if (todo.dueDate) {
                const dateSpan = document.createElement('span');
                dateSpan.className = 'date-text';
                dateSpan.innerHTML = `
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    ${formatDate(todo.dueDate)}
                `;
                metaInfo.appendChild(dateSpan);
            }
            
            contentWrapper.appendChild(span);
            if (todo.priority || todo.dueDate) {
                contentWrapper.appendChild(metaInfo);
            }

            // Actions
            const actions = document.createElement('div');
            actions.className = 'actions';

            // Edit Button
            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.innerHTML = `
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="feather feather-edit-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
            `;
            editBtn.ariaLabel = "Edit task";
            editBtn.addEventListener('click', () => enableEditMode(todo.id, span));

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
            
            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
            
            li.appendChild(checkboxContainer);
            li.appendChild(contentWrapper);
            li.appendChild(actions);
            
            taskList.appendChild(li);
        });
        
        updateStats();
    };

    // --- Event Listeners ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        const priority = prioritySelect.value;
        const date = dueDateInput.value;
        
        if (text) {
            addTodo(text, priority, date);
        }
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');
            // Update filter
            currentFilter = btn.getAttribute('data-filter');
            renderTodos();
        });
    });

    // Initial Init
    renderTodos();
});