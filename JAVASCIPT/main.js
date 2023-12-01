
window.addEventListener('load', () => {
 // קבלת האלמנטים הנדרשים לפונקציונליות התוכנה
 var form = document.querySelector("#new-task-form");
 var input = document.querySelector("#new-task-input");
 var list_el = document.querySelector("#tasks");
 var searchbar = document.querySelector("#searchbar");

 // אזהרת מחיקת כל המשימות
 const clear_btn = document.getElementById('clear-tasks-btn');
 clear_btn.addEventListener('click', () => {
    const list_el = document.querySelector("#tasks");
    list_el.innerHTML = '';
 });

 // אירוע של הגשת הטופס להוספת משימה חדשה
 form.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = input.value;
    const task_el = document.createElement('div'); // יצירת אלמנט המשימה
    if (window.innerWidth < 481) {
      // שינוי סגנון למשימה במסך קטן
      task_el.style.fontSize = '14px';

    } else {
      // שינוי סגנון למשימה במסך גדול 
      task_el.style.fontSize = '16px';
    }
    task_el.classList.add('task');

    // יצירת אלמנטים נוספים למשימה
    const task_content_el = document.createElement('div');
    task_content_el.classList.add('content');
    task_el.appendChild(task_content_el);

    const task_input_el = document.createElement('input');
    task_input_el.classList.add('text');
    task_input_el.type = 'text';
    task_input_el.value = task;
    task_input_el.setAttribute('readonly', 'readonly');
    task_content_el.appendChild(task_input_el);

    const task_actions_el = document.createElement('div');
    task_actions_el.classList.add('actions');

    const task_complete_el = document.createElement('span');
    task_complete_el.classList.add('complete-sign');
    task_actions_el.appendChild(task_complete_el);

    const task_edit_el = document.createElement('button');
    task_edit_el.classList.add('edit');
    task_edit_el.innerText = 'ערוך';

    const task_delete_el = document.createElement('button');
    task_delete_el.classList.add('delete');
    task_delete_el.innerText = String.fromCodePoint("215"); //סימון של "X"

    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);
    task_el.appendChild(task_actions_el);
    list_el.appendChild(task_el);
    input.value = '';

    let isCompleted = false; // משתנה לציון האם המשימה בוצעה

    // אירועים ללחיצה על כפתורי המשימה
    task_complete_el.addEventListener('click', () => {
      if (!isCompleted) {
        task_complete_el.classList.add('checked');
        task_el.classList.add('completed');
        isCompleted = true;
      } else {
        task_complete_el.classList.remove('checked');
        task_el.classList.remove('completed');
        isCompleted = false;
      }
    });

    task_edit_el.addEventListener('click', (e) => {
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

    task_delete_el.addEventListener('click', (e) => {
      list_el.removeChild(task_el);
    });

    task_input_el.addEventListener('click', () => {
      if (!isCompleted) {
        if (!task_el.classList.contains('completed')) {
          task_complete_el.classList.add('checked');
          task_input_el.style.color = 'lightgreen'; // שנה צבע טקסט משימה לירוק
          task_el.classList.add('completed');
          isCompleted = true;
        } else {
          task_complete_el.classList.remove('checked');
          task_input_el.style.color = 'white'; // החזר צבע טקסט משימה ללבן
          task_el.classList.remove('completed');
          isCompleted = false;
        }
      }
    });
 });

 // אירוע של התמונה לחיצה על שדה החיפוש
 searchbar.addEventListener('focus', () => {
    searchbar.classList.add('active');
 });

 searchbar.addEventListener('blur', () => {
    searchbar.classList.remove('active');
 });

 // פונקציה לחיפוש משימות בפילטר של השדה החיפוש
 function search() {
    const searchTerm = document.getElementById('searchbar').value.trim().toLowerCase();
    const tasks = document.querySelectorAll('.text');
    tasks.forEach((taskInput) => {

      const taskText = taskInput.value.trim().toLowerCase();
      const taskContainer = taskInput.closest('.task');

      if (taskText.includes(searchTerm)) {
        taskContainer.classList.add('red-border');
      } else {
        taskContainer.classList.remove('red-border');
      }
    });
 }

 // אירוע של לחיצה על כפתור חיפוש
 const searchBtn = document.getElementById('search-tasks-btn');
 searchBtn.addEventListener('click', () => {
    search();
 });
});