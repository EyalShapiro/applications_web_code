const tasks_ar = [];
 

window.onload = function(){
  declareEvents();
  checkLocal();
}

const checkLocal = function(){
  if(localStorage["tasks"]){
    let _ar = JSON.parse(localStorage["tasks"]);
    console.log(_ar);
    _ar.forEach(function(item){
      tasks_ar.push(item);
    })
    createTasks(tasks_ar)
    // tasks_ar = _ar;
  }
}

const declareEvents = function(){
  let add_btn = document.querySelector("#add_btn");
  let reset_btn = document.querySelector("#reset_btn");

  reset_btn.addEventListener("click",function(){
    tasks_ar.splice(0,tasks_ar.length)
    createTasks(tasks_ar);
  })


  add_btn.addEventListener("click",function(){
    let name_val = document.querySelector("#id_name").value;
    let time_val = document.querySelector("#id_time").value;
    let task_obj = {
      name:name_val,
      time:time_val,
      id:Date.now()
    }
    tasks_ar.push(task_obj);
    console.log(tasks_ar);
    createTasks(tasks_ar);
  })
}

const createTasks = function(_ar){
  document.querySelector("#id_parent").innerHTML = "";
  // מיון של המערך לפי הזמנים
  _ar = _.sortBy(_ar,"time");
  // לשמור את המערך בלקואל
  localStorage.setItem("tasks",JSON.stringify(_ar));
  _ar.forEach(function(item){
    let task = new Task("#id_parent",item);
    task.render();
  })
}