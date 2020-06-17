class GradeTable {
  constructor(tableElement, noGradesElement) {
    this.tableElement = tableElement;
    this.noGradesElement = noGradesElement;
  }

  updateGrades(grades) {
    console.log(grades);
    this.cleanTable();

    if (grades.length > 0) {
      this.noGradesElement.classList.add("d-none");
      for (var i = 0; i < grades.length; i++) {
        var tableRow = this.renderGradeRow(grades[i], this.showGradeOnForm, this.deleteGrade);
        this.tableElement.appendChild(tableRow);
      }
    } else {
      this.noGradesElement.classList.remove("d-none");
    }
  }

  cleanTable() {
    while (this.tableElement.firstChild) {
      this.tableElement.removeChild(this.tableElement.lastChild);
    }
  }

  onEditClick(editGrade) {
    this.showGradeOnForm = editGrade;
  }

  onDeleteClick(deleteGrade) {
    this.deleteGrade = deleteGrade;
  }

  renderGradeRow(data, showGradeOnForm, deleteGrade) {
    var tr = document.createElement("tr");
    var tdName = document.createElement("td");
    var tdCourse = document.createElement("td");
    var tdGrade = document.createElement("td");
    var tdOperation = document.createElement("td");
    var btnEdit = document.createElement("button");
    var btnDelete = document.createElement("button");
    var iconEdit = document.createElement("i");
    var iconDelete = document.createElement("i");

    tdName.textContent = data.name;
    tdCourse.textContent = data.course;
    tdGrade.textContent = data.grade;
    tdOperation.textContent = "";
    btnEdit.className = "btn-border";
    btnDelete.className = "btn-border";
    iconEdit.className = "fas fa-edit";
    iconDelete.className = "fas fa-trash";

    btnEdit.appendChild(iconEdit);
    btnDelete.appendChild(iconDelete);
    tdOperation.append(btnEdit, btnDelete);
    tr.append(tdName, tdCourse, tdGrade, tdOperation);
    btnEdit.addEventListener("click", function () {
      showGradeOnForm(data);
    });
    btnDelete.addEventListener("click", function () {
      deleteGrade(data.id);
    });

    return tr;
  }
}
