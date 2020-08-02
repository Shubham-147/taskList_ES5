const form = document.querySelector("#task-form")
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

//activate Event Listners
activateEventListners()

function activateEventListners() {
  //calling DOM Content Event
  document.addEventListener('DOMContentLoaded',getTask)
  //calling addtask function on submit              
  form.addEventListener('submit',addTask)
  //remove task from remove list
  taskList.addEventListener('click',removeTask)
  //clear taskList
  clearBtn.addEventListener('click', clearTask)
  //filtertasks Event
  filter.addEventListener('keyup',filterTasks)
}

function getTask(){
  let tasks;
  if(localStorage.getItem('tasks') == null) {
    tasks = []
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task){
    createListItem(task)
  })
  
}

function createListItem(val) {
  const li = document.createElement('li')
  li.className="collection-item"
  li.appendChild(document.createTextNode(val))
  const link =document.createElement('a')
  link.className="delete-item secondary-content"
  link.innerHTML="<i class='fa fa-remove'></i>"
  li.appendChild(link)
  taskList.appendChild(li)
  return li
}

function addTask(event) {
  event.preventDefault()
  if(taskInput.value === '') {
    alert('Enter Something')
    return;
  }
  createListItem(taskInput.value)

  //store task in Local
  storeTask(taskInput.value)
  taskInput.value=''

}

function storeTask(task) {
  let tasks
  if(localStorage.getItem('tasks') == null) {
    tasks = []
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks))

}

function removeTask(e) {
  let event = e.target.parentElement;
  if(event.classList.contains('delete-item'))
    event.parentElement.remove()
    removeTaskFromLocal(event.parentElement);
}

function removeTaskFromLocal(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') == null) {
    tasks = []
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(function(task,index){
    if(taskItem.textContent === task) {
      tasks.splice(index,1)
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function clearTask(event) {
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }
  localStorage.clear()
}

function filterTasks(event) {
  const text= event.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent
    if(item.toLowerCase().indexOf(text) != -1 ) {
        task.style.display = 'block'
    }
    else {
      task.style.display = 'none';
    }
  })
}