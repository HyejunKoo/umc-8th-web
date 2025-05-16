// src/components/TodoList.tsx
import React from 'react';
import { useTodoContext } from '../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos, doneTasks } = useTodoContext();

  return (
    <div className="render-container">
      <div className="render-container__section">
        <h2 className="render-container__title">할 일</h2>
        <ul className="render-container__list">
          {todos.map(todo => <TodoItem key={todo.id} todo={todo} isDone={false} />)}
        </ul>
      </div>
      <div className="render-container__section">
        <h2 className="render-container__title">완료</h2>
        <ul className="render-container__list">
          {doneTasks.map(todo => <TodoItem key={todo.id} todo={todo} isDone={true} />)}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
