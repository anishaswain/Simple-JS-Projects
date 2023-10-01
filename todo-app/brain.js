document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const clearBtn = document.getElementById("clearBtn"); // Add this line

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function renderTasks() {
    taskList.innerHTML = "";
    if (tasks.length === 0) {
      const nothingToDo = document.createElement("p");
      nothingToDo.textContent = "Nothing to do :D";
      nothingToDo.className = "text-center";
      taskList.appendChild(nothingToDo);
    }
    tasks.forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.className = "flex items-center justify-between border-b py-2";
      taskItem.innerHTML = `
                <span>${task}</span>
                <button class="text-red-500" data-index="${index}">Delete</button>
            `;
      taskList.appendChild(taskItem);
    });

    const deleteButtons = document.querySelectorAll("button[data-index]");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const index = parseInt(button.getAttribute("data-index"));
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });
    });
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  addTaskBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      tasks.push(taskText);
      saveTasks();
      taskInput.value = "";
      renderTasks();
    }
  });

  clearBtn.addEventListener("click", function () {
    tasks.length = 0; // Clear all tasks
    saveTasks();
    renderTasks();
  });

  renderTasks();
});
