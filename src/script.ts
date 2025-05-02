'use strict';

// DOM 요소 선택
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

// 할 일 데이터 타입
type Todo = {
  id: number; // 고유 식별자
  text: string; // 할 일 텍스트
};

// 상태 관리 배열들
let todos: Todo[] = []; // 현재 할 일 목록
let doneTasks: Todo[] = []; // 완료된 할 일 목록

// 입력 필드에서 텍스트 가져오기
function getTodoText(): string {
  return todoInput.value.trim();
}

// 새 할 일 추가 함수
function addTodo(text: string): void {
  todos.push({ id: Date.now(), text }); // 고유 id와 함께 추가
  todoInput.value = ''; // 입력 필드 초기화
  renderTasks(); // UI 다시 렌더링
}

// 할 일 완료 처리 → doneTasks로 이동
function completeTodo(todo: Todo): void {
  todos = todos.filter(t => t.id !== todo.id); // 원래 배열에서 제거
  doneTasks.push(todo); // 완료 배열에 추가
  renderTasks();
}

// 완료된 할 일을 삭제
function deleteTodo(todo: Todo): void {
  doneTasks = doneTasks.filter(t => t.id !== todo.id); // 완료 배열에서 제거
  renderTasks();
}

// 각 할 일 항목을 HTML 요소로 생성
function createTodoElement(todo: Todo, isDone: boolean): HTMLLIElement {
  const li = document.createElement('li');
  li.classList.add('render-container__item');

  const span = document.createElement('span');
  span.classList.add('render-container__item-text');
  span.textContent = todo.text;

  const button = document.createElement('button');
  button.textContent = isDone ? '삭제' : '완료';
  button.className = isDone ? 'done' : 'complete';

  // 버튼 클릭 이벤트 처리
  button.addEventListener('click', () => {
    if (isDone) {
      deleteTodo(todo);
    } else {
      completeTodo(todo);
    }
  });

  li.appendChild(span);
  li.appendChild(button);

  return li;
}

// 전체 할 일/완료 목록 렌더링
function renderTasks(): void {
  todoList.innerHTML = ''; // 기존 항목 제거 후 새로 그림
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

// 폼 제출 이벤트: 할 일 추가 처리
// (엔터 키 또는 버튼 클릭 시 동작)
todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault(); // 새로고침 방지
  const text = getTodoText();
  if (text) {
    addTodo(text);
  }
});
