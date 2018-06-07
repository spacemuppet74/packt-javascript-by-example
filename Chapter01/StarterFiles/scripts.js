class ToDoClass {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("TASKS"));

    if (!this.tasks) {
      this.tasks = [
        { task: "Go to Dentist", isComplete: false },
        { task: "Do Gardening", isComplete: true },
        { task: "Renew Library Account", isComplete: false }
      ];
    }

    this.loadTask();
    this.addEventListeners();
  }

  addEventListeners() {
    console.log("add event listeners ");
    document.getElementById("addTask").addEventListener("keypress", event => {
      console.log("event listener triggered", event.keyCode);
      if (event.keyCode === 13) {
        this.addTask(event.target.value);
        event.target.value = "";
      }
    });
  }

  loadTask() {
    let taskHtml = this.tasks.reduce(
      (html, task, index) => (html += this.generateTaskHtml(task, index)),
      ""
    );
    document.getElementById("taskList").innerHTML = taskHtml;

    //save the data to localstorage
    localStorage.setItem("TASKS", JSON.stringify(this.tasks));
  }

  generateTaskHtml(task, index) {
    return `
    <li class="list-group-item checkbox">
  <div class="row">
    <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
      <label><input type="checkbox" value="" class="" onchange="toDo.toggleTaskStatus(${index})"  ${
      task.isComplete ? "checked" : ""
    }></label>
    </div>
    <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${
      task.isComplete ? "complete" : ""
    }">
    ${task.task}
     </div>
     <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
        <a class="" href="/" onClick="toDo.deleteTask(event, ${index})"><i class="delete-icon glyphicon glyphicon-trash"></i></a>
     </div>
  </div>
</li>`;
  }

  toggleTaskStatus(index) {
    this.tasks[index].isComplete = !this.tasks[index].isComplete;
  }

  deleteTask(event, taskIndex) {
    event.preventDefault();
    this.tasks.splice(taskIndex, 1);
    this.loadTask();
  }

  addTaskClick() {
    let target = document.getElementById("addTask");
    this.addTask(target.value);
    target.value = "";
  }

  addTask(task) {
    let newTask = {
      task,
      isComplete: false
    };
    let parentDiv = document.getElementById("addTask").parentElement;

    if (task === "") {
      parentDiv.classList.add("has-error");
    } else {
      parentDiv.classList.remove("has-error");
      this.tasks.push(newTask);
      this.loadTask();
    }
  }
}

let toDo;

// create event handle for windows onload
window.addEventListener("load", () => {
  toDo = new ToDoClass();
});
