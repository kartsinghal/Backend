const fs = require("fs");
const path = require("path");

const TODO_FILE = path.join(__dirname, "todo.json");

function readTodos() {
  const data = fs.readFileSync(TODO_FILE, "utf-8");
  return JSON.parse(data);
}

function writeTodos(todos) {
  fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));
}

function addTodo(task) {
  const todos = readTodos();

  const todo = {
    id: Date.now(),
    task: task,
    done: false
  };

  todos.push(todo);
  writeTodos(todos);

  console.log("Todo added");
}

function listTodos() {
  const todos = readTodos();

  if (todos.length === 0) {
    console.log("No todos");
    return;
  }

  todos.forEach((t, i) => {
    const status = t.done ? "Done" : "Not done";
    console.log(`${i + 1}. ${t.task} - ${status}`);
  });
}

function markDone(id) {
  const todos = readTodos();

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].done = true;
      writeTodos(todos);
      console.log("Todo marked done");
      return;
    }
  }

  console.log("Todo not found");
}

function deleteTodo(id) {
  const todos = readTodos();
  const newTodos = [];

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id !== id) {
      newTodos.push(todos[i]);
    }
  }

  writeTodos(newTodos);
  console.log("Todo deleted");
}

addTodo("NODEEEE");
listTodos();

