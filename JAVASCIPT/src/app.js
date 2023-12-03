// Selecting the necessary elements from the DOM
var form = document.querySelector("#new-task-form");
var input = document.querySelector("#new-task-input");
let list_el = document.querySelector("#tasks");
let search_bar = document.querySelector("#search-bar");
const clear_btn = document.querySelector("#clear-tasks-btn");

let is_completed = false;


let submit_btn = document.querySelector("#btn-add");
window.onload = main;

function main() {
  // Function to handle the form submission and create a new task
  submit_btn.addEventListener('click', (e) => {
    e.preventDefault();
    const task = input.value;
    search_bar.style.color = '#000'
    if (task.trim() != '' && task != undefined) {
      Add_Task(task);
    }
    else {

      input.placeholder = " -אנא הכנס משימה חוקית";
      setTimeout(() => {
        input.placeholder = `הוסף כותרת למשימה החדשה`;
      }, 1000 * 15)//1000MS*15MS=15שניות
    }

  });

  // Function to handle the clear tasks button click event
  clear_btn.addEventListener("click", () => {
    const elem_arr = document.querySelectorAll(".task");
    elem_arr.forEach(function (i) {
      Remove_Task(i);
    });
  });

  // Event listener for real-time search
  search_bar.addEventListener("input", Search_Tasks);
}

function Add_Task(task_text) {
  const task_elem = document.createElement("div");

  if (window.innerWidth < 481) {
    task_elem.style.fontSize = "14px";
  } else {
    task_elem.style.fontSize = "16px";
  }
  task_elem.classList.add("task");


  input.value = "";//??


  const events_operated = Events_Operated();


  function Events_Operated() {
    const { task_complete, task_input, task_edit, delete_task } = Manger_Html_Element();
    is_completed = false;//מפעיל את הכל 

    task_edit.addEventListener("click", () => {
      Edit_Task(task_edit, task_input);
    });

    delete_task.addEventListener("click", () => {
      Remove_Task(task_elem);
    });
    const event_commit = function EventCommit() {
      Toggle_Task_Color(task_elem, task_complete, task_input);
    };
    task_input.addEventListener("click", event_commit);
    task_complete.addEventListener("click", event_commit);
  }

  /**
   * Creates and returns a manager HTML element.
   *
   * @return {Object} An object containing references to the created elements.
   */
  function Manger_Html_Element() {
    const task_content_el = document.createElement("div");//תוכנה משימה
    task_content_el.classList.add("content");  /* צבע טקסט של משימות שבוצעו */
    task_elem.appendChild(task_content_el);

    const task_input = document.createElement("input");
    task_input.classList.add("text");
    task_input.type = "text";
    task_input.value = task_text;
    task_input.setAttribute("readonly", "readonly");
    task_content_el.appendChild(task_input);

    const task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");
    const task_complete = document.createElement("span");
    task_complete.classList.add("complete-sign");//מוסיף יצוע css
    task_actions_el.appendChild(task_complete);

    const task_edit = CreateEditButton();
    task_actions_el.appendChild(task_edit);

    const delete_task = CreateDeleteButton();
    task_actions_el.appendChild(delete_task);

    task_elem.appendChild(task_actions_el);
    list_el.appendChild(task_elem);
    return { task_complete, task_input, task_edit, delete_task };
  }
}
/**
 * Removes a task element from the list element.
 *
 * @param {Element} elem - The task element to be removed.
 * @return {void} This function does not return anything.
 */
function Remove_Task(elem) {
  list_el.removeChild(elem);

}



/**
 * Edits a task by toggling between edit and save mode.
 *
 * @param {HTMLElement} edit_el - The element that triggers the edit mode.
 * @param {HTMLElement} input_el - The input element for editing the task.
 */
function Edit_Task(edit_el, input_el) {
  if (!is_completed) {
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

function Toggle_Task_Color(elem, complete_el, input_el) {
  console.log(is_completed)
  if (!is_completed) {
    complete_el.classList.add("checked");
    input_el.style.color = "teal";//משנה צבע טקסט
    elem.classList.add("completed");
    is_completed = true;
  } else {
    complete_el.classList.remove("checked");
    input_el.style.color = "white";//מחזיר צבע טקסט
    elem.classList.remove("completed");
    is_completed = false;
  }
}


/**
 * Searches for tasks based on the value entered in the search bar.
 *
 * @param {HTMLElement} search_bar - the search bar element
 * @return {type} undefined
 */
function Search_Tasks() {
  const tasks = document.querySelectorAll('.text');
  //   trim = עם כל הרווחים המובילים מוחלפים בכלום string הפונקציה הזו מחזירה את
  if (search_bar.value.trim() !== '' && search_bar.value != undefined && search_bar.value != NaN) {
    const searchTerm = search_bar.value.trim().toLowerCase();
    tasks.forEach((i) => {
      const text = i.value.trim().toLowerCase();
      const taskContainer = i.closest('.task');
      taskContainer.classList.remove('red-border');

      if (text.includes(searchTerm)) {
        taskContainer.classList.add('red-border');
      } else {
        taskContainer.classList.remove('red-border');
      }
    });

  }
  else {
    /* If the search bar is empty, remove the red border from all tasks   מסדר אתה צבע למשימה מחזיר את כתב*/
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
function CreateEditButton() {
  const edit_btn = document.createElement("button");
  edit_btn.classList.add("edit");
  edit_btn.innerText = "ערוך";
  return edit_btn;
}

/**
 * Creates a delete button element.
 *
 * @return {Element} The delete button element.
 */
function CreateDeleteButton() {
  const delete_task = document.createElement("button");
  delete_task.classList.add("delete");
  delete_task.innerText = String.fromCodePoint("215");
  return delete_task;
}
