"use strict";
console.log('✅ script.js 실행됨!');
const todoInput = document.getElementById('todo-input');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');
let todos = [];
let doneTasks = [];
function getTodoText() {
    return todoInput.value.trim();
}
function addTodo(text) {
    todos.push({ id: Date.now(), text });
    todoInput.value = '';
    renderTasks();
}
function completeTodo(todo) {
    todos = todos.filter(t => t.id !== todo.id);
    doneTasks.push(todo);
    renderTasks();
}
function deleteTodo(todo) {
    doneTasks = doneTasks.filter(t => t.id !== todo.id);
    renderTasks();
}
function createTodoElement(todo, isDone) {
    const li = document.createElement('li');
    li.classList.add('render-container__item');
    const span = document.createElement('span');
    span.classList.add('render-container__item-text');
    span.textContent = todo.text;
    const button = document.createElement('button');
    button.textContent = isDone ? '삭제' : '완료';
    button.className = isDone ? 'done' : 'complete';
    button.addEventListener('click', () => {
        if (isDone) {
            deleteTodo(todo);
        }
        else {
            completeTodo(todo);
        }
    });
    li.appendChild(span);
    li.appendChild(button);
    return li;
}
function renderTasks() {
    todoList.innerHTML = '';
    doneList.innerHTML = '';
    todos.forEach(todo => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    doneTasks.forEach(todo => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
}
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});
