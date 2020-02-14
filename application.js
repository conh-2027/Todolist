
// Khơi tạo các input, cột todo, doing, done, listTask lưu task trong localstorage 

let newTaskInput = document.getElementById("new-task");
let todo = document.getElementById("todo-task");
let doing = document.getElementById("doing-task");
let done = document.getElementById("done-task");
let description = document.getElementById("description");
let listTasks = localStorage.getItem("task") ? JSON.parse(localStorage.getItem("task")) : [];
var dr = dragula({});

function getDateTime() {}

/*
  Hàm này bắt sự kiên drop element task đến target nào.
  thì  mình sẽ set status cảu task qua các trang thái tương ứng với target đến 
  ví dụ task mới tạo thì status = new -- > doing
  ta sẽ update lại status = in process, color label status, lưu lại local storage. 
*/


dr.on('drop', (el, target, source) => {
  let statusEl = el.children[1];
  taskID = parseInt(el.getAttribute("task_id"));
  task_index = listTasks.findIndex(value => value.taskId === taskID);
  
  type = {'todo-task': 'New', 'doing-task': "In Process", 'done-task': 'Done'}
  color_badge = {'todo-task': 'badge-primary', 'doing-task': 'badge-warning', 'done-task': 'badge-success'}
  statusEl.className = 'badge ' + color_badge[target.id] + ' ' + target.id + " status-task"
  statusEl.innerHTML = type[target.id];
  listTasks[task_index]["status"] =  type[target.id];

  let time = new Date();
  console.log(time);
  listTasks[task_index]["time"] = time.toLocaleDateString();
  listTasks[task_index]["classLabel"] = el.children[1].className
  localStorage.setItem("task", JSON.stringify(listTasks));
});

// Convert element trong class `.project-task-container` array dung vong lặp để push vào container 

$('.project-task-container')
.toArray()
.forEach(function(v){
  dr.containers.push(v)
})

// create elament and add to list task.
function createNewTaskElement(task) {
  element = createTaskElement(task);
  element.children[1].className = 'badge badge-primary status-task';
  return element;
}

/*
  Hàm này create element, add attribute của thẻ html 
  append vào vào html tương ứng . lưu vào  localstorage

*/


function createTaskElement(taskText, taskId = 0, status="New", classStatus= "badge badge-primary status-task", currentTime = (new Date().toLocaleDateString())) {
  let projectTask = document.createElement("div");
  let titleTask = document.createElement("span");
  let controlContainer = document.createElement("div");
  let editbutton = document.createElement("div");
  let deletebutton = document.createElement("div");
  let label = document.createElement("div");
  let timechange = document.createElement("small");
  
  if(taskId === 0){
    taskId = Date.now();
   
    listTasks.push({
      taskId: taskId,
      text: taskText,
      status: status,
      time: currentTime,
      classLabel: classStatus
    });
    localStorage.setItem('task', JSON.stringify(listTasks));
  }

  // set atributes thẻ html 
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
  timechange.innerHTML = currentTime;
  projectTask.setAttribute("task_id", taskId);

  projectTask.appendChild(titleTask);
  projectTask.appendChild(label);
  projectTask.appendChild(controlContainer);
  controlContainer.appendChild(editbutton);
  controlContainer.appendChild(deletebutton);
  projectTask.appendChild(timechange);

  return projectTask;
}


/*
 Hàm init này hiện thị danh sách task theo trang thái task 
 new thì append todo task 
 in process thì append doing task
 done thì append done task
 đồng thời add class tương ứng với status của task 
* */

let initTask = function(){
  $.each(listTasks, function (_, value) {
    console.log(value['text']);
    let task = createTaskElement(value["text"], value["taskId"], value["status"], value["classLabel"], value["time"]);
    switch( value["status"]) {
      case "New": {
        $('.todo-task').addClass('badge-primary status-task');
        todo.appendChild(task);
        break;
      }
      case "In Process": {
        doing.appendChild(task);
        $('.doing-task').addClass('badge-warning status-task');
        break;
      }
      case "Done": {
        done.appendChild(task);
        $('.done-task').addClass('badge-success status-task');
        break;
      }
    }
  });
}

initTask();
delete_task();
edit_task();

/**
 *  Kiểm tra input nếu đúng là null or space thì alert và return false
 *  Nếu input validate thì gọi function create element và append html
 *  set value = "" cho input 
 */

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

/*
*  1. Bắt sự kiện click của button delete qua class 'delete-task'
*  2. get task id 
*  3. dùng filter lọc task đó ra khỏi listTasks
*  4. save lại listTask vào localStorage và remove element
**/

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


/*
* 1. Bặt sự kiện click vào button edit chúng ta sẽ lấy được task_id của task hiện tại
* 2. từ task_id ta truy cập listTask ==> index của task dk lữu trong listTasks --> update content lại localstorage
* 3. Ta tạo input và button submit (add class, append vào html )
* 4. Lấy giá trị hiện tại của task đổ lại vào thẻ input
* 5. khi click vào edit thì ẩn  button delete và  hiển thị button submit . sau khi submit thì hiện thụ lại button  và edit.
*/


function edit_task() {
  $('.edit-task').click(function() {
    $('.submit-edit').remove();
    let parentElementEdit = this.parentElement.parentElement;
    edit_id = parseInt(parentElementEdit.getAttribute('task_id'));
    index_edit = listTasks.findIndex(value => value.taskId === edit_id);
    let value_old =  listTasks[index_edit]['text'];
    let input_edit = document.createElement("input");
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
