// src/context/TodoContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Todo = {
  id: number;
  text: string;
};

type TodoContextType = {
  todos: Todo[];
  doneTasks: Todo[];
  addTodo: (text: string) => void;
  completeTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [doneTasks, setDoneTasks] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo = { id: Date.now(), text };
    console.log('추가된 할 일:', newTodo);  // 콘솔로 확인
    setTodos([...todos, newTodo]);
  };
  

  const completeTodo = (todo: Todo) => {
    setTodos(todos.filter(t => t.id !== todo.id));
    setDoneTasks([...doneTasks, todo]);
  };

  const deleteTodo = (todo: Todo) => {
    setDoneTasks(doneTasks.filter(t => t.id !== todo.id));
  };

  return (
    <TodoContext.Provider value={{ todos, doneTasks, addTodo, completeTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodoContext must be used within TodoProvider');
  return context;
};
