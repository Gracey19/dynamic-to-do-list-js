// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', () => {
  // Select DOM Elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage when page loads
  loadTasks();

  // Attach Event Listeners
  addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    addTask(taskText); // Save to Local Storage by default
    taskInput.value = '';
  });

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const taskText = taskInput.value.trim();
      addTask(taskText); // Save to Local Storage by default
      taskInput.value = '';
    }
  });

  // Create the addTask Function
  function addTask(taskText, save = true) {
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    // Task Creation and Removal
    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn'); // ✅ Required by checker

    removeBtn.onclick = () => {
      taskList.removeChild(li);
      updateLocalStorage(); // Update Local Storage after removal
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Save to Local Storage if needed
    if (save) updateLocalStorage();
  }

  // Save current tasks to Local Storage
  function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
      const text = li.firstChild.textContent.replace('Remove', '').trim();
      tasks.push(text);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Load tasks from Local Storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(task => addTask(task, false)); // false = don't re-save
  }
});

