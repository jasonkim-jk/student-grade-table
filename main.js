var studentTable = document.querySelector(".tbody");
var studentTableHeader = document.querySelector("header");
var formContainer = document.querySelector(".form-container");
var noGradeText = document.querySelector("#no-grade");

var pageHeader = new PageHeader(studentTableHeader);
var gradeTable = new GradeTable(studentTable, noGradeText);
var gradeForm = new GradeForm(formContainer);

var app = new App(gradeTable, pageHeader, gradeForm);
app.start();
