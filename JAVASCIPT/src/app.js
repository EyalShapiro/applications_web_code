// Selecting the necessary elements from the DOM
// global:
let input = document.querySelector("#new-task-input");
let list_el = document.querySelector("#tasks");
const search_bar = document.querySelector("#search-bar");

let is_completed = false;


window.onload = () => {
  main();
  Load_Tasks();
};

function main() {
  input.addEventListener('keyup', function (event) {
    const text = document.querySelector("#Caps-lock");
    if (event.getModifierState("CapsLock")) { text.style.display = "block"; }
    else { text.style.display = "none" }
  })
  // Function to handle the form submission and create a new task
  let submit_btn = document.querySelector("#btn-add");
  submit_btn.addEventListener('click', (e) => {
    e.preventDefault();
    const task = input.value;
    if (task.trim() != '' && task != undefined) {//בודק עם המשימה לא ריקה
      Add_Task(task);
      localStorage.setItem('tasks', JSON.stringify(Get_All_From_localStorage()));
    }
    else {//מוסיף הודעה שאי אפשר להוסיף משימה
      input.placeholder = "\t אנא הכנס משימה חוקית";
      setTimeout(() => {
        input.placeholder = `הוסף כותרת למשימה החדשה`;
      }, 1000 * 12)//1000MS*15MS=12שניות
    }
  });

  SearchAndClear_Event();
}

function SearchAndClear_Event() {
  document.querySelector("#clear-tasks-btn").addEventListener("click", Clear_All_Task);
  // Event listener for real-time search
  search_bar.addEventListener("input", Search_Tasks);
  document.querySelector('#search-btn').addEventListener('click', function () {
    search_bar.value = ''
    Search_Tasks();
  });
}

/**
 * Load_Tasks function retrieves the saved tasks from the local storage,
 * parses the tasks into an array, and then adds each task to the task list.
 * @return {Array} An array of tasks that were retrieved from the local storage.
 */
function Load_Tasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    const tasksArray = JSON.parse(savedTasks);
    tasksArray.forEach(task => Add_Task(task));
  }
  // return tasksArray;
}
/**
 * Retrieves all tasks from the document and returns them as an array.
 * @return {Array} An array containing all the tasks.
 */
function Get_All_From_localStorage() {
  const tasks = document.querySelectorAll('.text');
  const tasksArray = Array.from(tasks).map(task => task.value);
  return tasksArray;
}

/**
 * A function that creates a task element and adds it to the DOM.
 * @param {string} task_text - The text of the task to be added.
 * @return {undefined} This function does not return a value.
 */
function Add_Task(task_text) {
  const task_elem = document.createElement("div");
  if (window.innerWidth < 481) {
    task_elem.style.fontSize = "14px";
  } else {
    task_elem.style.fontSize = "16px";
  }
  task_elem.classList.add("task");
  input.value = "";//??
  Add_Events_Operated();

  /**
   * Generates the function comment for the given function body in a markdown code block with the correct language syntax.
   * @return {undefined} This function does not return a value.
   */
  function Add_Events_Operated() {
    const { task_complete, task_input, task_edit, delete_task } = Manger_Html_Element();
    is_completed = false;//מפעיל את הכל 
    task_edit.addEventListener("click", () => {
      Edit_Task(task_edit, task_input);
    });

    delete_task.addEventListener("click", () => {
      Remove_Task(task_elem);
    });
    const event_commit = function EventCommit() {
      Toggle_Task_Color(task_elem, task_complete, task_input, task_edit);
    };
    task_input.addEventListener("click", event_commit);
    task_complete.addEventListener("click", event_commit);
  }



  /**
   * Creates an HTML element for a manager.
   *
   * @return {object (HTMLElement)} An object containing the created HTMLElement.
   */
  function Manger_Html_Element() {
    const task_content_el = document.createElement("div");//תוכנה משימה
    task_content_el.classList.add("task_bar"); //div  משימה 
    task_elem.appendChild(task_content_el);
    //שורה שבא רשום טקסט
    const task_input = document.createElement("input");
    task_input.classList.add("text");
    task_input.type = "text";
    task_input.value = task_text;
    task_input.setAttribute("readonly", "readonly");
    task_content_el.appendChild(task_input);
    //סימון של עם מיסה בוצע
    const task_complete = document.createElement("span");
    task_complete.classList.add("complete-sign");//מוסיף יצוע css
    task_content_el.appendChild(task_complete);
    //כפתור ערכה
    const task_edit = Create_Edit_Button();
    task_content_el.appendChild(task_edit);
    //כפתור המחיקה 
    const delete_task = Create_Delete_Button();
    task_content_el.appendChild(delete_task);
    //מוסף את זה
    list_el.appendChild(task_elem);
    return { task_complete, task_input, task_edit, delete_task };//כל שדות של משימה חדשה 
  }

  /**
   * Clears all tasks from local storage and from the DOM.
   * @return {boolean} Returns true if all tasks were successfully cleared, false otherwise.
   */
} function Clear_All_Task() {
  const t = `אתה בטוח שאתה רוצה למחוק הכל`
  if (!confirm(t)) {
    return false;
  }
  localStorage.clear();
  const elem_arr = document.querySelectorAll(".task");
  elem_arr.forEach(function (i) {
    Remove_Task(i);//cell bake
  });
  return true;
}
/**
 * Removes a task element from the list and updates the tasks stored in local storage.
 * @param {Object} elem - The task element to be removed.
 * @return {undefined} This function does not return a value.
 */
function Remove_Task(elem) {
  list_el.removeChild(elem);

  localStorage.removeItem('tasks');//localStorageלנקות 
  localStorage.setItem('tasks', JSON.stringify(Get_All_From_localStorage()));// localStorage מסיר משימה, תוכל להוסיף שורה כזו כדי לעדכן את 
}

/**
 * Edits a task by toggling between edit and save mode.
 * @param {HTMLElement} edit_el - The element that triggers the edit mode.
 * @param {HTMLElement} input_el - The input element for editing the task.
 */
function Edit_Task(edit_el, input_el) {
  if (!is_completed) {
    if (edit_el.innerText.toLowerCase() == "ערוך") {
      EditorMode(edit_el, input_el);
    } else {
      edit_el.textContent = "ערוך";

      input_el.setAttribute("readonly", "readonly");
      edit_el.classList.remove(`editor-mode`);

      // שמירה של המשימות ל- localStorage אחרי עדכון
      localStorage.setItem('tasks', JSON.stringify(Get_All_From_localStorage()));
    }
  }

}

function EditorMode(edit_el, input_el) {
  edit_el.textContent = "שמור";
  edit_el.classList.add(`editor-mode`);
  input_el.removeAttribute("readonly");
  input_el.focus();
}

/**
 * Toggles the color and completed status of a task.
 *
 * @param {HTMLElement} elem - The task element.
 * @param {HTMLElement} complete_el - The element representing the completion status of the task.
 * @param {HTMLElement} input_el - The input element representing the task text.
 * @return {undefined} This function does not return a value.
 */
function Toggle_Task_Color(elem, complete_el, input_el, edit_btn) {
  console.log(is_completed)
  if (!is_completed) {
    edit_btn.style.display = 'none';
    complete_el.classList.add("checked");
    input_el.style.color = "teal";//משנה צבע טקסט
    elem.classList.add("completed");
    is_completed = true;
  } else {
    edit_btn.style.display = `block`;

    complete_el.classList.remove("checked");
    input_el.style.color = `var(--royalblue)`;//מחזיר צבע טקסט
    elem.classList.remove("completed");
    is_completed = false;
  }
}

/**
 * Searches for tasks based on the value entered in the search bar.
 */
function Search_Tasks() {
  //   trim = עם כל הרווחים המובילים מוחלפים בכלום string הפונקציה הזו מחזירה את
  const not_empathy = search_bar.value.trim() === '' && search_bar.value.trim() == '';
  // const tasks_arr = document.querySelectorAll('.text');

  const tasks_arr = Remove_The_Find();
  if (!not_empathy && search_bar.value != undefined && search_bar.value != NaN) {
    tasks_arr.forEach((i) => {
      const text_found = search_bar.value.trim().toLowerCase();
      const text = i.value.trim().toLowerCase();
      // המתודה  closest = האב הקרוב ביותר שיש לו את המחלקה מחזירה את האב הקרוב ביותר שמקיים את התנאי שניתן לה.
      const text_searching = i.closest('.task'); //ניגש לאב של task
      //   /* If the search bar is empty, remove the red border from all tasks   מסדר אתה צבע למשימה מחזיר את כתב*/
      if (text.includes(text_found) && !not_empathy) {//includes =find in arr return bool 
        text_searching.classList.add('find-border');

      } else { text_searching.classList.remove('find-border'); }
    });
  }
  else {
    search_bar.value = ''
  }
}


function Remove_The_Find() {
  const tasks_arr = document.querySelectorAll('.text');
  tasks_arr.forEach((i) => {
    const text_searching = i.closest('.task');
    text_searching.classList.remove('find-border')
  });
  return tasks_arr;//הוספתי את זה כדי לשלב דברים

}

/**
 * Creates an edit button element.
 * @return {HTMLElement} The created edit button element.
 */
function Create_Edit_Button() {
  const edit_btn = document.createElement("button");
  edit_btn.classList.add("edit");
  edit_btn.textContent = "ערוך";

  return edit_btn;
}

/**
 * Creates a delete button element.
 *
 * @return {Element} The delete button element.
 */
function Create_Delete_Button() {
  const delete_task = document.createElement("button");
  delete_task.classList.add("delete-task");
  delete_task.innerText = `${String.fromCodePoint("215")} `;
  return delete_task;
}
