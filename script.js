let taskInput = document.getElementById("task");
const btn = document.querySelector(".submit");
let taskList = document.getElementById("task-list");

btn.addEventListener("click", addTask);
if (getData() !== null) renderTasks();
else alert("Add Some Tasks");

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
  showTask(taskInfo);
  window.location.reload()
}

let doneBtn = document.querySelectorAll(".status");

doneBtn.forEach((ele) => {
  ele.addEventListener("click", taskDone);
});

function taskDone(e) {
  let data = getData();
  if (data === null) return;
  let task = e.target.parentNode.firstChild;
  let taskStatus;
  data.map((ele) => {
    if (ele.id == e.target.parentNode.classList[0]) {
      ele.completed = !ele.completed;
      taskStatus = ele.completed;
    }
  });

  doneBtn.innerHTML = taskStatus ? "Not Done" : "Done";
  task.innerHTML = taskStatus ? `<s style="background-color:lightgreen; color: black;">${task.innerText}</s>` : task.innerText;
  console.log(data);
  setData(data);
  window.location.reload()
}

function renderTasks() {
  let data = getData();
  if (data === null) return;
  console.log(data);
  data.forEach((ele) => {
    showTask(ele);
  });
}

function showTask(ele) {
  let newTask = document.createElement("li");
  let Task = document.createElement("span");
  let taskDone = document.createElement("button");
  taskDone.innerText = ele.completed ? "Not Done" : "Done";
  taskDone.setAttribute("class", `status ${ele.id}`);
  newTask.setAttribute("class", `${ele.id}`);
  Task.innerHTML = !ele.completed ? ele.name : `<s style="background-color:lightgreen; color: black;">${ele.name}</s>`;

  newTask.append(Task);
  newTask.append(taskDone);
  taskList.append(newTask);
}

function getData() {
  if (localStorage.key(0) == "data")
    return JSON.parse(localStorage.getItem("data"));
  else return null;
}

function setData(data) {
  localStorage.setItem("data", JSON.stringify(data));
}
