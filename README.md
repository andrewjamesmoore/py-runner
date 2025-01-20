# py-runner

A browser-based Python playground that lets you write and execute Python code in real-time. Built with security and performance in mind, PyRunner provides a sandboxed environment for learning and experimenting with Python.

## Features

- Real-time Python code execution in the browser
- Secure sandboxed environment
- Built-in Python reference documentation
- Code editor with syntax highlighting
- Command history and code examples
- Responsive design for mobile and desktop
- Keyboard shortcuts for improved workflow

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Python Runtime**: Pyodide (WebAssembly-based Python)
- **Code Editor**: CodeMirror 6
- **Build Tool**: Vite
- **Styling**: CSS Modules
- **Deployment**: Heroku

## Security Features

- Restricted module imports
- Memory usage limits (50MB)
- Execution time limits (5 seconds)
- Disabled file system operations
- Blocked system commands

## Development Highlights

- Custom hook for keyboard shortcuts
- Responsive side panel with drag-to-resize
- Real-time code execution with output capture
- Error handling and timeout management
- Mobile-first responsive design
- Zero external UI dependencies

## Getting Started

1. Clone the repository:

`git clone https://github.com/andrewjamesmoore/py-runner.git`

2. Install dependencies:

```
cd py-runner
npm install
```

3. Start the development server:

`npm run dev`

## Architecture

The application is built with a component-based architecture focusing on:

- **Modularity**: Each component has a single responsibility
- **Performance**: Optimized rendering and code execution
- **Security**: Sandboxed Python environment
- **Accessibility**: Keyboard navigation and screen reader support
- **Responsiveness**: Adapts to different screen sizes

## Educational Purpose

PyRunner was developed as a portfolio project to demonstrate:

- Modern React development practices
- TypeScript implementation
- WebAssembly integration
- Security considerations in browser-based code execution
- Responsive UI/UX design
- Performance optimization

## Live Demo

Try PyRunner live at: [https://py-runner.net](https://py-runner.net)

## License

MIT License - feel free to use this code for your own projects!

## Author

Andrew James Moore
[GitHub](https://github.com/andrewjamesmoore)
