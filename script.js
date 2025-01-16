let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

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
    }
};

const updateTasksList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} />
                <p><strong>${index + 1}.</strong> ${task.text}</p>
            </div>
            <div class="task-status">
                <p>Status: <span class="status-text">${getStatusText(task.status)}</span></p>
            </div>
            <div class="icons">
                <select class="status-dropdown" data-index="${index}">
                    ${options.map(option => `
                        <option value="${option.toLowerCase().replace(' ', '-')}" 
                            ${task.status === option.toLowerCase().replace(' ', '-') ? 'selected' : ''}>
                            ${option}
                        </option>`).join('')}
                </select>
                <img src="./assets/edit.png" onClick="editTask(${index})" />
                <img src="./assets/bin.png" onClick="deleteTask(${index})" />
            </div>
        </div>
        `;

        const checkbox = listItem.querySelector('.checkbox');
        checkbox.addEventListener('change', () => toggleTaskComplete(index));

        const dropdown = listItem.querySelector('.status-dropdown');
        dropdown.addEventListener('change', (e) => updateTaskStatus(index, e.target.value));

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
            return '';
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
};

const updateTaskStatus = (index, status) => {
    tasks[index].status = status;

    // Automatically check or uncheck the task based on the status
    tasks[index].completed = status === 'completed';

    saveTasks();
    updateTasksList();
    updateStats();

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
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
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

updateTasksList();
updateStats(); // Ensure stats are updated on load

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
    document.getElementById('taskInput').value = "";
});

const toggleSwitch = document.querySelector('.theme-switch__checkbox');

toggleSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', toggleSwitch.checked);
});

// Optional: Save user preference in localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    toggleSwitch.checked = true;
}

toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
});
