class GradeForm {
  constructor(formElement) {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formElement = formElement;
  }

  onSubmit(createGrade) {
    this.createGrade = createGrade;
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Test: Hi");
  }
}
