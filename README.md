# Modern Todo List

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)

A beautiful, modern, and interactive Todo List application built with React, TypeScript, and Vite. Designed to help you stay organized and focused with a premium user experience.

## ✨ Features

- **📝 Task Management**:  
  Create, edit, and delete tasks with ease. The interface is designed for quick interactions, allowing you to manage your daily to-dos efficiently.
- **🔥 Priority Levels**:  
  Stay focused on what matters most. Assign priority levels (**Low**, **Medium**, **High**) to your tasks to visually categorize them and tackle urgent items first.

- **📅 Due Dates**:  
  Never miss a deadline. Set due dates for your tasks to keep track of your schedule.

- **📊 Progress Tracking**:  
  Visualize your productivity with a dynamic circular progress bar. As you complete tasks, watch your progress grow and get motivated by encouraging status messages.

- **🎉 Celebration Effects**:  
  Make productivity fun! Experience satisfying confetti animations whenever you mark a task as complete.

- **🔍 Smart Filtering**:  
  Focus on what's relevant. Filter your list to show **All**, **Active**, or **Completed** tasks to declutter your view.

- **💾 Local Storage Persistence**:  
  Your data is safe. All your tasks are automatically saved to your browser's local storage, so you can close the tab and return later without losing your list.

- **🎨 Modern Design**:  
  Enjoy a sleek, responsive interface featuring smooth transitions, glassmorphism effects, and a polished aesthetic suitable for all refined tastes.

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) - The library for web and native user interfaces.
- **Language**: [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types.
- **Build Tool**: [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling.
- **Styling**: Vanilla CSS - Utilizing modern CSS variables, flexbox/grid, and responsive media queries.
- **Linting**: ESLint - Find and fix problems in your JavaScript code.

## 🚀 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Ensure you have **Node.js** installed on your system. You can verify it by running:

```bash
node -v
```

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/todo-app.git
    cd todo-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

### Running the App

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the URL shown in your terminal).

## 📜 Available Scripts

In the project directory, you can run:

| Script            | Description                                                         |
| :---------------- | :------------------------------------------------------------------ |
| `npm run dev`     | Runs the app in development mode with HMR (Hot Module Replacement). |
| `npm run build`   | Builds the app for production to the `dist` folder.                 |
| `npm run lint`    | Runs ESLint to check for code quality and style issues.             |
| `npm run preview` | Locally preview the production build.                               |

## 📂 Project Structure

A quick overview of the important files and directories:

```
src/
├── components/
│   ├── FilterBar.tsx    # Controls for filtering tasks (All/Active/Completed)
│   ├── TodoForm.tsx     # Input form to add new tasks with priority and date
│   ├── TodoItem.tsx     # Individual task component with edit/delete actions
│   └── TodoList.tsx     # Container for rendering the list of tasks
├── App.tsx              # Main application logic (State management, Layout)
├── index.css            # Global application styles, CSS variables, and themes
├── main.tsx             # Application entry point
└── vite-env.d.ts        # Vite type definitions
```

## 🎨 Customization

The application uses CSS variables for easy theming. You can find and modify these in `src/index.css`:

```css
:root {
  --primary-color: #6c5ce7;
  --secondary-color: #a29bfe;
  --background-color: #f5f6fa;
  /* ...modify these values to change the look and feel */
}
```

## 🔮 Roadmap

Future improvements planned for this project:

- [ ] Dark Mode toggle 🌙
- [ ] Drag and Drop task reordering ✋
- [ ] Categories/Tags for tasks 🏷️
- [ ] User Authentication (Cloud Sync) ☁️

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or bug fixes, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
