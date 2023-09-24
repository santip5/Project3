function DatePicker(divId, dateSelectionCallback) {
    // initialize div element and callback
    this.div = document.getElementById(divId);
    this.dateSelectionCallback = dateSelectionCallback;
    this.selectedDate = new Date();     // Initialize the current date
    // render date
    this.render = function (date) {
        this.selectedDate = date;
      var currentDate = new Date(this.selectedDate);   // Create a new Date object for the selected month.
      currentDate.setDate(1); // Set date to the first of the month
      var daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];   // Store days of the week
   //building calendar
      var calendarHTML = '<div class="datepickerHeader">'; //div header
      calendarHTML += '<span class="prevMonth">&lt;</span>'; //previous month button
      calendarHTML += '<span class="currentMonth">' + currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) + '</span>'; //display month and year
      calendarHTML += '<span class="nextMonth">&gt;</span>'; //next month button
      calendarHTML += '</div>';
      calendarHTML += '<table class="datepickerTable">'; //space for grid
      calendarHTML += '<thead><tr>';
      for (var i = 0; i < daysOfWeek.length; i++) { //loop through days of week array to add them to calandar
        calendarHTML += '<th>' + daysOfWeek[i] + '</th>';
      }
      calendarHTML += '</tr></thead>'; //end days of week header
      calendarHTML += '<tbody>'; //creating table body

      // loop to create calendar cells
      while (currentDate.getMonth() === this.selectedDate.getMonth()) { //while current date is in the header month
        calendarHTML += '<tr>';
  
        for (var i = 0; i < 7; i++) {
          if (currentDate.getDay() === i) { //if current day matches loop value
            var temp = 'currentMonthDay';
            if (currentDate.getMonth() !== this.selectedDate.getMonth()) { //if month matches month loop value
              temp = 'otherMonthDay';
            }
            calendarHTML += '<td class=' + temp + '>' + currentDate.getDate() + '</td>'; //appends value to calendar grid with either class otherMonthDay or currentMonthDay
            currentDate.setDate(currentDate.getDate() + 1); // go to next day
          } 
          else {
            calendarHTML += '<td></td>';
          }
        }
        calendarHTML += '</tr>';
      }
  
      calendarHTML += '</tbody></table>';
      this.div.innerHTML = calendarHTML;    // put created calendar into the div 
      // add event listeners to buttons
      var prevMonthButton = this.div.querySelector('.prevMonth');
      var nextMonthButton = this.div.querySelector('.nextMonth');
      var global = this;    // Store a reference to the current instance for use in event listeners.
  
      prevMonthButton.addEventListener('click', function () {
        var previousMonth=new Date(global.selectedDate.getFullYear(), global.selectedDate.getMonth() - 1, 1); //creating the first day of the previous month with the same year.
        global.render(previousMonth);
      });
      nextMonthButton.addEventListener('click', function () {
        var nextMonth=new Date(global.selectedDate.getFullYear(), global.selectedDate.getMonth() + 1, 1); //creating the first day of the next month with the same year.
        global.render(nextMonth);
      });
    };
    // render calendar
    this.render(this.selectedDate);
  }

  // Testing code
  var datePicker = new DatePicker("div1", function (id, fixedDate) {
    console.log("DatePicker with id", id,
      "selected date:", fixedDate.month + "/" + fixedDate.day + "/" + fixedDate.year);
  });
  datePicker.render(new Date("July 4, 1776"));
  