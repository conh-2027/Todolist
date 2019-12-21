let btn = document.querySelector('.add');
let remove = document.querySelector('.draggable');
let listTasks = [];

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

// function dragStart(e) {
//   console.log("dragStart");
//   this.style.opacity = '0.4';
//   dragSrcEl = this;
//   e.dataTransfer.effectAllowed = 'move';
//   e.dataTransfer.setData('text/html', this.innerHTML);
// }

// function dragEnter(e) {
//   console.log("dragEnd");
//   this.classList.add('over');
// }

// function dragLeave(e) {
//   console.log("dragLeave");
//   e.stopPropagation();
//   this.classList.remove('over');
// }

// function dragOver(e) {
//   console.log("dragOver");
//   e.preventDefault();
//   e.dataTransfer.dropEffect = 'move';
//   return false;
// }

// function dragDrop(e) {
//   console.log("dragDrop");
//   if (dragSrcEl != this) {
//     dragSrcEl.innerHTML = this.innerHTML;
//     this.innerHTML = e.dataTransfer.getData('text/html');
//   }
//   return false;
// }

// function dragEnd(e) {
//   console.log("dragEnd");
//   let listItens = document.querySelectorAll('.draggable');
//   [].forEach.call(listItens, function(item) {
//     item.classList.remove('over');
//   });
//   this.style.opacity = '1';
// }


// function addEventsDragAndDrop(el) {
//   el.addEventListener('dragstart', dragStart, false);
//   console.log(el);
//   console.log(el.addEventListener('dragstart', dragStart, false));
//   el.addEventListener('dragenter', dragEnter, false);
//   el.addEventListener('dragover', dragOver, false);
//   el.addEventListener('dragleave', dragLeave, false);
//   el.addEventListener('drop', dragDrop, false);
//   el.addEventListener('dragend', dragEnd, false);
// }

// let listItens = document.querySelectorAll('.draggable');
// [].forEach.call(listItens, function(item) {
//   console.log(listItens)
//   addEventsDragAndDrop(item);
// });

//  add event for element
function addEventsDragAndDrop(el) {
  el.addEventListener('dragstart', function(event){
    drag(event);
    console.log(event);
  });
}
/*

*/
function addNewItem() {
  let newItem = document.querySelector('.input').value;
  if (newItem != '') {
    document.querySelector('.input').value = '';
    let li = document.createElement('li');
    let attr = document.createAttribute('draggable');
    let ul = document.querySelector('ul');
    let editInput = document.createElement("input");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    listTasks.appendChild(li)
    li.className = 'draggable';
    attr.value = 'true';
    li.setAttributeNode(attr);
    li.setAttribute('id', new Date().getTime());
    li.appendChild(document.createTextNode(newItem));
    ul.appendChild(li);
    addEventsDragAndDrop(li);
    localStorage.setItem('id', JSON.stringify(listTasks))
    console.log(listTasks);
  }
}

btn.addEventListener('click', addNewItem);

