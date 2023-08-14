export function getCalenderDays(view,calenderNavigation,currentDate) {
  currentDate = new Date(currentDate);

  if(view === "month"){
    if(calenderNavigation === "prev"){
      currentDate.setMonth(currentDate.getMonth() - 1);
    }else if(calenderNavigation === "next"){
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  }else if(view === "week"){
    if(calenderNavigation === "prev"){
      currentDate.setDate(currentDate.getDate() - 7);
    }else if(calenderNavigation === "next"){
      currentDate.setDate(currentDate.getDate() + 7);
    }
  }
  
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();



  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const prevMonth = new Date(currentYear, currentMonth, 0);

  let totalPrevMonthDays = firstDayOfMonth.getDay();
  const calenderDays = [];
  for (let i = 0; i < totalPrevMonthDays; i++) {
    calenderDays.unshift({ current: false, Date: new Date(prevMonth) });
    prevMonth.setDate(prevMonth.getDate() - 1);
  }

  while (firstDayOfMonth <= lastDayOfMonth) {
    calenderDays.push({ current: true, Date: new Date(firstDayOfMonth) });
    firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
  }
  totalPrevMonthDays = lastDayOfMonth.getDay();
  for (let i = 0; i < 7 - totalPrevMonthDays - 1; i++) {
    calenderDays.push({ current: false, Date: new Date(firstDayOfMonth) });
    firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
  }
  
  return calenderDays;
}


// export function getDaysOfPrevMonth(data) {
//   const currentMonth = today.getMonth();
//   if (data === "prev") {
//     today.setMonth(currentMonth - 1);
//   } else {
//     today.setMonth(currentMonth + 1);
//   }
//   const month = getDaysOfMonth();
//   return month;
// }

// export function getDaysofPrevWeek(data) {
//   const currentDay = today.getDay();
//   if (data === "prev") {
//     today.setDate(today.getDate() - 7);
//   } else {
//     today.setDate(today.getDate() + 7);
//   }
//   return getDaysOfMonth();
// }

export function getMonthNameAndYear(month, year) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[month]} ${year}`;
}

export function getToDay() {
  const date = new Date();
  today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return getDaysOfMonth();
}
