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
  taskInput.value = '';
  window.location.reload();
}

let doneBtn = document.querySelectorAll(".status");

doneBtn.forEach((ele) => {
  ele.addEventListener("click", taskStateChange);
});

function taskStateChange(e) {
  let data = getData();
  if (data === null) return;
  let taskId = e.target.parentNode.classList[0];
    let task = data.find(ele => ele.id == taskId);

    if (task) {
        task.completed = !task.completed;
        setData(data);
        renderTasks();  // Re-render tasks to update the display
    }
}

function renderTasks() {
  taskList.innerHTML = ''
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
console.log(deleteBtn)

function deleteTask(e) {
  let data = getData();
  if (data === null) return;
  for (let i = 0; i < data.length; i++)
    if (data[i].id == e.target.parentNode.classList[0]) data.splice(i, 1);
  let ID = 1;
  data.forEach((ele) => {
    ele.id = ID++;
  });
  setData(data);
  renderTasks()
}

function showTask(ele) {
  let newTask = document.createElement("li");
  let Task = document.createElement("span");
  let taskDone = document.createElement("button");
  let Delete = document.createElement("button");
  taskDone.innerText = ele.completed ? "Not Done" : "Done";
  taskDone.setAttribute("class", `status ${ele.id}`);
  newTask.setAttribute("class", `${ele.id}`);
  Delete.setAttribute("class", "delete");
  Delete.innerText = "Delete";
  Task.innerHTML = !ele.completed
    ? ele.name
    : `<s style="background-color:lightgreen; color: black;">${ele.name}</s>`;

  newTask.append(Task);
  newTask.append(taskDone);
  newTask.append(Delete);
  taskList.append(newTask);

  taskDone.addEventListener("click", taskStateChange);
  Delete.addEventListener("click", deleteTask);
}

function getData() {
  if (localStorage.key(0) == "data")
    return JSON.parse(localStorage.getItem("data"));
  else return null;
}

function setData(data) {
  localStorage.setItem("data", JSON.stringify(data));
}
