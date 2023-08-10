<template>
    <main>
        <h1>Calender</h1>
        <!-- <CalenderHeader :date="date" @prev="PrevMonth" @next="NextMonth" /> -->
        <!-- <CalenderWeekDay /> -->
        <div class="calender-container">
            <div class="calender-day" v-for="item in CalenderDate" :key="item.Date" :data-date="item.Date"
                :style="{ height: `${item.height}px` }" @click="toggleModal(item.Date)">
                <div class="calender-day-events">
                    <div class="calender-date" :class="{'selected':item.selected,}">
                        <div class="text-center" :class="{ 'prevnextmonth': !item.current}">
                            {{ item.Date.getDate() }}
                        </div>
                    </div>
                    <div v-for="event in item.event" :key="event.name" class="calender-event"
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
    event: {
        type: Array,
        default: () => [],
    },
    selectedEvents: {
        type: Array,
        default: () => [],
    },
});


const CalenderDate = ref(getDaysOfMonth());

const events = computed(() =>
    props.event.map((item) => {
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
   CalenderDate.value.forEach((item) => {
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
    // giveHeightToEachRow();
});

// const PrevMonth = () => {
//     // implement this

//    CalenderDate.value = getDaysOfPrevMonth("prev");
//     // addEventindatesOfMonth();
//     // giveHeightToEachRow();
// };
// const NextMonth = () => {
//     // implement this

//    CalenderDate.value = getDaysOfPrevMonth("next");
//     // addEventindatesOfMonth();
//     // giveHeight();
// };
const CurrentMonth = computed(() =>CalenderDate.value[15]);

const toggleModal = (date) => {
    emit("openModal", date);
};
</script>
  
<style scoped>
.point {
    cursor: pointer;
}
.selected{
    border:  solid rgb(8, 249, 48);
}
.prevnextmonth{
    color: rgb(229, 218, 218)
}
main {
    display: flex;
    flex-direction: column;
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
    border: 1px solid rgb(176, 172, 172)
}

.calender-day {
    text-align: center;
    border: 1px solid rgb(176, 172, 172);
    grid-column: span 1;

}

.calender-day-events {
    display: flex;
    flex-direction: column;
}

.calender-date {
    display: flex;
    justify-content: center;
    align-items: center;
}

.calender-event {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1px;
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
