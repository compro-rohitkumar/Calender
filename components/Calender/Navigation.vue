<template>
  <div class="navigation_bar">
    <div>
      <button @click="CurrentFunction">Today</button>
      <button @click="previousFunction">Prev</button>
      <button @click="nextFunction">Next</button>
      <h2>{{ monthAndYear }}</h2>
    </div>
    <div>
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
      <button>List</button>
      <button>TimeLine</button>
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
  display: flex;
  display: row;
  justify-content: space-between;
  align-items: center;
}
.navigation_bar div {
  display: flex;
  display: row;
}
.navigation_bar button {
  padding: 5px;
  margin-right: 6px;
  margin-bottom: 5px;
  border-radius: 10px;
  background-color: white;
  color: black;
  transition: hover;
}

.navigation_bar button:hover {
  background-color: black;
  color: white;
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
  background-color: #f8e8e8 !important;
}
</style>