let today,count=0; ;
export function getDaysOfMonth() {
  if(count==0){
    today = new Date();
    count++;
  }
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const prevMonth = new Date(currentYear, currentMonth, 0);
  
  let no_of_day=firstDayOfMonth.getDay();
  const days = [];
  for(let i=0;i<no_of_day;i++){
    days.unshift({current:false,Date:new Date(prevMonth)});
    prevMonth.setDate(prevMonth.getDate() - 1);
    // dt.setDate(dt.getDate() );
  }
  
  const currentDate = new Date(firstDayOfMonth);
  while (currentDate <= lastDayOfMonth) {
    days.push({current:true,Date:new Date(currentDate)});
    currentDate.setDate(currentDate.getDate() + 1);
  }
  no_of_day=lastDayOfMonth.getDay();
  for(let i=0;i<7-no_of_day-1;i++){
    days.push({current:false,Date:new Date(currentDate)});
    currentDate.setDate(currentDate.getDate() + 1);
}

  
  return days;
}

export function getDaysOfPrevMonth(data) {
    const currentMonth = today.getMonth();
    if(data === "prev"){
        today.setMonth(currentMonth-1);
    }else{
        today.setMonth(currentMonth+1);
    }
    const month = getDaysOfMonth();
    return month;
}

export function getDaysofWeek(){
    const currentDay = today.getDay();
    const days = [];
    const currentDate = new Date(today);
    for(let i=0;i<7;i++){
        days.push({current:currentDay===i,Date:new Date(currentDate)});
        currentDate.setDate(currentDate.getDate() + 1);
    }
}

export function getDaysofPrevWeek(data){
    const currentDay = today.getDay();
    if(data === "prev"){
        today.setDate(today.getDate()-7);
    }else{
        today.setDate(today.getDate()+7);
    }
    const days = [];
    const currentDate = new Date(today);
    for(let i=0;i<7;i++){
        days.push({current:currentDay===i,Date:new Date(currentDate)});
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
}

export function getMonthNameAndYear(month,year){
  const months=["January","February","March","April","May","June","July","August","September","October","November","December"]
  return `${months[month]} ${year}`;
}
