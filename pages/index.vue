<template>
    <CalenderModal :date="date" @closeModal="closeModal" v-if="modal" />
    <div class="flex gap-2">
        <Calender @openModal="handleModal" @toggleModal="toggleModal" :event="userCreatedEvent" :key="trues"
            :selectedEvents="selectedEvents" />
        <!-- calenderRightbar -->
    </div>
</template>
    
<script setup>
const modal = ref(false);
const date = ref(null);
const userCreatedEvent = ref([]);
const trues = ref(false);
const events = ref([
    {
        name: "Holiday",
        image: "../assets/images/Holiday.png",
        id: 1,
    },
    {
        name: "Birthday",
        image: "../assets/images/BirthDay.png",
        id: 2,
    },
    {
        name: "Leave",
        image: "../assets/images/leave.png",
        id: 3,
    },
]);
const selectedEvents = ref(events.value.map((item) => item.id));

const handleModal = (dateOfClick) => {
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
    trues.value = !trues.value;
    modal.value = false;
};

const addEvent = (prop) => {
    selectedEvents.value.push(prop);
    console.log(selectedEvents.value);
    trues.value = !trues.value;
};
const removeEvent = (prop) => {
    console.log(prop);
    selectedEvents.value = selectedEvents.value.filter((item) => item !== prop);
    console.log(selectedEvents.value);
    trues.value = !trues.value;
};

</script>
    