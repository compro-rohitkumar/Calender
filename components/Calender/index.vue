<template>
    <main>
        <h1>Calender</h1>
        <!-- <CalenderHeader :date="date" @prev="PrevMonth" @next="NextMonth" /> -->
        <!-- <CalenderWeekDay /> -->
        <div class="calender-body">
            <div class="calender-item" v-for="item in datesOfMonth" :key="item.Date" :data-date="item.Date"
                :class="{ 'selected': item.selected }" @click="toggleModal(item.Date)">
                <div class="calender-item-events">
                    <div class="calender-item-event-date">
                        <div class="text-center" :class="{ prevnextmonth: !item.current }">
                            {{ item.Date.getDate() }}
                        </div>
                    </div>
                    <div v-for="event in item.event" :key="event.name" class="calender-item-event"
                        :style="{ backgroundColor: event.color }">
                        <p>{{ event.name }}</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
const emit = defineEmits(["openModal"]);

//props from app.vue

const props = defineProps({
    Allevents: {
        type: Array,
        required: true,
        default: () => [],
    },
    selectedEvents: {
        type: Array,
        required: true,
        default: () => [],
    },
});

const datesOfMonth = ref(getDaysOfMonth());

const events = computed(() =>
    props.Allevents.map((item) => {
        return {
            name: item.what,
            startDate: new Date(item.startDate),
            endDate: new Date(item.endDate),
            color: item.backgroundColor,
            id: item.id,
        };
    })
);

const LinkEventToDate = () => {
    datesOfMonth.value.forEach((item) => {
        item.event = [];
        events.value.forEach((event) => {
            const date = new Date(event.startDate);
            date.setHours(0, 0, 0, 0);
            const endDate = new Date(event.endDate);
            endDate.setHours(23, 59, 59, 59);
            if (
                item.Date >= date &&
                item.Date <= endDate &&
                props.selectedEvents.includes(event.id)
            ) {
                item.event.push(event);
            }
        });
    });
};

onMounted(() => {
    LinkEventToDate();
});

const PrevMonth = () => {
    datesOfMonth.value = getDaysOfPrevMonth("prev");
    addEventindatesOfMonth();
};
const NextMonth = () => {
    datesOfMonth.value = getDaysOfPrevMonth("next");
    addEventindatesOfMonth();
};
const CurrentMonth = computed(() => datesOfMonth.value[15]);

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

.calender-body {
    width: 100%;
    display: grid;

    grid-template-columns: repeat(7, 1fr);
    border: 1px solid rgb(176, 172, 172,0.5);
}

.calender-item {
    text-align: center;
    border: 1px solid rgb(176, 172, 172);
    grid-column: span 1;
    min-height: 40px;
}

.calender-item-events {
    display: flex;
    flex-direction: column;
}

.calender-item-event-date {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 4px;
    margin-bottom: 4px;
}

.calender-item-event {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    border-radius: 5px;
    /* word-break: break-all; */
}

.calender-item-event p {
    margin: 0;
    padding: 0;
    font-size: 0.8rem;
    /* color: white;
     */
    word-break: break-all;
}
</style>
