class GradeTable {
  constructor(tableElement) {
    this.tableElement = tableElement;
  }

  updateGrades(grades) {
    console.log(grades);
    this.cleanTable();
    for (var i = 0; i < grades.length; i++) {
      var tr = document.createElement("tr");
      var tdName = document.createElement("td");
      var tdCourse = document.createElement("td");
      var tdGrade = document.createElement("td");
      var tdOperation = document.createElement("td");

      tdName.textContent = grades[i].name;
      tdCourse.textContent = grades[i].course;
      tdGrade.textContent = grades[i].grade;
      tdOperation.textContent = "";

      tr.append(tdName, tdCourse, tdGrade, tdOperation);
      this.tableElement.appendChild(tr);
    }
  }

  cleanTable() {
    while (this.tableElement.firstChild) {
      this.tableElement.removeChild(this.tableElement.lastChild);
    }
  }
}
