class App {
  constructor(gradeTable, pageHeader, gradeForm) {
    this.gradeTable = gradeTable;
    this.pageHeader = pageHeader;
    this.gradeForm = gradeForm;
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
    this.createGrade = this.createGrade.bind(this);
    this.handleCreateGradeError = this.handleCreateGradeError.bind(this);
    this.handleCreateGradeSuccess = this.handleCreateGradeSuccess.bind(this);
    this.updateGrade = this.updateGrade.bind(this);
    this.handleUpdateGradeError = this.handleUpdateGradeError.bind(this);
    this.handleUpdateGradeSuccess = this.handleUpdateGradeSuccess.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
    this.handleDeleteGradeError = this.handleDeleteGradeError.bind(this);
    this.handleDeleteGradeSuccess = this.handleDeleteGradeSuccess.bind(this);
    this.showGradeOnForm = this.showGradeOnForm.bind(this);
  }

  handleGetGradesError(error) {
    console.error(error);
  }

  handleGetGradesSuccess(grades) {
    // console.log(grades);
    this.studentGradeData = grades;
    this.updateTableAverage();
  }

  getAverage(grades) {
    var sum = 0;

    for (var i = 0; i < grades.length; i++) {
      sum += grades[i].grade;
    }

    return Math.floor(sum / grades.length);
  }

  getGrades() {
    $.ajax({
      method: "GET",
      url: "https://sgt.lfzprototypes.com/api/grades",
      headers: {
        "X-Access-Token": "R1JRk9us",
      },
      success: this.handleGetGradesSuccess,
      error: this.handleGetGradesError,
    });
  }

  start() {
    this.getGrades();
    this.gradeForm.updateTitle("add");
    this.gradeForm.onSubmit(this.createGrade);
    this.gradeForm.onUpdate(this.updateGrade);
    this.gradeTable.onEditClick(this.showGradeOnForm);
    this.gradeTable.onDeleteClick(this.deleteGrade);
  }

  createGrade(name, course, grade) {
    // console.log("Test: createGrade method", name, course, grade);
    $.ajax({
      method: "POST",
      url: "https://sgt.lfzprototypes.com/api/grades",
      headers: {
        "X-Access-Token": "R1JRk9us",
      },
      data: {
        name: name,
        course: course,
        grade: grade,
      },
      success: this.handleCreateGradeSuccess,
      error: this.handleCreateGradeError,
    });
  }

  updateGrade(id, name, course, grade) {
    // console.log("Test: updateGrade method", id, name, course, grade);
    this.gradeForm.updateTitle("add");
    $.ajax({
      method: "PATCH",
      url: "https://sgt.lfzprototypes.com/api/grades/" + id,
      headers: {
        "X-Access-Token": "R1JRk9us",
      },
      data: {
        name: name,
        course: course,
        grade: grade,
      },
      success: this.handleUpdateGradeSuccess,
      error: this.handleUpdateGradeError,
    });
  }

  showGradeOnForm(data) {
    this.gradeForm.updateTitle("update");
    this.gradeForm.showGradeOnForm(data);
  }

  deleteGrade(id) {
    // console.log(id);
    this.deletedStudentId = id;
    $.ajax({
      method: "DELETE",
      url: "https://sgt.lfzprototypes.com/api/grades/" + id,
      headers: {
        "X-Access-Token": "R1JRk9us",
      },
      success: this.handleDeleteGradeSuccess,
      error: this.handleDeleteGradeError,
    });
  }

  handleDeleteGradeError(error) {
    console.error(error);
  }

  handleDeleteGradeSuccess() {
    // this.getGrades();
    for (var i = 0; i < this.studentGradeData.length; i++) {
      if (this.studentGradeData[i].id === this.deletedStudentId) {
        this.studentGradeData.splice(i, 1);
      }
    }
    this.updateTableAverage();
  }

  handleUpdateGradeError(error) {
    console.error(error);
  }

  handleUpdateGradeSuccess(grade) {
    // this.getGrades();
    for (var i = 0; i < this.studentGradeData.length; i++) {
      if (this.studentGradeData[i].id === grade.id) {
        this.studentGradeData[i].name = grade.name;
        this.studentGradeData[i].course = grade.course;
        this.studentGradeData[i].grade = grade.grade;
      }
    }
    this.updateTableAverage();
  }

  handleCreateGradeError(error) {
    console.error(error);
  }

  handleCreateGradeSuccess(grade) {
    // this.getGrades();
    this.studentGradeData[this.studentGradeData.length] = grade;
    this.updateTableAverage();
  }

  updateTableAverage() {
    this.gradeTable.updateGrades(this.studentGradeData);
    this.pageHeader.updateAverage(this.getAverage(this.studentGradeData));
  }
}
