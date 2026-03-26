let tasks = [];
let filter = "all";

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  input.value = "";
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function filterTasks(type) {
  filter = type;
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let filtered = tasks;

  if (filter === "active") {
    filtered = tasks.filter(t => !t.completed);
  } else if (filter === "completed") {
    filtered = tasks.filter(t => t.completed);
  }

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.style.textDecoration = task.completed ? "line-through" : "none";
    li.onclick = () => toggleTask(index);
    list.appendChild(li);
  });
}
