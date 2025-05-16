// src/App.tsx
import React from 'react';
import './App.css';
import { TodoProvider } from './context/TodoContext';
// App.tsx
import TodoForm from './components/TodoForm'; 
import TodoList from './components/TodoList';

function App() {
  return (
    <TodoProvider>
      <div className="todo-container">
        <h1 className="todo-container__header">JUNI TODO</h1>
        <TodoForm />
      </div>
      <TodoList />
    </TodoProvider>
  );
}

export default App;
