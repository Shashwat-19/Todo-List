let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

const options = ['Not Started', 'In Progress', 'Completed'];

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false, status: 'not-started' });
        taskInput.value = "";
        saveTasks();
        updateTasksList();
        updateStats();
        updateFilterCounts();
    }
};

const updateTasksList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        
        // Determine status class for styling
        const statusClass = task.status || 'not-started';
        
        // Set visibility based on current filter
        const isVisible = 
            currentFilter === 'all' || 
            currentFilter === task.status;
        
        if (!isVisible) {
            listItem.classList.add('task-hidden');
        }
        
        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task-left">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} />
                <p class="${task.completed ? 'completed' : ''}"><strong>${index + 1}.</strong> ${task.text}</p>
            </div>
            
            <div class="task-middle">
                <div class="task-status-indicator status-${statusClass}">
                    ${getStatusText(task.status)}
                </div>
            </div>
            
            <div class="task-right">
                <select class="status-dropdown" data-index="${index}">
                    ${options.map(option => `
                        <option value="${option.toLowerCase().replace(' ', '-')}" 
                            ${task.status === option.toLowerCase().replace(' ', '-') ? 'selected' : ''}>
                            ${option}
                        </option>`).join('')}
                </select>
                <div class="task-icons">
                    <img src="./assets/edit.png" onClick="editTask(${index})" />
                    <img src="./assets/bin.png" onClick="deleteTask(${index})" />
                </div>
            </div>
        </div>
        `;

        const checkbox = listItem.querySelector('.checkbox');
        checkbox.addEventListener('change', () => toggleTaskComplete(index));

        const dropdown = listItem.querySelector('.status-dropdown');
        dropdown.addEventListener('change', (e) => {
            updateTaskStatus(index, e.target.value);
        });

        taskList.append(listItem);
    });
};

const getStatusText = (status) => {
    switch (status) {
        case 'not-started':
            return 'Not Started';
        case 'in-progress':
            return 'In Progress';
        case 'completed':
            return 'Completed';
        default:
            return 'Not Started';
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        tasks[index].status = 'completed';
        blastConfetti(); // Trigger confetti when a task is completed
    } else {
        tasks[index].status = 'not-started';
    }
    saveTasks();
    updateTasksList();
    updateStats();
    updateFilterCounts();
};

const updateTaskStatus = (index, status) => {
    tasks[index].status = status;

    // Automatically check or uncheck the task based on the status
    tasks[index].completed = status === 'completed';

    saveTasks();
    updateTasksList();
    updateStats();
    updateFilterCounts();

    // Trigger confetti if the task is marked as completed
    if (tasks[index].completed) {
        blastConfetti(); // Trigger confetti when a task is completed
    }
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    saveTasks();
    updateTasksList();
    updateStats();
    updateFilterCounts();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    updateFilterCounts();
};

const taskList = document.getElementById('task-list');
taskList.scrollTop = taskList.scrollHeight;


const motivationalModal = document.getElementById('motivationalModal');
const closeModalButton = document.getElementById('closeModal');

const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? (completeTasks / totalTasks) * 100 : 0;

    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;
    document.getElementById("number").innerText = `${completeTasks} / ${totalTasks}`;

    if (tasks.length && completeTasks === totalTasks) {
        console.log('Confetti blasting!');
        blastConfetti();
        showMotivationalModal(); // Show popup
    }
};

// Function to update the counts for each filter category
const updateFilterCounts = () => {
    const allCount = tasks.length;
    const completedCount = tasks.filter(task => task.status === 'completed').length;
    const inProgressCount = tasks.filter(task => task.status === 'in-progress').length;
    const notStartedCount = tasks.filter(task => task.status === 'not-started').length;
    
    // Update buttons with count badges (optional enhancement)
    // This would require adding span elements to the buttons
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
        
        // Check if a count badge already exists
        let badge = btn.querySelector('.count-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'count-badge';
            btn.appendChild(badge);
        }
        
        badge.textContent = count;
    });
};

// Filter tasks based on their status
const filterTasks = (filter) => {
    currentFilter = filter;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update task list based on filter
    updateTasksList();
};

const showMotivationalModal = () => {
    motivationalModal.style.display = 'flex';
};

closeModalButton.addEventListener('click', () => {
    motivationalModal.style.display = 'none';
});

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});

// Add event listeners for filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        filterTasks(filter);
    });
});

updateTasksList();
updateStats(); // Ensure stats are updated on load
updateFilterCounts(); // Initialize filter counts

const setConfettiCanvasZIndex = () => {
    const confettiCanvas = document.querySelector('canvas.confetti-container');
    if (confettiCanvas) {
        confettiCanvas.style.zIndex = '1100'; // Ensure it is above the modal
        confettiCanvas.style.position = 'fixed'; // Ensure proper positioning
    }
};

const blastConfetti = () => {
    const count = 200,
        defaults = {
            origin: { y: 0.7 },
        };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
            })
        );
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });

    setConfettiCanvasZIndex();
};

document.getElementById('resetTasks').addEventListener('click', function () {
    tasks = [];
    saveTasks();
    updateTasksList();
    updateStats();
    updateFilterCounts();
    document.getElementById('taskInput').value = "";
});