class App {
  constructor(gradeTable, pageHeader, gradeForm) {
    this.gradeTable = gradeTable;
    this.pageHeader = pageHeader;
    this.gradeForm = gradeForm;
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
  }

  handleGetGradesError(error) {
    console.error(error);
  }

  handleGetGradesSuccess(grades) {
    // console.log(grades);
    this.gradeTable.updateGrades(grades);
    this.pageHeader.updateAverage(this.getAverage(grades));
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
  }
}
