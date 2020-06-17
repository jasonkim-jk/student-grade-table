class PageHeader {
  constructor(headerElement) {
    this.headerElement = headerElement;
  }

  updateAverage(newAverage) {
    // console.log(newAverage);
    var badgeObj = this.headerElement.getElementsByClassName("badge");
    if(isNaN(newAverage)) {
      badgeObj[0].textContent = 0;
    } else {
      badgeObj[0].textContent = newAverage;
    }
  }
}
