document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from localStorage
  loadTasks();

  // Add task on button click
  addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    addTask(taskText);
    taskInput.value = '';
  });

  // Add task on Enter key
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const taskText = taskInput.value.trim();
      addTask(taskText);
      taskInput.value = '';
    }
  });

  // Add a new task to the list
  function addTask(taskText, save = true) {
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    // Create list item
    const li = document.createElement('li');

    // Create span to hold task text
    const span = document.createElement('span');
    span.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // Remove task from DOM and localStorage
    removeBtn.onclick = () => {
      li.remove();
      updateLocalStorage();
    };

    // Append elements
    li.appendChild(span);
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Save to localStorage
    if (save) updateLocalStorage();
  }

  // Save all tasks to localStorage
  function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#task-list li span').forEach(span => {
      tasks.push(span.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Load tasks from localStorage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(task => addTask(task, false));
  }
});



