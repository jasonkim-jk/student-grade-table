const studentTable = document.querySelector(".tbody");
const studentTableHeader = document.querySelector("header");
const formContainer = document.querySelector(".form-container");
const formTitle = document.querySelector("#form-title");
const formBtnSubmit = document.querySelector("#form-submit");
const formName = document.getElementsByName("name");
const formCourse = document.getElementsByName("course");
const formGrade = document.getElementsByName("grade");
const noGradeText = document.querySelector("#no-grade");
const icnName = document.querySelector("#sort-name");
const icnCourse = document.querySelector("#sort-course");
const icnGrade = document.querySelector("#sort-grade");

const pageHeader = new PageHeader(studentTableHeader);
const gradeTable = new GradeTable(studentTable, noGradeText, icnName, icnCourse, icnGrade);
const gradeForm = new GradeForm(formContainer, formBtnSubmit, formTitle, formName, formCourse, formGrade);

const app = new App(gradeTable, pageHeader, gradeForm);
app.start();
