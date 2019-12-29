let btnAdd = document.querySelector('add');
let newTaskInput = document.getElementById("new-task");
let todo = document.getElementById("todo-task");
let doing = document.getElementById("doing-task");
let done = document.getElementById("done-task");
let description = document.getElementById("description");
let listTasks = localStorage.getItem("task") ? JSON.parse(localStorage.getItem("task")) : [];
var dr = dragula({})

dr.on('drag', (evt) => {
  evt.classList.add('rotateOnDrag');
  console.log("drag");
});

dr.on('dragend', (evt) => {
  evt.classList.remove('rotateOnDrag');
  console.log("dragend");
});

dr.on('drop', (el, target, source) => {
  let statusEl = el.children[1];
  taskID = parseInt(el.getAttribute("task_id"));
  task_index = listTasks.findIndex(value => value.taskId === taskID);
  
  type = {'todo-task': 'New', 'doing-task': "In Process", 'done-task': 'Done'}
  color_badge = {'todo-task': 'badge-warning', 'doing-task': 'badge-primary', 'done-task': 'badge-success'}
  statusEl.className = 'badge ' + color_badge[target.id] + ' ' + target.id
  statusEl.innerHTML = type[target.id];
  listTasks[task_index]["status"] =  type[target.id];

  let time = new Date();
  listTasks[task_index]["time"] = time.toLocaleString() + " edited";
  listTasks[task_index]["classLabel"] = el.children[1].className
  localStorage.setItem("task", JSON.stringify(listTasks));
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

// create elament and add to list task.
function createNewTaskElement(task) {
  return createTaskElement(task);
}


function createTaskElement(taskText, taskId = 0, status="New", classStatus= "badge status-task", currentTime = new Date()) {
  let projectTask = document.createElement("div");
  let titleTask = document.createElement("span");
  let controlContainer = document.createElement("div");
  let editbutton = document.createElement("div");
  let deletebutton = document.createElement("div");
  let label = document.createElement("div");
  let timechange = document.createElement("small");

  let time = currentTime;
  if(taskId === 0){
    taskId = Date.now();
   
    listTasks.push({
      taskId: taskId,
      text: taskText,
      status: status,
      time: time,
      classLabel: classStatus
    });
    localStorage.setItem('task', JSON.stringify(listTasks));
  }

  projectTask.className = "project-task";
  titleTask.className = "task-title";
  controlContainer.className = "control-container";
  editbutton.className = "btn btn-warning btn-sm mr-2 edit-task";
  deletebutton.className = "btn btn-danger btn-sm delete-task";
  label.className = classStatus;
  label.innerHTML = status;
  editbutton.class = "edit";
  deletebutton.class = "delete";
  timechange.className = "badge time"
  editbutton.innerHTML = "edit";
  deletebutton.innerHTML = "delete";
  titleTask.innerHTML = taskText;
  timechange.innerHTML = time.toLocaleString();
  projectTask.setAttribute("task_id", taskId);

  projectTask.appendChild(titleTask);
  projectTask.appendChild(label);
  projectTask.appendChild(controlContainer);
  controlContainer.appendChild(editbutton);
  controlContainer.appendChild(deletebutton);
  projectTask.appendChild(timechange);

  return projectTask;
}

let initTask = function(){
  $.each(listTasks, function (_, value) {
    console.log(value['text']);
    let task = createTaskElement(value["text"], value["taskId"], value["status"], value["classLabel"], value["time"]);
    switch( value["status"]) {
      case "New": {
        $('.todo-task').addClass('badge-warning');
        todo.appendChild(task);
        break;
      }
      case "In Process": {
        doing.appendChild(task);
        $('.doing-task').addClass('badge-primary');
        break;
      }
      case "Done": {
        done.appendChild(task);
        $('.done-task').addClass('badge-success');
        break;
      }
    }
    localStorage.setItem("task", JSON.stringify(listTasks));
  });
}

initTask();
delete_task();
edit_task();

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


// let addTask = function() {
//   if (!newTaskInput.value.length || !newTaskInput.value.trim().length){
//     alert("Name task can't null, please enter name task!");
//     return false;
//   }
//   let task = createNewTaskElement(newTaskInput.value);

//   todo.append(task);
//   description.value = "";

//   delete_task();
//   edit_task();
//   return true;
// }

$("#myModal").on("click", "#submit", function(e){

  if (!description.value.length || !description.value.trim().length){
    alert("Name task can't null, please enter name task!");
    return false;
  }

  let task = createNewTaskElement(description.value);
  todo.append(task);

  description.value = "";
  delete_task();
  edit_task();
  $("#myModal").modal("toggle");

  return true;
})

// btnAdd.addEventListener("click", addTask);

function delete_task() {
  $(".delete-task").click(function() {
    delete_id = parseInt(this.parentElement.parentElement.getAttribute('task_id'));
    listTasks = listTasks.filter(value => value['taskId'] !== delete_id);
    localStorage.setItem('task', JSON.stringify(listTasks));
    this.parentElement.parentElement.remove();
  });
}

function submit_update( parent_element, index_edit, edit_display, delete_display){
  $('.submit-edit').click(function() {
    let value_text = parent_element.children[0].value;
    listTasks[index_edit]['text'] = value_text;
    localStorage.setItem('task', JSON.stringify(listTasks));
    parent_element.children[0].remove();
    span_element = document.createElement('span');
    span_element.className = 'task-title';
    span_element.innerHTML = value_text;
    parent_element.prepend(span_element);
    edit_display.style.display = "inline-block";
    delete_display.style.display = "inline-block";
    $('.submit-edit').remove();
  });
}

function edit_task() {
  $('.edit-task').click(function() {
    $('.submit-edit').remove();
    let parentElementEdit = this.parentElement.parentElement;
    edit_id = parseInt(parentElementEdit.getAttribute('task_id'));
    index_edit = listTasks.findIndex(value => value.taskId === edit_id);
    let value_old =  listTasks[index_edit]['text'];
    let input_edit = document.createElement("textarea");
    let submit_edit = document.createElement("div");
    
    input_edit.className = 'form-control edit-text'
    input_edit.name = 'edit-text'
    input_edit.value = value_old;
    submit_edit.className = 'btn btn-success btn-sm mr-2 ml-2 submit-edit'
    submit_edit.innerHTML = 'submit'
    parentElementEdit.prepend(input_edit);
    parentElementEdit.children[3].append(submit_edit);
    parentElementEdit.children[1].remove();
    edit_display = this;
    delete_display = this.parentNode.children[1]
    delete_display.style.display = "none"
    this.style.display = "none";
    submit_update(parentElementEdit, index_edit, edit_display, delete_display);
  });
}
