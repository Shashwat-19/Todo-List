# ✨ Modern Professional Todo List

<div align="center">
  <h3>Minimalist. Powerful. Beautiful.</h3>
  <p>A feature-rich task management application built with <strong>React</strong>, <strong>TypeScript</strong>, and <strong>Vite</strong>.</p>
</div>

---

## 🚀 Overview

This application redefines the classic "Todo List" by combining robust functionality with a stunning **Glassmorphism UI**. Designed for productivity enthusiasts, it offers a seamless experience on both desktop and mobile devices.

The tech stack has been modernized from Vanilla JS to a scalable **React + TypeScript** architecture, ensuring type safety, blazing fast performance, and easy maintainability.

## ✨ Key Features

- **🎨 Stunning UI**: A vibrant violet-blue gradient background with frosted glass cards ("Glassmorphism").
- **📱 Fully Responsive**:
  - **Broad Dashboard** on Desktop (900px width) with grid layouts.
  - **Mobile Optimized** with stacked inputs and touch-friendly targets.
- **🔥 Priority System**: Categorize tasks as **High**, **Medium**, or **Low** with visual color-coded badges.
- **📅 Due Dates**: Set deadlines and track them easily.
- **🔍 Smart Filtering**: Instantly toggle between **All**, **Active**, and **Completed** tasks.
- **✏️ Inline Editing**: Fix typos or update tasks on the fly.
- **💾 Auto-Save**: Your data persists automatically via LocalStorage.
- **🎉 Gamified Experience**: Enjoy a confetti pop celebration when completing tasks!

## 🛠️ Tech Stack

- **Core**: [React 18](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Pure CSS (Variables, Flexbox, Grid, Glassmorphism)
- **Icons**: SVG Icons (Feather / Material Design style)
- **Extras**: `canvas-confetti` for animations

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/Shashwat-19/Todo-List.git
    cd Todo-List
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Start the development server**

    ```bash
    npm run dev
    ```

4.  **Open in your browser**
    Navigate to `http://localhost:5173` to view the app.

## 🏗️ Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── TodoForm.tsx  # Input area (Task, Priority, Date)
│   ├── TodoList.tsx  # List container
│   ├── TodoItem.tsx  # Individual task item (Animations, Actions)
│   └── FilterBar.tsx # Filter toggles (All/Active/Completed)
├── App.tsx           # Main controller (State, Layout)
├── index.css         # Global styles & Glassmorphism theme
└── main.tsx          # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
