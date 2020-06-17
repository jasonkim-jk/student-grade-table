class GradeTable {
  constructor(tableElement, noGradesElement) {
    this.tableElement = tableElement;
    this.noGradesElement = noGradesElement;
  }

  updateGrades(grades) {
    // console.log(grades);
    this.cleanTable();

    if (grades.length > 0) {
      this.noGradesElement.classList.add("d-none");
      for (var i = 0; i < grades.length; i++) {
        var tableRow = this.renderGradeRow(grades[i], this.deleteGrade);
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

  onDeleteClick(deleteGrade) {
    this.deleteGrade = deleteGrade;
  }

  renderGradeRow(data, deleteGrade) {
    var tr = document.createElement("tr");
    var tdName = document.createElement("td");
    var tdCourse = document.createElement("td");
    var tdGrade = document.createElement("td");
    var tdOperation = document.createElement("td");
    var btn = document.createElement("button");

    tdName.textContent = data.name;
    tdCourse.textContent = data.course;
    tdGrade.textContent = data.grade;
    tdOperation.textContent = "";
    btn.textContent = "DELETE";
    btn.className = "btn btn-sm btn-danger";

    tdOperation.appendChild(btn);
    tr.append(tdName, tdCourse, tdGrade, tdOperation);
    btn.addEventListener("click", function () {
      deleteGrade(data.id);
    });

    return tr;
  }
}
