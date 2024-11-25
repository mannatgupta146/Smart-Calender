$(function () {
    function updateClock() {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      $("#live_time").text(`Current Time: ${timeString}`);
    }
  
    function renderCalendar() {
      const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
      const lastDayOfMonth = new Date(currentYear, currentMonth, 0);
      const daysInMonth = lastDayOfMonth.getDate();
      const firstDayWeekday = firstDayOfMonth.getDay();
      
      calendarContent.empty();
      let dayCounter = 1;
  
      // Add blank spaces before the first day
      for (let i = 0; i < firstDayWeekday; i++) {
        calendarContent.append('<div class="blank"></div>');
      }
  
      // Add days of the month
      for (let i = firstDayWeekday; i < 7 && dayCounter <= daysInMonth; i++) {
        const isToday = isTodayDate(dayCounter);
        const divClass = isToday ? "today" : "";
        calendarContent.append(`<div class="${divClass}" data-date="${currentMonth} ${dayCounter}, ${currentYear}">${dayCounter}</div>`);
        dayCounter++;
      }
  
      // Add remaining days
      while (dayCounter <= daysInMonth) {
        for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
          const isToday = isTodayDate(dayCounter);
          const divClass = isToday ? "today" : "";
          calendarContent.append(`<div class="${divClass}" data-date="${currentMonth} ${dayCounter}, ${currentYear}">${dayCounter}</div>`);
          dayCounter++;
        }
      }
  
      // Update header
      calendarHeader.find('h1').text(`${monthNames[currentMonth - 1]} ${currentYear}`);
    }
  
    function isTodayDate(day) {
      const today = new Date();
      return today.getDate() === day && today.getMonth() + 1 === currentMonth && today.getFullYear() === currentYear;
    }
  
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth() + 1;
    
    const calendarContainer = $("#calendar");
    const calendarHeader = calendarContainer.find("#calendar_header");
    const calendarContent = calendarContainer.find("#calendar_content");
  
    // Initial render
    renderCalendar();
  
    // Previous month click handler
    calendarHeader.find("#prevMonth").on("click", function () {
      currentMonth--;
      if (currentMonth < 1) {
        currentMonth = 12;
        currentYear--;
      }
      renderCalendar();
    });
  
    // Next month click handler
    calendarHeader.find("#nextMonth").on("click", function () {
      currentMonth++;
      if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
      }
      renderCalendar();
    });
  
    // Live time update
    setInterval(updateClock, 1000);
    updateClock();
  });
  