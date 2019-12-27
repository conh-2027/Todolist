var dr = dragula({})

dr.on('drag', (evt) => {
  evt.classList.add('rotateOnDrag');
  console.log("drag");
});

dr.on('dragend', (evt) => {
  evt.classList.remove('rotateOnDrag');
  console.log("dragend");
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


// init element.
let btnAdd = document.querySelector('.add');
let newTaskInput = document.getElementById("new-task");
let todo = document.getElementById("todo-task");
let listTasks = localStorage.getItem("task") ? JSON.parse(localStorage.getItem("task")) : [];

// create elament and add to list task.
function createNewTaskElement(task) {
  return createTaskElement(task);
}

function createTaskElement(taskText, taskId = 0) {
  let projectTask = document.createElement("div");
  let titleTask = document.createElement("span");
  let controlContainer = document.createElement("div");
  let editbutton = document.createElement("div");
  let deletebutton = document.createElement("div");
  
  if(taskId === 0){
    taskId = Date.now();

    listTasks.push({
      taskId: taskId,
      text: taskText,
    });
    localStorage.setItem('task', JSON.stringify(listTasks));
  }

  projectTask.className = "project-task";
  titleTask.className = "task-title";
  controlContainer.className = "control-container";
  editbutton.className = "btn btn-warning btn-sm mr-2 edit-task";
  deletebutton.className = "btn btn-danger btn-sm delete-task";
  
  editbutton.class = "edit";
  deletebutton.class = "delete";

  editbutton.innerHTML = "edit";
  deletebutton.innerHTML = "delete";
  titleTask.innerHTML = taskText
  projectTask.setAttribute("task_id", taskId);

  projectTask.appendChild(titleTask);
  projectTask.appendChild(controlContainer);
  controlContainer.appendChild(editbutton);
  controlContainer.appendChild(deletebutton);

  return projectTask;
}

let initTask = function(){
  $.each(listTasks, function (_, value) {
    console.log(value['text']);
    let task = createTaskElement(value['text'], value['taskId']);
    todo.appendChild(task);
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

let addTask = function() {
  if (!newTaskInput.value.length || !newTaskInput.value.trim().length){
    alert("Name task can't null, please enter name task!");
    return false;
  }

  let task = createNewTaskElement(newTaskInput.value);
  todo.append(task);
  newTaskInput.value = "";
  delete_task();
  edit_task();
  return true;
}

btnAdd.addEventListener("click", addTask);

function delete_task() {
  $(".delete-task").click(function() {
    delete_id = parseInt(this.parentElement.parentElement.getAttribute('task_id'));
    listTasks = listTasks.filter(value => value['taskId'] !== delete_id);
    localStorage.setItem('task', JSON.stringify(listTasks));
    this.parentElement.parentElement.remove();
  });
}

function submit_update(){
  $('.submit-edit').click(function() {
    let parent_element = this.parentElement.parentElement;
    let value_text = parent_element.children[0].value;
    edit_id = parseInt(parent_element.getAttribute('task_id'));
    index_edit = listTasks.findIndex(value => value.taskId === edit_id);
    listTasks[index_edit]['text'] = value_text;
    localStorage.setItem('task', JSON.stringify(listTasks));
    parent_element.children[0].remove();
    span_element = document.createElement('span');
    span_element.className = 'task-title';
    span_element.innerHTML = value_text;
    parent_element.prepend(span_element);
    $('.submit-edit').remove();
  });
}

function edit_task() {
  $('.edit-task').click(function() {

    let parentElementEdit = this.parentElement.parentElement;
    let value_old = parentElementEdit.children[0].textContent;
    let input_edit = document.createElement("input");
    let submit_edit = document.createElement("div");
    
    input_edit.className = 'form-control edit-text'
    input_edit.name = 'edit-text'
    input_edit.value = value_old;
    submit_edit.className = 'btn btn-success btn-sm mr-2 ml-2 submit-edit'
    submit_edit.innerHTML = 'submit'
    parentElementEdit.prepend(input_edit);
    parentElementEdit.children[2].prepend(submit_edit);
    parentElementEdit.children[1].remove();
    
    submit_update();
  });
}
