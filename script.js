let tasks = JSON.parse(localStorage.getItem('tasks')) || []; 

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
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
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./edit.png" onClick="editTask(${index})" />
                <img src="./bin.png" onClick="deleteTask(${index})" />
            </div>
        </div>
        `;

        const checkbox = listItem.querySelector('.checkbox');
        checkbox.addEventListener('change', () => toggleTaskComplete(index));

        taskList.append(listItem);
    });
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveTasks(); 
    updateTasksList();
    updateStats();
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

   tasks.splice(index,1);
   updateTasksList();
   updateStats();
};

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
    }
};




const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
};

document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});

updateTasksList();

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
};

document.getElementById('resetTasks').addEventListener('click', function () {
    tasks = []; // Clear all tasks
    saveTasks(); // Save the empty task list to localStorage
    updateTasksList(); // Update the task list on the page
    updateStats(); // Update stats to reflect no tasks
    document.getElementById('taskInput').value = ""; // Clear input field
});
