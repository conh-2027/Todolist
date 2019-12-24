var dr = dragula({})

dr.on('drag', (evt) => {
  evt.classList.add('rotateOnDrag');
});

dr.on('dragend', (evt) => {
  evt.classList.remove('rotateOnDrag');
});

$('.project-task-container')
  .toArray()
  .forEach(function(v){
    dr.containers.push(v)
  })

$('.tiny-editor').change(function(){
  // const dom = $('.tiny-editor')
  // let val = dom.val()
  // dom.val(markdown.toHTML(val))
})

// var popper = new Popper($('#submit')[0], {
// 		content: 'submit'	
// 	}, {
// 			placement: 'left'
// 	});

let btnAdd = document.querySelector('.add');
let newTaskInput = document.getElementById("new-task");
let todo = document.getElementById("todo-task");
let remove = document.querySelector('.draggable');
let listTasks  = [];

let createNewTaskHtml = function(task) {
  let projectTask = document.createElement("div");
  let titleTask = document.createElement("span");
  let controlContainer = document.createElement("div");
  let editbutton = document.createElement("div");
  let submitbutton = document.createElement("div");
  let deletebutton = document.createElement("div");
  let taskId = Date.now();

  projectTask.className = "project-task";
  titleTask.className = "task-title";
  controlContainer.className = "control-container";
  editbutton.className = "control-circle";
  submitbutton.className = "control-circle"
  deletebutton.className = "control-circle";
  
  editbutton.id = "edit";
  deletebutton.id = "delete";
  submitbutton.id = "submit";

  titleTask.innerHTML = task
  projectTask.setAttribute("task_id", taskId);

  projectTask.appendChild(titleTask);
  projectTask.appendChild(controlContainer);
  controlContainer.appendChild(editbutton);
  controlContainer.appendChild(deletebutton);
  controlContainer.appendChild(submitbutton);
  todo.appendChild(projectTask);
}

let initTask = function(){
  listTasks = localStorage.getItem("task") ? JSON.parse(localStorage.getItem("task")) : [];
  listTasks.forEach(item => createNewTaskHtml(item['text']));
}

initTask();

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

function createNewTaskElement(task) {
  let projectTask = document.createElement("div");
  let titleTask = document.createElement("span");
  let controlContainer = document.createElement("div");
  let editbutton = document.createElement("div");
  let submitbutton = document.createElement("div");
  let deletebutton = document.createElement("div");
  let taskId = Date.now();

  projectTask.className = "project-task";
  titleTask.className = "task-title";
  controlContainer.className = "control-container";
  editbutton.className = "control-circle";
  submitbutton.className = "control-circle"
  deletebutton.className = "control-circle";
  
  editbutton.id = "edit";
  deletebutton.id = "delete";
  submitbutton.id = "submit";

  titleTask.innerHTML = task
  projectTask.setAttribute("task_id", taskId);

  projectTask.appendChild(titleTask);
  projectTask.appendChild(controlContainer);
  controlContainer.appendChild(editbutton);
  controlContainer.appendChild(deletebutton);
  controlContainer.appendChild(submitbutton);
  listTasks.push({
    taskId: taskId,
    text: task,
  })

  return projectTask;
}


let addTask = function() {
  if (!newTaskInput.value.length || !newTaskInput.value.trim().length){
    alert("Name task can't null, please enter name task!");
    return false;
  }
  localStorage.setItem('task', JSON.stringify(listTasks));

  let task = createNewTaskElement(newTaskInput.value);
  todo.prepend(task);
  newTaskInput.value = "";
  return true;
}

btnAdd.addEventListener("click", addTask);