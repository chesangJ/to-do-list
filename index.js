const desiredTodoId = 4;

// Function to create a new task
async function createTask(todoTitle) {
  const newTask = {
    userId: desiredTodoId,
    title: todoTitle,
    completed: false
  };

  try {
    const response = await fetch('https://dummyjson.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    });
    const data = await response.json();

    const todoElement1 = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', toggleCompleted);

    const taskTitle = document.createElement('span');
    taskTitle.textContent = data.title;

    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'bx bx-trash';
    deleteIcon.addEventListener('click', deleteTask);

    const iconContainer = document.createElement('span');
    iconContainer.className = 'icon-container';
    iconContainer.appendChild(deleteIcon);

    todoElement1.appendChild(checkbox);
    todoElement1.appendChild(taskTitle);
    todoElement1.appendChild(iconContainer);

    const todoList = document.getElementById('todolist');
    todoList.appendChild(todoElement1);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Function to delete a task
function deleteTask(event) {
  const listItem = event.target.parentNode.parentNode;
  listItem.remove();
}

// Function to toggle completed status of a task
function toggleCompleted(event) {
  const listItem = event.target.parentNode.parentNode;
  listItem.classList.toggle('completed');
}

// Add event listener for the "Add" button
const addButton = document.querySelector('.form button');
addButton.addEventListener('click', () => {
  const inputField = document.querySelector('.form input');
  const taskTitle = inputField.value.trim();
  if (taskTitle !== '') {
    createTask(taskTitle);
    inputField.value = '';
  }
});


//Fetch and display existing tasks
fetch('https://dummyjson.com/todos')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    const todos = data.todos.filter(todo => todo.userId === desiredTodoId);
    if (todos.length > 0) {
      todos.forEach(todo => {
        const todoId = todo.id;
        const todoTitle = todo.todo;

        const todoElement = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', toggleCompleted);

        const taskTitle = document.createElement('span');
        taskTitle.textContent = todoTitle;

        const deleteIcon = document.createElement ('i');
        deleteIcon.className = 'bx bx-trash';
        deleteIcon.addEventListener('click', deleteTask);

        const iconContainer = document.createElement('span');
        iconContainer.className = 'icon-container';
        iconContainer.appendChild(deleteIcon);

        todoElement.appendChild(checkbox);
        todoElement.appendChild(taskTitle);
        todoElement.appendChild(deleteIcon);

        const todoList = document.querySelector('.todolist');
        todoList.appendChild(todoElement);
      });
    } else {
      console.log(`Todo with ${desiredTodoId} not found.`);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });


