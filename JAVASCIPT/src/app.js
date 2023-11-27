// Selecting the necessary elements from the DOM
const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const list_el = document.querySelector("#tasks");
const search_bar = document.querySelector("#search-bar");
main();
document.getElementById("search-bar").onclick = Search;
// Function to handle the search bar focus and blur events
search_bar.addEventListener("focus", () => {
  search_bar.classList.add("active");
});

search_bar.addEventListener("blur", () => {
  search_bar.classList.remove("active");
});

function main() {
  // Function to handle the clear tasks button click event
  const clearBtn = document.getElementById("clear-tasks-btn");
  // Function to handle the form submission and create a new task
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = input.value;
    const task_elem = document.createElement("div"); // יצירת אלמנט המשימה
    if (window.innerWidth < 481) {
      // שינוי סגנון למשימה במסך קטן
      task_elem.style.fontSize = "14px";
    } else {
      // שינוי סגנון למשימה במסך גדול
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
    const task_edit_el = BtnEdit(); //מגדיר כדי שיהיה
    const delete_task = BtnDelete(); //מגדיר כדי שיהיה
    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(delete_task);
    task_elem.appendChild(task_actions_el);
    list_el.appendChild(task_elem);
    input.value = "";
    let isCompleted = false; // משתנה לציון האם המשימה בוצעה
    task_complete_el.addEventListener("click", () => {
      if (!isCompleted) {
        task_complete_el.classList.add("checked");
        task_elem.classList.add("completed");
        isCompleted = true;
      } else {
        task_complete_el.classList.remove("checked");
        task_elem.classList.remove("completed");
        isCompleted = false;
      }
    });
    task_edit_el.addEventListener("click", () => {
      if (!isCompleted) {
        if (task_edit_el.innerText.toLowerCase() == "ערוך") {
          task_edit_el.innerText = "שמור";
          task_input_el.removeAttribute("readonly");
          task_input_el.focus();
        } else {
          task_edit_el.innerText = "ערוך";
          task_input_el.setAttribute("readonly", "readonly");
        }
      }
    });

    delete_task.addEventListener("click", () => {
      list_el.removeChild(task_elem);
    });

    task_input_el.addEventListener("click", () => {
      if (!isCompleted) {
        if (!task_elem.classList.contains("completed")) {
          task_complete_el.classList.add("checked");
          task_input_el.style.color = "darkcyan"; // שנה צבע טקסט משימה לירוק
          task_elem.classList.add("completed");
          isCompleted = true;
        } else {
          task_complete_el.classList.remove("checked");
          task_input_el.style.color = "white"; // החזר צבע טקסט משימה ללבן
          task_elem.classList.remove("completed");
          isCompleted = false;
        }
      }
    });
  });

  clearBtn.addEventListener("click", () => {
    const list_el = document.querySelector("#tasks");
    list_el.innerHTML = "";
  });
}

// Function to handle the Search functionality
function Search() {
  console.info('start Search func');
  const searchTerm = search_bar.value.trim().toLowerCase();
  const tasks = document.querySelectorAll(".text");
  tasks.forEach((item) => {
    const taskText = item.value.trim().toLowerCase();
    const taskContainer = item.closest(".task");

    if (taskText.includes(searchTerm)) {
      taskContainer.style.borderColor = 'red';
    } else {
      taskContainer.classList.remove();
    }
  });
}


// Function to create an edit button for each task
function BtnEdit() {
  console.info('start BtnEdit func');

  const task_edit_el = document.createElement("button");
  task_edit_el.classList.add("edit");
  task_edit_el.innerText = "ערוך";
  return task_edit_el;
}
// Function to create a delete button for each task
function BtnDelete() {
  console.info('start BtDelete func');
  const delete_task = document.createElement("button"); // מוחק משימה
  delete_task.classList.add("delete");
  delete_task.innerText = String.fromCodePoint("215"); // סימון של "X"
  return delete_task
}