<template>
  <main>
    <h1>Calender</h1>
    <Navigation :date="date" @prev="PrevMonth" @next="NextMonth" />
    <!-- <CalenderWeekDay /> -->
    <div class="calender-container">
      <div
        class="calender-day"
        v-for="calenderDay in calenderDays"
        :key="calenderDay.Date"
        :data-date="calenderDay.Date"
        :style="{ height: `${calenderDay.height}px` }"
        @click="toggleModal(calenderDay.Date)"
      >
        <div class="calender-date" :class="{ selected: calenderDay.selected }">
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
          <p>{{ event.name }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
const emit = defineEmits(["openModal"]);
const view = ref("month");
//props from app.vue

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
const calenderDays = ref(
  getCalenderDays("month", "current", currentDate.value)
);

const events = computed(() =>
  props.all_events.map((item) => {
    return {
      name: item.what,
      startDate: new Date(item.startDate),
      endDate: new Date(item.endDate),
      color: item.backgroundColor,
      id: item.id,
    };
  })
);

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

onMounted(() => {
  linkEventToDate();
});


const PrevMonth = () => {
    calenderDays.value = getCalenderDays(view,"prev",date.value);
    const new_date = new Date(date.value);
    new_date.setMonth(new_date.getMonth() - 1);
    date.value = new_date;
    linkEventToDate();
};
const NextMonth = () => {
    console.log(date.value);
    calenderDays.value = getCalenderDays(view,"next",date.value);
    const new_date = new Date(date.value);
    new_date.setMonth(new_date.getMonth() + 1);
    date.value = new_date;
    linkEventToDate();
};

const prevWeek = () => {
    calenderDays.value = getCalenderDays(view,"prev",date.value);
    const new_date = new Date(date.value);
    new_date.setDate(new_date.getDate() + 7);
    date.value = new_date;
    linkEventToDate();
};
const nextWeek = () => {
    calenderDays.value = getCalenderDays(view,"next",date.value);
    const new_date = new Date(date.value);
    new_date.setDate(new_date.getDate() - 7);
    date.value = new_date;
    linkEventToDate();
};
const getCurrentMonth = () =>{
    calenderDays.value = getCalenderDays(view,"current",new Date());
    date.value = new Date();
    linkEventToDate();
}




const currentMonth = () =>{
    calenderDays.value = getDaysOfMonth(view,"current",date);
    date.value = new Date();
    linkEventToDate();
}

const date = ref(calenderDays.value[15]);





const toggleModal = (date) => {
  emit("openModal", date);
};
</script>

<style scoped>
.point {
  cursor: pointer;
}

.selected {
  background-color: #f8e8e8;
}

.prevnextmonth {
  color: rgb(229, 218, 218);
}

main {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
  /* color: white;
     */
  word-break: break-all;
}
</style>
