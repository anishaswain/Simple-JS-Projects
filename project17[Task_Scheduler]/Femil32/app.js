const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

addTaskButton.addEventListener("click", () => {
  const task = taskInput.value;
  const priority = priorityInput.value;
  const deadline = deadlineInput.value;
  if (task.trim() === "") {
    alert("Please enter task title.");
    return; // Don't add task if task or deadline is empty
  } else if (deadline.trim() === "") {
    alert("Please enter deadline.");
    return; // Don't add task if task or deadline is empty
  }

  const selectedDate = new Date(deadline);
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    alert("Please select an upcoming date for the deadline.");
    return; // Don't add task if deadline is not in the future
  }

  const taskItem = document.createElement("div");
  taskItem.classList.add(...["task", "pending"]);
  taskItem.innerHTML = `
	<p class='task-title'>${task}</p>
	<p class='task-priority'>Priority: ${priority}</p>
	<p class='task-deadline'>Deadline: ${deadline}</p>
	<button class="mark-done">Mark Done</button>
`;

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ task, priority, deadline, status: "pending" });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskList.appendChild(taskItem);

  taskInput.value = "";
  priorityInput.value = "top";
  deadlineInput.value = "";
});

taskList.addEventListener("click", (event) => {
  if (event.target.classList.contains("mark-done")) {
    const taskItem = event.target.parentElement;
    if (taskItem.classList.contains("done")) {
      taskItem.classList.remove("done");
      taskItem.classList.add("pending");
    } else if (taskItem.classList.contains("pending")) {
      taskItem.classList.remove("pending");
      taskItem.classList.add("done");
    }

    const taskTitle = taskItem.querySelector(".task-title").textContent;

    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const task = tasks.find((t) => t.task === taskTitle);
    task.status = task.status === "pending" ? "done" : "pending";
    tasks.forEach((t) => {
      if (t.task === taskTitle) {
        t.status = task.status;
      }
    });
    console.log(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // removeSingleTaskFromLocalStorage(taskTitle);
  }
});

const getDataFromLocalStorage = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach((task) => {
      const taskItem = document.createElement("div");
      const status = task.status;
      taskItem.classList.add(...["task", status]);
      taskItem.innerHTML = `
      <p class='task-title'>${task.task}</p>
	    <p class='task-priority'>Priority: ${task.priority}</p>
      <p class='task-deadline'>Deadline: ${task.deadline}</p>
      <button class="mark-done">Mark Done</button>
    `;

      taskList.appendChild(taskItem);
    });
  }
};

const removeDataFromLocalStorage = () => {
  localStorage.removeItem("tasks");
};

const removeSingleTaskFromLocalStorage = (task) => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const filteredTasks = tasks.filter((t) => t.task !== task);
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  window.location.reload();
};

getDataFromLocalStorage();
