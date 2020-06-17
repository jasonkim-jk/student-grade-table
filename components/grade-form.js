class GradeForm {
  constructor(formElement, formBtnSubmit, formTitle, formName, formCourse, formGrade) {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.showGradeOnForm = this.showGradeOnForm.bind(this);
    this.formElement = formElement;
    this.formBtnSubmit = formBtnSubmit;
    this.formTitle = formTitle;
    this.formName = formName;
    this.formCourse = formCourse;
    this.formGrade = formGrade;
    this.updateTitle = this.updateTitle.bind(this);
    this.formElement.addEventListener("submit", this.handleSubmit);
    this.formElement.addEventListener("reset", this.handleReset);
  }

  onSubmit(createGrade) {
    this.createGrade = createGrade;
  }

  onUpdate(updateGrade) {
    this.updateGrade = updateGrade;
  }

  onCancel(cancel) {
    this.cancel = cancel;
  }

  updateTitle(className) {
    if (className === "add") {
      this.formTitle.textContent = "Add Grade";
      this.formBtnSubmit.textContent = "Add";
    } else {
      this.formTitle.textContent = "Update Grade";
      this.formBtnSubmit.textContent = "Update";
    }
    this.formTitle.className = className;
  }

  showGradeOnForm(data) {
    this.formId = data.id;
    this.formName[0].value = data.name;
    this.formCourse[0].value = data.course;
    this.formGrade[0].value = data.grade;
  }

  handleReset(event) {
    this.updateTitle("add");
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log("Test: method handleSubmit");

    var formData = new FormData(event.target);
    var newName = formData.get("name");
    var newCourse = formData.get("course");
    var newGrade = formData.get("grade");

    if (this.formTitle.className === "add") {
      this.createGrade(newName, newCourse, newGrade);
    } else {
      this.updateGrade(this.formId, newName, newCourse, newGrade);
    }
    event.target.reset();
  }
}
