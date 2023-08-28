<template>
  <ModalAddNewEvent  :date="date" :users="users" :event="event"  @closeModal="closeModal" v-if="modal" />
  <ModalAddNewEventHour  :dateAndTime="date" :event="events" :users="users" @closeModal="closeHourModal" v-if="modalHour" />
  <TaskModal v-if="taskModal" :event="event" @closeTaskModal="toggleTaskModal" @deleteEvent="deleteEvent" @editEvent="editEvent"/>
  <AllEventModal v-if="showAllEvent" :event="event" @closeAllEventModal="toggleViewAllEvent" @showTask="showTask"/>
  <div class="root-container">
    <Calender @openModal="toggleModal" :all_events="userCreatedEvent" :event_hour="userCreatedEventHour"  :selected_events="selected_events" @toggleModel="toggleModal" @toggleHourModel="toggleHourModel" @toggleTaskModal="toggleTaskModal" @toggleViewAllEvent="toggleViewAllEvent"/>
    <!-- calenderRightbar -->
    <EventNavBar :events="events" @addEvent="addEvent" @removeEvent="removeEvent" />
  </div>
</template>

<script setup>
import { uuid } from 'vue-uuid';
const modal = ref(false);
const modalHour = ref(false);
const date = ref(null);
const userCreatedEvent = ref([]);
const userCreatedEventHour = ref([]); 
const taskModal = ref(false);
const event = ref(null);
const showAllEvent = ref(false);
const getId = () => {
  return uuid.v4();
};
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
    image: "/images/home.svg",
    fillImage: "/images/home-fill.svg",
    id: 1,
  },
  {
    name: "Birthday",
    image: "/images/birthDay.svg",
    fillImage: "/images/birthDay-fill.svg",
    id: 2,
  },
  {
    name: "Leave",
    image: "/images/leave.svg",
    fillImage: "/images/leave-fill.svg",
    id: 3,
  },
]);
const selected_events = ref(events.value.map((item) => item.id));

const toggleModal = (dateOfClick) => {
  event.value = null;
  date.value = dateOfClick;
  window.scrollTo(0, 0);
  modal.value = true;
};

const toggleHourModel = (dateOfClick) => {

  date.value = (dateOfClick);
  window.scrollTo(0, 0);
  modalHour.value = true;
};

const color = ["#F87171", "rgb(11, 128, 67)", "rgb(51,182,121)", "rgb(121,134,203)"];


const closeHourModal = (prop =null) => {
  if (prop === null) {
    modalHour.value = false;
    return;
  }
  userCreatedEventHour.value = [...userCreatedEventHour.value, {
    _id: this.$uuid.v4(),
    what: prop.what,
    eventUser: prop.eventuser,
    id: prop.eventType,
    backgroundColor: color[prop.eventType],
    startDate: new Date(prop.startDate),
    endDate: new Date(prop.endDate),
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
  if(prop._id){
    const index = userCreatedEvent.value.findIndex((item) => item._id === prop._id);
    console.log(index);
    userCreatedEvent.value[index] = {
      _id: prop._id,
      what: prop.what,
      eventUser: prop.eventUser,
      id: prop.eventType,
      backgroundColor: color[prop.eventType],
      startDate: new Date(prop.startDate),
      endDate: new Date(prop.endDate),
      eventDescription: prop.eventDescription,
    }
    console.log(userCreatedEvent.value[index]);
    userCreatedEvent.value = [...userCreatedEvent.value];
    modal.value = false;
    return;
  }
  userCreatedEvent.value = [...userCreatedEvent.value, {
    _id:getId(),
    what: prop.what,
    eventUser: prop.eventUser,
    id: prop.eventType,
    backgroundColor: color[prop.eventType],
    startDate: prop.startDate,
    endDate: prop.endDate,
    eventDescription: prop.eventDescription,
  }]
  modal.value = false;
  
};



const addEvent = (prop) => {
  selected_events.value = [...selected_events.value, prop];
};
const removeEvent = (eventID) => {
  selected_events.value = [...selected_events.value.filter((item) => item !== eventID)]
};
const toggleTaskModal = (prop) => {
  event.value = prop;
  taskModal.value = !taskModal.value;
}
const toggleViewAllEvent = (prop=null) => {
  if(prop === null){
    showAllEvent.value = !showAllEvent.value;
    return;
  }
  event.value = prop;
  showAllEvent.value = !showAllEvent.value;
}

const deleteEvent = (prop) => {
  taskModal.value = false;
  userCreatedEvent.value = [...userCreatedEvent.value.filter((item) => item._id !== prop)]
}
const showTask = (prop) => {
  event.value = prop;
  showAllEvent.value = false;
  taskModal.value = true;
}
const editEvent = (prop) => {
  taskModal.value = false;
  const index = userCreatedEvent.value.findIndex((item) => item._id === prop);
  const date = new Date(userCreatedEvent.value[index].startDate);
  event.value = userCreatedEvent.value[index];
  modal.value = true;
  
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Alata&family=Anton&family=Barlow+Semi+Condensed:wght@400;500;600&family=Josefin+Sans:wght@300&family=Open+Sans:ital,wght@0,300;1,300&family=Roboto:wght@300&display=swap');
.root-container {
  /* margin: 14px 12px;
  padding: 16px 12px; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow-y: hidden;
  font-family: 'Roboto', sans-serif;
  min-width: 873px;
}

</style>
