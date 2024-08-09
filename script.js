let taskInput = document.getElementById("task");
const btn = document.querySelector(".submit");
let taskList = document.getElementById("task-list");

btn.addEventListener("click", addTask);
if (getData() !== null) renderTasks();
else console.log("Add Some Tasks");

function addTask() {
  let taskInfo = {
    name: taskInput.value,
    completed: false,
  };
  if (getData() !== null) {
    let data = getData();
    taskInfo.id = data.length + 1;
    data.push(taskInfo);
    setData(data);
  } else {
    let data = [];
    taskInfo.id = 1;
    data.push(taskInfo);
    setData(data);
  }
  console.log(taskInfo);
  renderTasks();
  taskInput.value = "";
}

let doneBtn = document.querySelectorAll(".status");

doneBtn.forEach((ele) => {
  ele.addEventListener("click", taskStateChange);
});

function taskStateChange(e) {
  let data = getData();
  if (data === null) return;
  let taskId = e.target.parentNode.parentNode.classList[0];
  console.log(taskId);
  let task = data.find((ele) => ele.id == taskId);

  if (task) {
    task.completed = !task.completed;
    setData(data);
    renderTasks();
  }
}

function renderTasks() {
  taskList.innerHTML = "";
  let data = getData();
  if (data === null) return;
  console.log(data);
  data.forEach((ele) => {
    showTask(ele);
  });
}

let deleteBtn = document.querySelectorAll(".delete");
deleteBtn.forEach((ele) => {
  ele.addEventListener("click", deleteTask);
});

function deleteTask(e) {
  let data = getData();
  if (data === null) return;
  for (let i = 0; i < data.length; i++)
    if (data[i].id == e.target.parentNode.parentNode.classList[0])
      data.splice(i, 1);
  let ID = 1;
  data.forEach((ele) => {
    ele.id = ID++;
  });
  setData(data);
  renderTasks();
}

function showTask(ele) {
  let newTask = document.createElement("tr");

  let TaskName = document.createElement("td");
  let Task = document.createElement("span");

  let StateBtn = document.createElement("td");
  let taskDone = document.createElement("button");

  let Del = document.createElement("td");
  let Delete = document.createElement("button");

  taskDone.innerText = ele.completed ? "Not Done" : "Done";
  taskDone.setAttribute("class", `status`);
  newTask.setAttribute("class", `${ele.id}`);
  Delete.setAttribute("class", "delete");
  Delete.innerText = "Delete";
  Task.innerHTML = !ele.completed
    ? ele.name
    : `<s style="background-color:lightgreen; color: black;">${ele.name}</s>`;

  TaskName.append(Task);
  StateBtn.append(taskDone);
  Del.append(Delete);

  newTask.append(TaskName);
  newTask.append(StateBtn);
  newTask.append(Del);
  taskList.append(newTask);
  console.log(taskList);

  taskDone.addEventListener("click", taskStateChange);
  Delete.addEventListener("click", deleteTask);
}

function getData() {
  return JSON.parse(localStorage.getItem("data")) || null;
}

function setData(data) {
  localStorage.setItem("data", JSON.stringify(data));
}
