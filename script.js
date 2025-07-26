let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const modeSwitch = document.getElementById('modeSwitch');

// Set saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.classList.add(savedTheme);
modeSwitch.checked = savedTheme === 'dark';

// Theme toggle
modeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
  const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = task;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit';
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete';
    deleteBtn.onclick = () => deleteTask(index);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const newTask = taskInput.value.trim();
  if (newTask) {
    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
  } else {
    alert('Please enter a task.');
  }
}

function editTask(index) {
  const updated = prompt('Edit task:', tasks[index]);
  if (updated && updated.trim() !== '') {
    tasks[index] = updated.trim();
    renderTasks();
  }
}

function deleteTask(index) {
  if (confirm('Delete this task?')) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

renderTasks();