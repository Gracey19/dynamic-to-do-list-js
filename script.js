document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  loadTasks();

  addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    addTask(taskText);
    taskInput.value = '';
  });

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const taskText = taskInput.value.trim();
      addTask(taskText);
      taskInput.value = '';
    }
  });

  function addTask(taskText, save = true) {
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    // Create li and set its textContent directly
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // Remove li from taskList
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      updateLocalStorage();
    };

    // Append button to li, then li to taskList
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Save to localStorage
    if (save) updateLocalStorage();
  }

  function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
      // Extract only the task text (excluding button label)
      const text = li.firstChild.textContent.replace('Remove', '').trim();
      tasks.push(text);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(task => addTask(task, false));
  }
});





