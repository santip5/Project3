function DatePicker(divId, dateSelectionCallback) {
    // initialize div element and callback
    this.div = document.getElementById(divId);
    this.dateSelectionCallback = dateSelectionCallback;
    this.selectedDate = new Date();     // Initialize the current date
    // Store a reference to the DatePicker instance
    var self = this;

    // Add event listener for date selection
    this.div.addEventListener('click', function (event) {
      if (event.target.classList.contains('currentMonthDay')) {
        var selectedDate = new Date(self.selectedDate.getFullYear(), self.selectedDate.getMonth(), event.target.textContent);
        dateSelectionCallback(divId, {
          month: selectedDate.getMonth() + 1, // Months are zero-based, so add 1
          day: selectedDate.getDate(),
          year: selectedDate.getFullYear(),
        });
      }
    });
    // render date
    this.render = function (date) {
        this.selectedDate = date;
      var currentDate = new Date(this.selectedDate);   // Create a new Date object for the selected month.
      currentDate.setDate(1); // Set date to the first of the month
      var daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];   // Store days of the week
      // Create a variable to store the first day of the month
      var firstDayOfMonth = currentDate.getDay();
      // Calculate the number of days in the previous month
      var daysInPreviousMonth = new Date(
          this.selectedDate.getFullYear(),
          this.selectedDate.getMonth(),
          0
      ).getDate();
      // Calculate the number of days in the current month
      var daysInMonth = new Date(
          this.selectedDate.getFullYear(),
          this.selectedDate.getMonth() + 1,
          0
      ).getDate();
      // Calculate the total number of days to display in the calendar
      var totalDays = firstDayOfMonth + daysInMonth;
      // Calculate the total number of rows needed
      var numRows = Math.ceil(totalDays / 7);
      // Create a variable to keep track of the day being displayed
      var currentDay = 1;
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
      for (var row = 0; row < numRows; row++) {
        calendarHTML += '<tr>';

        for (var col = 0; col < 7; col++) {
          if (row === 0 && col < firstDayOfMonth) {
            // Display days from the previous month
            var day = daysInPreviousMonth - firstDayOfMonth + col + 1;
            calendarHTML += '<td class="otherMonthDay">' + day + '</td>';
          } else if (currentDay <= daysInMonth) {
            // Display days from the current month
            calendarHTML += '<td class="currentMonthDay">' + currentDay + '</td>';
            currentDay++;
          } else {
            // Display days from the next month
            calendarHTML += '<td class="otherMonthDay">' + (currentDay - daysInMonth) + '</td>';
            currentDay++;
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


  