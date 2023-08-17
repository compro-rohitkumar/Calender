<template>
  <div class="navigation_bar">
    <div class="left">
      <button @click="CurrentFunction">Today</button>
      <button @click="previousFunction">Prev</button>
      <button @click="nextFunction">Next</button>
      <h2>{{ monthAndYear }}</h2>
    </div>
    <div class="middle">
      <button
        @click="changeView('month')"
        :class="{ selected: props.view === 'month' }"
      >
        Month
      </button>
      <button
        @click="changeView('week')"
        :class="{ selected: props.view === 'week' }"
      >
        Week
      </button>
    </div>
    <div>
      <button @click="toggleModal">Add Event</button>
    </div>
  </div>
</template>
  
  <script setup>
const props = defineProps({
  date: {
    type: Date,
    required: true,
  },
  view: {
    type: String,
    required: true,
  },
});
const emit = defineEmits([
  "prevMonth",
  "nextMonth",
  "prevWeek",
  "nextWeek",
  "changeView",
  "current",
  "openModal",
]);
const monthAndYear = ref(
  computed(() => {
    const date = props.date;
    return getMonthNameAndYear(date.getMonth(), date.getFullYear());
  })
);
const previousFunction = () => {
  if (props.view === "month") {
    emit("prevMonth");
  } else if (props.view === "week") {
    emit("prevWeek");
  }
};
const CurrentFunction = () => {
  emit("current");
};
const nextFunction = () => {
  if (props.view === "month") {
    emit("nextMonth");
  } else if (props.view === "week") {
    emit("nextWeek");
  }
};
const changeView = (view) => {
  emit("changeView", view);
};
const toggleModal = () => {
  emit("openModal");
};
</script>

<style scoped>
.navigation_bar {
  
  width: 100%;
  display: flex;
  display: row;
  justify-content: space-between;
  align-items: center;
}



.navigation_bar div {
  display: flex;
  justify-content: left;
  align-items: center;
}
.left{
  width:40%;
}

.navigation_bar button {
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1rem;
  transition: all;
  background: white;
  margin-right:0.3rem ;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  color: black;
  border:1px solid black;
  margin-bottom: 1rem;
}

.navigation_bar button:hover {
  background-color: #C8FFE0;
  opacity: 0.6;
  color: black;
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.navigation_bar h2 {
  margin-top: 6px;
  font-size: 1rem;
  font-weight: bold;
  justify-self: end;
}
.selected {
  background-color: #C8FFE0 !important;
}
.selected:hover {
  color:black !important;
}
.middle{
  display: flex;
  justify-self: left;
}
@media(max-width: 900px){
  .left h2{
    display: none;
  }
}

</style>