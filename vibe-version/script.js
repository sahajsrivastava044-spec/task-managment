let tasks = [];
let filter = "all";
const STORAGE_KEY = "vibeTaskManagerData";

function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      tasks = JSON.parse(saved);
    } catch (err) {
      tasks = [];
    }
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;

  tasks.push({
    text,
    completed: false,
    createdAt: new Date().toISOString(),
    id: Date.now() + Math.random(),
  });

  input.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
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

  if (filtered.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No tasks in this view.";
    empty.style.color = "#777";
    list.appendChild(empty);
    return;
  }

  filtered.forEach(task => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.justifyContent = "space-between";
    li.style.padding = "4px 0";

    const textSpan = document.createElement("span");
    textSpan.textContent = task.text;
    textSpan.style.textDecoration = task.completed ? "line-through" : "none";
    textSpan.style.cursor = "pointer";
    textSpan.title = "Click to toggle completed";
    textSpan.onclick = () => toggleTask(task.id);

    const actions = document.createElement("div");

    const dateSpan = document.createElement("small");
    dateSpan.textContent = new Date(task.createdAt).toLocaleString();
    dateSpan.style.marginRight = "10px";
    dateSpan.style.color = "#555";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = e => {
      e.stopPropagation();
      deleteTask(task.id);
    };

    actions.appendChild(dateSpan);
    actions.appendChild(deleteBtn);

    li.appendChild(textSpan);
    li.appendChild(actions);

    list.appendChild(li);
  });
}

window.onload = () => {
  loadTasks();
  renderTasks();
};
