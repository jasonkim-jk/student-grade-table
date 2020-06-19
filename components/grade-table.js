class GradeTable {
  constructor(tableElement, noGradesElement, sortNameElement, sortCourseElement, sortGradeElement) {
    this.tableElement = tableElement;
    this.noGradesElement = noGradesElement;
    this.sortNameElement = sortNameElement;
    this.sortCourseElement = sortCourseElement;
    this.sortGradeElement = sortGradeElement;
    this.sortNameElement.addEventListener("click", this.sortByName.bind(this));
    this.sortCourseElement.addEventListener("click", this.sortByCourse.bind(this));
    this.sortGradeElement.addEventListener("click", this.sortByGrade.bind(this));
  }

  updateGrades(grades) {
    // console.log(grades);
    this.gradeDataReference = grades;
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
    tdOperation.className = "text-nowrap";
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

  sortByName(event) {
    var sortOrder = "";
    sortOrder = this.changeSortIcon(this.sortNameElement, "alpha");
    console.log("====> ", sortOrder, this.gradeDataReference);
    this.sortItems(this.gradeDataReference, "name", sortOrder, "alpha");
    this.updateGrades(this.gradeDataReference);
  }

  sortByCourse(event) {
    var sortOrder = "";
    sortOrder = this.changeSortIcon(this.sortCourseElement, "alpha");
    this.sortItems(this.gradeDataReference, "course", sortOrder, "alpha");
    this.updateGrades(this.gradeDataReference);
  }

  sortByGrade(event) {
    var sortOrder = "";
    sortOrder = this.changeSortIcon(this.sortGradeElement, "numeric");
    this.sortItems(this.gradeDataReference, "grade", sortOrder, "numeric");
    this.updateGrades(this.gradeDataReference);
  }

  sortItems(sortData, sortElement, sortOrder, sortType) {
    sortData.sort(function (a, b) {
      if (sortType === "alpha") {
        var x = a[sortElement].toLowerCase();
        var y = b[sortElement].toLowerCase();
        if (x < y) {
          return sortOrder === "ascending" ? -1 : 1;
        }
        if (x > y) {
          return sortOrder === "ascending" ? 1 : -1;
        }
        return 0;
      } else if (sortType === "numeric") {
        return sortOrder === "ascending" ? a[sortElement] - b[sortElement] : b[sortElement] - a[sortElement];
      }
    });
  }

  // sort-no(default) => sort-down => sort-up => sort-down => sort-up ....
  changeSortIcon(element, sortType) {
    var sortOrder = "";
    this.initializeOtherIcons(element);

    if (element.classList.contains("sort-down")) {
      element.classList.remove("sort-no", "sort-down", `fa-sort-${sortType}-down`);
      element.classList.add("sort-up", `fa-sort-${sortType}-up`);
      sortOrder = "descending";
    } else if (element.classList.contains("sort-up")) {
      element.classList.remove("sort-no", "sort-up", `fa-sort-${sortType}-up`);
      element.classList.add("sort-down", `fa-sort-${sortType}-down`);
      sortOrder = "ascending";
    } else {
      element.classList.remove("sort-no", "sort-up");
      element.classList.add("sort-down", `fa-sort-${sortType}-down`);
      sortOrder = "ascending";
    }

    return sortOrder;
  }

  // initialize the other's sorting icons
  initializeOtherIcons(element) {
    if (element === this.sortNameElement) {
      this.sortCourseElement.classList.remove("sort-down", "sort-up", "fa-sort-alpha-up");
      this.sortCourseElement.classList.add("sort-no", "fa-sort-alpha-down");
      this.sortGradeElement.classList.remove("sort-down", "sort-up", "fa-sort-numeric-up");
      this.sortGradeElement.classList.add("sort-no", "fa-sort-numeric-down");
    } else if (element === this.sortCourseElement) {
      this.sortNameElement.classList.remove("sort-down", "sort-up", "fa-sort-alpha-up");
      this.sortNameElement.classList.add("sort-no", "fa-sort-alpha-down");
      this.sortGradeElement.classList.remove("sort-down", "sort-up", "fa-sort-numeric-up");
      this.sortGradeElement.classList.add("sort-no", "fa-sort-numeric-down");
    } else {
      this.sortNameElement.classList.remove("sort-down", "sort-up", "fa-sort-alpha-up");
      this.sortNameElement.classList.add("sort-no", "fa-sort-alpha-down");
      this.sortCourseElement.classList.remove("sort-down", "sort-up", "fa-sort-alpha-up");
      this.sortCourseElement.classList.add("sort-no", "fa-sort-alpha-down");
    }
  }
}
