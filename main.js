var studentTable = document.querySelector(".tbody");
var studentTableHeader = document.querySelector("header");
var pageHeader = new PageHeader(studentTableHeader);
var gradeTable = new GradeTable(studentTable);
var app = new App(gradeTable, pageHeader);
app.start();
