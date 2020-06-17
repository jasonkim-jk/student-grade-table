var studentTable = document.querySelector(".tbody");
var studentTableHeader = document.querySelector("header");
var formContainer = document.querySelector(".form-container");
var formTitle = document.querySelector("#form-title");
var formBtnSubmit = document.querySelector("#form-submit");
var formName = document.getElementsByName("name");
var formCourse = document.getElementsByName("course");
var formGrade = document.getElementsByName("grade");
var noGradeText = document.querySelector("#no-grade");

var pageHeader = new PageHeader(studentTableHeader);
var gradeTable = new GradeTable(studentTable, noGradeText);
var gradeForm = new GradeForm(formContainer, formBtnSubmit, formTitle, formName, formCourse, formGrade);

var app = new App(gradeTable, pageHeader, gradeForm);
app.start();
