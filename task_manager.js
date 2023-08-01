{
  var task_list = [];

  var task_counter = 0;

  function addTask(event) {
    event.preventDefault();

    var taskValue = document.getElementById("task").value;
    var list = document.getElementById("task-list");

    var listItem = document.createElement("li");
    listItem.className = "list-group-item";

    var checkbox = document.createElement("input");
    checkbox.className = "form-check-input me-1";
    checkbox.type = "checkbox";
    checkbox.value = "";
    checkbox.id = "checkbox" + ++task_counter;
    checkbox.addEventListener("change", function () {
      label.style.textDecoration = this.checked ? "line-through" : "none";
    });

    var label = document.createElement("label");
    label.className = "form-check-label";
    label.htmlFor = checkbox.id;
    label.textContent = task_counter + ". " + taskValue;

    listItem.appendChild(checkbox);
    listItem.appendChild(label);

    list.appendChild(listItem);

    document.getElementById("task").value = "";
  }

  document.getElementById("task-form").addEventListener("submit", addTask);

  function clearTasks() {
    task_counter = 0;
    var list = document.getElementById("task-list");
    list.innerHTML = "";
  }

  function get_PDF() {
    var doc = new jsPDF();
  
    var tasks = document.getElementById('task-list').getElementsByTagName('li');
    var lineHeight = 10;
    var linesPerPage = 25;
    var margin = 20;
  
    for (var i = 0; i < tasks.length; i++) {
      if (i % linesPerPage === 0 && i !== 0) {
        doc.addPage();
      }
      
      var y = margin + (i % linesPerPage) * lineHeight;
      doc.text(tasks[i].innerText, 10, y);
    }
  
    doc.save('Tasks.pdf');
  }
}
