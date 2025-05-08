document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('todo-input');
    const taskList = document.getElementById('task-list');
    const addButton = document.getElementById('add-button');
    const numberDisplay = document.getElementById('number');
    const progressBar = document.getElementById('progress');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let tasks = []; // Array to store tasks
    let currentFilter = 'all';

    // Load tasks from localStorage
    function loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem('todoTasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
        }
    }

    // Save tasks to localStorage
    function saveTasksToLocalStorage() {
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
    }

    // Load tasks when the page loads
    loadTasksFromLocalStorage();
    renderTasks(); // Render the tasks that were loaded

    // Handle adding a new task
    addButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent form submission
        const taskText = taskInput.value.trim();

        if (taskText) {
            const newTask = {
                text: taskText,
                status: 'not-started', // Default status
            };

            tasks.push(newTask);
            taskInput.value = ''; // Clear input field
            saveTasksToLocalStorage(); // Save to localStorage
            renderTasks();
        }
    });

    function createStatusDropdown(task, index) {
        const select = document.createElement('select');
        select.className = 'status-dropdown';
        ['not-started', 'in-progress', 'completed'].forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status.replace('-', ' ');
            if (task.status === status) option.selected = true;
            select.appendChild(option);
        });

        select.addEventListener('change', () => {
            task.status = select.value;
            saveTasksToLocalStorage();
            renderTasks();
        });

        return select;
    }

    function renderTasks() {
        taskList.innerHTML = ''; // Clear current task list
        let completedCount = 0;

        const filteredTasks = tasks.filter(task => {
            if (currentFilter === 'all') return true;
            return task.status === currentFilter;
        });

        filteredTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.add('todo');

            const taskLabel = document.createElement('span');
            taskLabel.classList.add('todo-text');
            taskLabel.textContent = task.text;

            const statusDropdown = createStatusDropdown(task, index);

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.innerHTML = `<svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360Z"/></svg>`;
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasksToLocalStorage();
                renderTasks();
            });

            li.appendChild(taskLabel);
            li.appendChild(statusDropdown);
            li.appendChild(deleteButton);
            taskList.appendChild(li);

            if (task.status === 'completed') {
                completedCount++;
            }
        });

        updateStats(tasks.length, completedCount);
        updateFilterCounts();
    }

    function renderTasks() {
        taskList.innerHTML = ''; // Clear current task list
        let completedCount = 0;
    
        const filteredTasks = tasks.filter(task => {
            if (currentFilter === 'all') return true;
            return task.status === currentFilter;
        });
    
        filteredTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.add('todo');
    
            // Create checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'todo-checkbox';
            checkbox.checked = task.status === 'completed'; // Check if the task is completed
            checkbox.addEventListener('change', () => {
                task.status = checkbox.checked ? 'completed' : 'not-started'; // Update task status
                saveTasksToLocalStorage();
                renderTasks();
            });
    
            const taskLabel = document.createElement('span');
            taskLabel.classList.add('todo-text');
            taskLabel.textContent = task.text;
    
            const statusDropdown = createStatusDropdown(task, index);
    
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.innerHTML = `<svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360Z"/></svg>`;
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasksToLocalStorage();
                renderTasks();
            });
    
            // Append elements to the list item
            li.appendChild(checkbox);  // Add checkbox to the task
            li.appendChild(taskLabel);
            li.appendChild(statusDropdown);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
    
            if (task.status === 'completed') {
                completedCount++;
            }
        });
    
        updateStats(tasks.length, completedCount);
        updateFilterCounts();
    }
    

    // Update the task stats and progress bar
    function updateStats(total, completed) {
        numberDisplay.textContent = `${completed} / ${total}`;
        const progress = total === 0 ? 0 : (completed / total) * 100;
        progressBar.style.width = `${progress}%`;

        if (completed === total && total > 0) {
            launchConfetti();
            showMotivationalModal();
        }
    }

    // Launch confetti when all tasks are completed
    function launchConfetti() {
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 200,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff00ff', '#ff6600', '#66ff66', '#00ccff', '#ffcc00'],
                scalar: 1.2,
            });
        } else {
            console.error("Confetti library not loaded correctly.");
        }
    }

    const motivationalModal = document.getElementById('motivationalModal');
    const closeModalButton = document.getElementById('closeModal');
    closeModalButton.addEventListener('click', () => {
        motivationalModal.style.display = 'none';
    });

    function showMotivationalModal() {
        motivationalModal.style.display = 'flex';
    }

    function updateFilterCounts() {
        const allCount = tasks.length;
        const completedCount = tasks.filter(task => task.status === 'completed').length;
        const inProgressCount = tasks.filter(task => task.status === 'in-progress').length;
        const notStartedCount = tasks.filter(task => task.status === 'not-started').length;

        document.querySelectorAll('.filter-btn').forEach(btn => {
            const filter = btn.getAttribute('data-filter');
            let count = 0;

            switch (filter) {
                case 'all':
                    count = allCount;
                    break;
                case 'completed':
                    count = completedCount;
                    break;
                case 'in-progress':
                    count = inProgressCount;
                    break;
                case 'not-started':
                    count = notStartedCount;
                    break;
            }

            let badge = btn.querySelector('.count-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'count-badge';
                btn.appendChild(badge);
            }
            badge.textContent = count;
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            currentFilter = e.target.dataset.filter;
            renderTasks();
        });
    })
});