class PageHeader {
  constructor(headerElement) {
    this.headerElement = headerElement;
  }

  updateAverage(newAverage) {
    // console.log(newAverage);
    var badgeObj = this.headerElement.getElementsByClassName("badge");
    badgeObj[0].textContent = newAverage;
  }
}
