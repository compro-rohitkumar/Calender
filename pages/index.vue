<template>
  <ModalAddNewEvent :date="date" @closeModal="closeModal" v-if="modal" />
  <div class="root-container">
    <Calender
      @openModal="toggleModal"
      :all_events="userCreatedEvent"
      :key="update_component"
      :selected_events="selected_events"
    />
    <!-- calenderRightbar -->
    <EventNavBar
      :events="events"
      @addEvent="addEvent"
      @removeEvent="removeEvent"
    />
  </div>
</template>

<script setup>
const modal = ref(false);
const date = ref(null);
const userCreatedEvent = ref([]);
const update_component = ref(false);
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
  modal.value = true;
};
const color = ["#F87171", "#FBBF24", "#34D399", "#60A5FA"];

const closeModal = (prop = null) => {
  if (prop === null) {
    modal.value = false;
    return;
  }

  userCreatedEvent.value.push({
    what: prop.what,
    eventUser: prop.eventUser,
    id: prop.eventType,
    backgroundColor: color[prop.eventType],
    startDate: prop.startDate,
    endDate: prop.endDate,
  });
  console.log(userCreatedEvent.value);
  update_component.value = !update_component.value;
  modal.value = false;
};

const addEvent = (prop) => {
  selected_events.value.push(prop);
  console.log(selected_events.value);
  update_component.value = !update_component.value;
};
const removeEvent = (eventID) => {
  selected_events.value = selected_events.value.filter(
    (item) => item !== eventID
  );
  update_component.value = !update_component.value;
};
</script>

<style scoped>
.root-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 6rem;
}
</style>
