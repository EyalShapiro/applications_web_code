// Selecting the necessary elements from the DOM
var form = document.querySelector("#new-task-form");
var input = document.querySelector("#new-task-input");
var list_el = document.querySelector("#tasks");
var search_bar = document.querySelector("#search-bar");
let submit_btn = document.querySelector("#btn-add");
window.onload = main;

function main() {
  // Function to handle the form submission and create a new task
  submit_btn.addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
  });

  // Function to handle the clear tasks button click event
  const clear_btn = document.getElementById("clear-tasks-btn");
  clear_btn.addEventListener("click", () => {
    const elem_arr = document.querySelectorAll(".task");
    elem_arr.forEach(function (i) {
      removeTask(i);
    });
  });

  // Event listener for real-time search
  search_bar.addEventListener("input", SearchTasks);
}

function addTask() {
  const task = input.value;
  const task_elem = document.createElement("div");
  if (window.innerWidth < 481) {
    task_elem.style.fontSize = "14px";
  } else {
    task_elem.style.fontSize = "16px";
  }
  task_elem.classList.add("task");

  const task_content_el = document.createElement("div");
  task_content_el.classList.add("content");
  task_elem.appendChild(task_content_el);

  const task_input_el = document.createElement("input");
  task_input_el.classList.add("text");
  task_input_el.type = "text";
  task_input_el.value = task;
  task_input_el.setAttribute("readonly", "readonly");
  task_content_el.appendChild(task_input_el);

  const task_actions_el = document.createElement("div");
  task_actions_el.classList.add("actions");
  const task_complete_el = document.createElement("span");
  task_complete_el.classList.add("complete-sign");
  task_actions_el.appendChild(task_complete_el);

  const task_edit_el = createEditButton();
  const delete_task = createDeleteButton();
  task_actions_el.appendChild(task_edit_el);
  task_actions_el.appendChild(delete_task);

  task_elem.appendChild(task_actions_el);
  list_el.appendChild(task_elem);

  input.value = "";
  let isCompleted = false;

  task_complete_el.addEventListener("click", () => {
    toggleTaskCompletion(task_elem, task_complete_el, isCompleted);
  });

  task_edit_el.addEventListener("click", () => {
    editTask(task_edit_el, task_input_el);
  });

  delete_task.addEventListener("click", () => {
    removeTask(task_elem);
  });

  task_input_el.addEventListener("click", () => {
    toggleTaskColor(task_elem, task_complete_el, task_input_el, isCompleted);
  });
}
/**
 * Removes a task element from the list element.
 *
 * @param {Element} elem - The task element to be removed.
 * @return {void} This function does not return anything.
 */
function removeTask(elem) {
  list_el.removeChild(elem);
}

/**
 * Toggles the completion state of a task.
 *
 * @param {HTMLElement} elem - The task element.
 * @param {HTMLElement} complete_el - The completion element.
 * @param {boolean} isCompleted - The current completion state of the task.
 */
function toggleTaskCompletion(elem, complete_el, isCompleted) {
  if (!isCompleted) {
    complete_el.classList.add("checked");
    elem.classList.add("completed");
    isCompleted = true;
  } else {
    complete_el.classList.remove("checked");
    elem.classList.remove("completed");
    isCompleted = false;
  }
}

/**
 * Edits a task by toggling between edit and save mode.
 *
 * @param {HTMLElement} edit_el - The element that triggers the edit mode.
 * @param {HTMLElement} input_el - The input element for editing the task.
 */
function editTask(edit_el, input_el) {
  if (!isCompleted) {
    if (edit_el.innerText.toLowerCase() == "ערוך") {
      edit_el.innerText = "שמור";
      input_el.removeAttribute("readonly");
      input_el.focus();
    } else {
      edit_el.innerText = "ערוך";
      input_el.setAttribute("readonly", "readonly");
    }
  }
}

function toggleTaskColor(elem, complete_el, input_el, isCompleted) {
  if (!isCompleted) {
    if (!elem.classList.contains("completed")) {
      complete_el.classList.add("checked");
      input_el.style.color = "darkcyan";
      elem.classList.add("completed");
      isCompleted = true;
    } else {
      complete_el.classList.remove("checked");
      input_el.style.color = "white";
      elem.classList.remove("completed");
      isCompleted = false;
    }
  }
}

/**
 * Searches for tasks based on the value entered in the search bar.
 *
 * @param {HTMLElement} search_bar - the search bar element
 * @return {type} undefined
 */
function SearchTasks() {
  const tasks = document.querySelectorAll('.text');

  if (search_bar.value !== '' && search_bar.value != undefined && search_bar.value != NaN) {
    const searchTerm = search_bar.value.trim().toLowerCase();
    tasks.forEach((i) => {
      const taskText = i.value.trim().toLowerCase();
      const taskContainer = i.closest('.task');
      taskContainer.classList.remove('red-border');

      if (taskText.includes(searchTerm)) {
        taskContainer.classList.add('red-border');
      } else {
        taskContainer.classList.remove('red-border');
      }
    });

  }
  else {
    // If the search bar is empty, remove the red border from all tasks
    if (search_bar.value === '') {
      search_bar.placeholder = ' 🔎חיפוש משימות🔍'
    }
    tasks.forEach((i) => {
      const taskContainer = i.closest('.task');
      taskContainer.classList.remove('red-border');
    });
  }
}

/**
 * Creates an edit button element.
 *
 * @return {HTMLElement} The created edit button element.
 */
function createEditButton() {
  const task_edit_el = document.createElement("button");
  task_edit_el.classList.add("edit");
  task_edit_el.innerText = "ערוך";
  return task_edit_el;
}

/**
 * Creates a delete button element.
 *
 * @return {Element} The delete button element.
 */
function createDeleteButton() {
  const delete_task = document.createElement("button");
  delete_task.classList.add("delete");
  delete_task.innerText = String.fromCodePoint("215");
  return delete_task;
}
