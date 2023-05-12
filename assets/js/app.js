$("input").keyup(function () {
  yearInput  = !isNaN(parseInt($("input").eq(0).val())) ? parseInt($("input").eq(0).val()) : 0
  monthInput = !isNaN(parseInt($("input").eq(1).val())) ? parseInt($("input").eq(1).val()) : 0
  dayInput   = !isNaN(parseInt($("input").eq(2).val())) ? parseInt($("input").eq(2).val()) : 0
  
  let today = new Date()
  let birth = new Date(yearInput,monthInput-1,dayInput)
  
  let leapYears = 0
  if(birth.getFullYear() < today.getFullYear()) {
    leapYears = funLeapYears(birth, today)
  } else {
    leapYears = funLeapYears(today, birth)
  }
  
  //converts the differnecs to days, months and years
  let diff = today - birth
  let days = Math.floor((diff / (1000 * 60 * 60 * 24)))-leapYears; // milliseconds * seconds * minutes * hours = days
  let years = Math.floor(days / 365);
  days -= years * 365;
  let months = Math.floor(days / (365/12));
  days -= months * (365/12);
  
  //displays the result
  $("h2").text(years + "-" + months + "-" + Math.floor(days))

  //if the input you are on is full you get send to the next input
  if (this.value.length == this.maxLength) {
    $(this).next('input').focus();
  }
});

/**==================================================
 * How many leap years there are between two years
 * @param {Date} startYear - Starting year
 * @param {Date} endYear - Ending year
 * @returns {number} - The number of leap years between the start and end year
==================================================**/
function funLeapYears(startYear, endYear) {
  let result = 0
  for (let i = startYear.getFullYear(); i != endYear.getFullYear(); i++) {
    if ((i % 4 === 0 && i % 100 !== 0) || i % 400 === 0) {
      result++;
    }
  }
  return result;
}