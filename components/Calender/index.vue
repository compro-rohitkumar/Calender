<template>
  <main>
    <h1>Calender</h1>
    <Navigation
      :date="currentDate"
      @current="getCurrentMonth"
      @prevMonth="PrevMonth"
      @nextMonth="NextMonth"
      @prevWeek="prevWeek"
      @nextWeek="nextWeek"
      @changeView="changeView"
      @openModal="toggleModal(new Date())"
      :view="view"
      :key="view"
    />
    <div v-if="view === 'week'">
      
     <div class="calender-week-container">
      <div class="time">
        
      </div>
      <div v-for="day in calenderDays" :key="day">
        <p>{{ getWeekNameAndDate(day.Date) }}</p>
        
      </div>
     </div>
      <div class="all-day">
        <div>
          <p>all day</p>
        </div>
        <div v-for="day in calenderDays" :key="day">
          <div
            v-for="event in day.event"
            :key="event.name"
            class="calender-event"
            :style="{ backgroundColor: event.color }"
          >
            <p>{{ `${event.eventUser} : ${event.name}` }}</p>
          </div>
        </div>
      </div>


    </div>
    <div v-if="view === 'month' ">
      <WeekDay />
      <div class="calender-container">
        <div
          class="calender-day"
          v-for="calenderDay in calenderDays"
          :key="calenderDay.Date"
          :data-date="calenderDay.Date"
          @click="toggleModal(calenderDay.Date)"
          :class="{
            current: current(calenderDay.Date),
            selected: select(calenderDay.Date),
          }"
        >
          <div class="calender-date">
            <p
              class="text-center"
              :class="{ prevnextmonth: !calenderDay.current }"
            >
              {{ calenderDay.Date.getDate() }}
            </p>
          </div>
          <div
            v-for="event in calenderDay.event"
            :key="event.name"
            class="calender-event"
            :style="{ backgroundColor: event.color }"
          >
            <p>{{ `${event.eventUser} : ${event.name}` }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
const emit = defineEmits(["openModal"]);
const view = ref("week");

const props = defineProps({
  all_events: {
    type: Array,
    default: () => [],
  },
  selected_events: {
    type: Array,
    default: () => [],
  },
});



const currentDate = ref(new Date());
const calenderDays = ref(null);

const changeView = (viewValue) => {
  view.value = viewValue;
  if(viewValue === 'week'){
    calenderDays.value = changeViewToWeek()
  }else{
    calenderDays.value = changeViewToMonth()
  }
};

const events = computed(() =>
  props.all_events.map((item) => {
    return {
      name: item.what,
      eventUser: item.eventUser,
      startDate: new Date(item.startDate),
      endDate: new Date(item.endDate),
      color: item.backgroundColor,
      id: item.id,
    };
  })
);
const select = (date) => {
  return (
    date.getDate() === currentDate.value.getDate() &&
    date.getMonth() === currentDate.value.getMonth() &&
    date.getFullYear() === currentDate.value.getFullYear()
  );
};
const linkEventToDate = () => { 
  calenderDays.value.forEach((item) => {
    item.event = [];
    events.value.forEach((event) => {
      const date = new Date(event.startDate);
      date.setHours(0, 0, 0, 0);
      const endDate = new Date(event.endDate);
      endDate.setHours(23, 59, 59, 59);
      if (
        item.Date >= date &&
        item.Date <= endDate &&
        props.selected_events.includes(event.id)
      ) {
        item.event.push(event);
      }
    });
  });
};
const current = (date) => {
  const persentDate = new Date();
  persentDate.setHours(0, 0, 0, 0);
  return (
    date.getDate() === persentDate.getDate() &&
    date.getMonth() === persentDate.getMonth() &&
    date.getFullYear() === persentDate.getFullYear()
  );
};

onMounted(() => {
  calenderDays.value = getCalenderDays(
    view.value,
    "current",
    currentDate.value
  );
  linkEventToDate();
});



const PrevMonth = () => {
  calenderDays.value = getCalenderDays(view.value, "prev", currentDate.value);
  const new_date = new Date(currentDate.value);
  new_date.setMonth(new_date.getMonth() - 1);
  currentDate.value = new_date;
  linkEventToDate();
};
const NextMonth = () => {
  calenderDays.value = getCalenderDays(view.value, "next", currentDate.value);
  const new_date = new Date(currentDate.value);
  new_date.setMonth(new_date.getMonth() + 1);
  currentDate.value = new_date;
  linkEventToDate();
};

const prevWeek = () => {
  calenderDays.value = getCalenderDays(view.value, "prev", currentDate.value);
  const new_date = new Date(currentDate.value);
  new_date.setDate(new_date.getDate() - 7);
  currentDate.value = new_date;
  linkEventToDate();
};
const nextWeek = () => {
  calenderDays.value = getCalenderDays(view.value, "next", currentDate.value);
  const new_date = new Date(currentDate.value);
  new_date.setDate(new_date.getDate() + 7);
  currentDate.value = new_date;
  linkEventToDate();
};
const getCurrentMonth = () => {
  calenderDays.value = getCalenderDays(view.value, "current", new Date());
  currentDate.value = new Date();
  linkEventToDate();
};

const getCurrentWeek = () => {
  calenderDays.value = getCalenderDays(view.value, "current", new Date());
  currentDate.value = new Date();
  linkEventToDate();
};

const changeViewToWeek = () =>{
  calenderDays.value = getCalenderDays(view.value, "current", currentDate.value);
  linkEventToDate();
}

const changeViewToMonth = () =>{
  calenderDays.value = getCalenderDays(view.value, "current", currentDate.value);
  linkEventToDate();
}



const toggleModal = (date) => {
  emit("openModal", date);
};
</script>

<style scoped>
.point {
  cursor: pointer;
}

.selected {
  background-color: #c8ffe0;
}

.current {
  background-color: #85e6c5;
}

.prevnextmonth {
  color: rgb(229, 218, 218);
}

main {
  display: flex;
  flex-direction: column;
  width: 80%;
}

h1 {
  font-size: 1.5rem;
  margin-top: 1rem;
  font-weight: bold;
  justify-items: center;
  align-items: center;
  text-align: center;
}

.calender-container {
  width: 100%;
  display: grid;

  grid-template-columns: repeat(7, 1fr);
  border: 1px solid rgb(176, 172, 172, 0.5);
}

.calender-day {
  text-align: center;
  border: 1px solid rgb(176, 172, 172);
  grid-column: span 1;
  min-height: 40px;
}

.calender-day-events {
  display: flex;
  flex-direction: column;
}

.calender-date {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
  margin-bottom: 4px;
}

.calender-event {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  border-radius: 5px;
  /* word-break: break-all; */
}

.calender-event p {
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
  word-break: break-all;
}
.calender-week-container{
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  border: 1px solid rgb(176, 172, 172, 0.5);
  justify-content: center;
  align-items: center;
  text-align: center;
}
.calender-week-container div{
  border-left: 0.5px gray solid;
}
</style>
