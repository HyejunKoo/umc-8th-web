// src/components/TodoItem.tsx
import React from 'react';
import { useTodoContext } from '../context/TodoContext';

type Props = {
  todo: { id: number; text: string };
  isDone: boolean;
};

const TodoItem = ({ todo, isDone }: Props) => {
  const { completeTodo, deleteTodo } = useTodoContext();

  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{todo.text}</span>
      <button
        className={isDone ? 'done' : 'complete'}
        onClick={() => isDone ? deleteTodo(todo) : completeTodo(todo)}
      >
        {isDone ? '삭제' : '완료'}
      </button>
    </li>
  );
};

export default TodoItem;
