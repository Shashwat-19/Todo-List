# To-Do List App

This To-Do List App allows users to manage their tasks with simple actions such as adding, editing, completing, and deleting tasks. The app features a progress tracker, a confetti celebration when all tasks are completed, and persistence of data across sessions using **localStorage**.

## Features

- **Add Tasks:** Quickly add tasks to your to-do list by typing in the input field.
- **Edit Tasks:** You can edit tasks by clicking the edit icon next to each task.
- **Complete Tasks:** Mark tasks as completed by checking the checkbox, which updates the progress bar.
- **Delete Tasks:** Delete tasks from the list by clicking the trash icon next to them.
- **Task Stats:** See the total number of tasks and how many are completed, represented visually with a progress bar.
- **Confetti Celebration:** When all tasks are marked as complete, a confetti animation will play as a celebration!

## Technologies Used

- **JavaScript:** Used for handling the tasks' logic, including adding, editing, deleting, and marking tasks as complete.
- **HTML/CSS:** For creating the structure and styling the interface of the app.
- **localStorage:** Used to store tasks persistently across page reloads.

## How It Works

- **Adding Tasks:** The user enters a task in the input field and clicks the 'Add' button. The task is added to the list and stored in the browser's localStorage.
- **Task Display:** The app renders the list of tasks dynamically and allows users to interact with each task (edit, delete, complete).
- **Task Completion:** When a task is completed, the task's text gets a strike-through effect and updates the progress bar.
- **Editing Tasks:** If you want to edit a task, clicking the edit icon will populate the input field with the current task's text. After editing, the task will be updated.
- **Stats and Progress:** The number of tasks completed is shown, and the progress bar visually represents how much of the to-do list has been completed.
- **Confetti Effect:** If all tasks are completed, a confetti effect is triggered, celebrating the accomplishment!

## How to Use

1. Clone or download the repository.
2. Open the `index.html` file in a web browser.
3. Add, complete, edit, or delete tasks to see the functionality in action.
4. Reload the page, and your tasks will persist because they are stored in `localStorage`.

## Code Walkthrough

### Task Management Functions

1. **addTask()**: Adds a new task to the list, updates the localStorage, and re-renders the list of tasks.
2. **updateTasksList()**: Renders the tasks to the page, creating checkboxes and icons for each task.
3. **toggleTaskComplete()**: Toggles the completion status of a task and updates the progress.
4. **deleteTask()**: Deletes a task from the list and updates localStorage.
5. **editTask()**: Allows editing of tasks, populating the input field with the current task's text.
6. **updateStats()**: Updates the number of completed tasks and adjusts the progress bar. Triggers confetti when all tasks are completed.
7. **saveTasks()**: Saves the tasks array to localStorage as a JSON string.
8. **blastConfetti()**: Triggers a confetti animation when all tasks are completed.

### Styling

- **Minimal and sleek UI** designed with a dark theme and contrasting colors.
- **Flexbox Layout** is used to align elements such as tasks and the footer, ensuring a clean and responsive design.
- **CSS Animations** for smooth transitions when interacting with tasks (e.g., checkboxes and buttons).

## Demo

You can try out the To-Do List App directly by visiting the live demo [Live](https://shashwat-19.github.io/Todo-List/).

## Links

- [GitHub Repository](https://github.com/Shashwat-19/Todo-List)  
- [LinkedIn](https://www.linkedin.com/in/shashwatk1956/)  
- [Instagram](https://www.instagram.com/shashwat.56/)  


---

Enjoy managing your tasks with this simple and fun to-do list app! 🎉