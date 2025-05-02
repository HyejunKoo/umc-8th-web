// src/components/TodoForm.tsx
import React, { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';

const TodoForm = () => {
  const { addTodo } = useTodoContext();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    addTodo(input.trim());
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-container__form">
      <input
        type="text"
        className="todo-container__input"
        placeholder="할 일 입력"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <button type="submit" className="todo-container__button">할 일 추가</button>
    </form>
  );
};

export default TodoForm;
