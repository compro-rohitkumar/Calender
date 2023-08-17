<template>
  <h1>Compro Calender</h1>
  <ModalAddNewEvent  :date="date" :users="users" @closeModal="closeModal" v-if="modal" />
  <div class="root-container">
    <Calender @openModal="toggleModal" :all_events="userCreatedEvent" :selected_events="selected_events" @toggleHourModel="toggleHourModel"/>
    <!-- calenderRightbar -->
    <EventNavBar :events="events" @addEvent="addEvent" @removeEvent="removeEvent" />
  </div>
</template>

<script setup>
const modal = ref(false);
const modalHour = ref(false);
const date = ref(null);
const userCreatedEvent = ref([]);
const update_component = ref(false);
const users = ref([
  {
    name: "Nirmal Kumar",
    id: 1,
  },
  {
    name: "Manpreet Singh",
    id: 2,
  },
  {
    name: "Parveen Kumar",
    id: 3,
  },
  {
    name: "Manoj saini",
    id: 4,
  },
  {
    name: "Ashmeet Kaur",
    id: 5,
  },
  {
    name: "Susanto Mondal",
    id: 6,
  },
  {
    name: "Rohan Goel",
    id: 7,
  },
  {
    name: "Sarthak Jain",
    id: 8,
  },
  {
    name: "Rohit Kumar",
    id: 9,
  },
  {
    name: "Gopal Gupta",
    id: 10,
  },
]);
const events = ref([
  {
    name: "Holiday",
    image: "/images/Holiday.png",
    id: 1,
  },
  {
    name: "Birthday",
    image: "/images/BirthDay.png",
    id: 2,
  },
  {
    name: "Leave",
    image: "/images/leave.png",
    id: 3,
  },
]);
const selected_events = ref(events.value.map((item) => item.id));

const toggleModal = (dateOfClick) => {
  date.value = dateOfClick;
  window.scrollTo(0, 0);
  modal.value = true;
};

const toggleHourModel = (dateOfClick) => {

  date.value = dateOfClick;
  window.scrollTo(0, 0);
  modal.value = true;
};

const color = ["#F87171", "#FBBF24", "#34D399", "#60A5FA"];


const closeHourModal = (prop =null) => {
  console.log(prop);
  if (prop === null) {
    
    modalHour.value = false;
    
    return;
  }
  userCreatedEvent.value = [...userCreatedEvent.value, {
    what: prop.what,
    eventUser: prop.eventUser,
    id: prop.eventType,
    backgroundColor: color[prop.eventType],
    startDate: prop.startDate,
    endDate: prop.endDate,
    startTime: prop.startTime,
    endTime: prop.endTime,
  }]
  modalHour.value = false;
}


const closeModal = (prop = null) => {
  if (prop === null) {
    modal.value = false;
    
    return;
  }
  userCreatedEvent.value = [...userCreatedEvent.value, {
    what: prop.what,
    eventUser: prop.eventUser,
    id: prop.eventType,
    backgroundColor: color[prop.eventType],
    startDate: prop.startDate,
    endDate: prop.endDate,
  }]
  modal.value = false;
  
};

const addEvent = (prop) => {
  selected_events.value = [...selected_events.value, prop];
};
const removeEvent = (eventID) => {
  selected_events.value = [...selected_events.value.filter((item) => item !== eventID)]
};
</script>

<style scoped>
.root-container {
  margin: 14px 12px;
  padding: 16px 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow-y: hidden;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
h1{
  margin-left: 12px;
  padding-left: 12px;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: xx-large;
}
</style>
