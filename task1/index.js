const todoList = [];

let idCount = 0;

let submitButton = document.getElementById("task-submit-button");
let taskForm = document.querySelector("#todo-form");
let taskTableBody = document.querySelector("#task-table tbody");
let errorModal = new bootstrap.Modal(document.querySelector("#errorModal"), {});

const todoItem = function (name, date, description) {
  this.id = idCount;
  idCount++;
  this.name = name;
  this.date = new Date(date);
  this.description = description;
  this.htmlElement = createTableItem(
    this.id,
    this.name,
    this.date,
    this.description
  );
};

function createTableItem(id, name, date, description) {
  let tr = document.createElement("tr");
  tr.id = `todoItem${id}`;

  let statusTd = document.createElement("td");
  let taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.className = "form-check-input";
  taskCheckbox.addEventListener("click", function () {
    if (this.checked) {
      this.parentElement.parentElement.setAttribute(
        "style",
        "text-decoration: line-through;"
      );
      this.parentElement.style.backgroundColor = "rgba(0,255,0,150)";
    } else {
      this.parentElement.parentElement.setAttribute("style", " ");
      this.parentElement.setAttribute("style", " ");
    }
  });
  statusTd.append(taskCheckbox);

  let nameTd = document.createElement("td");
  nameTd.innerText = name;

  let dateTd = document.createElement("td");
  dateTd.innerText = date.toLocaleDateString("en-in");
  if (date && date < new Date()) {
    dateTd.setAttribute("style", "background-color: rgba(255,0,0,150)");
  }

  let descriptionTd = document.createElement("td");
  descriptionTd.innerText = description;

  let deleteTd = document.createElement("td");
  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.className = "btn btn-danger btn-sm";
  deleteButton.addEventListener("click", function () {
    this.parentElement.parentElement.remove();
  });
  deleteTd.append(deleteButton);

  tr.append(statusTd, nameTd, dateTd, descriptionTd, deleteTd);

  taskTableBody.append(tr);

  return tr;
}

function getTaskFormDetails() {
  let inputs = document.querySelectorAll("#todo-form .form-control");
  let details = {};
  for (let input of inputs) {
    if (input.id == "task-name" && input.value == "") return false;
    details[input.id] = input.value;
  }

  return details;
}

submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  let formDetails = getTaskFormDetails();
  //   console.log(formDetails);
  if (formDetails == false) {
    errorModal.show();
    return;
  }
  const item = new todoItem(
    formDetails["task-name"],
    formDetails["task-deadline"],
    formDetails["task-description"]
  );
  //   console.log(item);
  todoList.push(item);
  taskForm.reset();
});
