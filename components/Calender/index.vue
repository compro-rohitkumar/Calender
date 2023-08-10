<template>
    <main>
        <h1>Calender</h1>
        <!-- <CalenderHeader :date="date" @prev="PrevMonth" @next="NextMonth" /> -->
        <!-- <CalenderWeekDay /> -->
        <div class="calender-body">
            <div class="calender-item" v-for="item in datesOfMonth" :key="item.Date" :data-date="item.Date"
                :style="{ height: `${item.height}px` }" @click="toggleModal(item.Date)">
                <div class="calender-item-events">
                    <div class="calender-item-event-date">
                        <div class="text-center" :class="{ 'text-gray-200': !item.current }">
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
import {getDaysOfMonth, getDaysOfPrevMonth} from "../../util/getDate";
const emit = defineEmits(["openModal"]);

//props from app.vue

const props = defineProps({
    event: {
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

// const giveHeightToEachRow = () => {
//     const div = document.createElement("div");
//     div.style.width = document.querySelector(".cal").offsetWidth + "px";
//     const p = document.createElement("p");
//     p.innerText = "1";
//     p.style.margin = "1px";
//     div.appendChild(p);
//     const range = document.createRange();
//     range.selectNodeContents(div);

//     const fragment = range.cloneContents();
//     div.style.position = "absolute";
//     div.style.visibility = "hidden";
//     div.style.display = "block";

//     div.style.top = "-9999px";
//     div.appendChild(fragment);
//     document.body.appendChild(div);

//     let child = 1;
//     for (let i = 0; i < datesOfMonth.value.length; i += 7) {
//         let max_height = div.offsetHeight;
//         for (let j = i; j < i + 7; j++) {
//             let local_height = div.offsetHeight;
//             datesOfMonth.value[j].event.map((item) => {
//                 child = child + 1;
//                 const p1 = document.createElement("p");
//                 p1.innerText = item.name;
//                 p1.style.margin = "2px";
//                 p1.classList.add("break-all")
//                 div.appendChild(p1);
//                 local_height = div.offsetHeight;
//             });
//             while (child !== 1) {
//                 div.removeChild(div.lastChild);
//                 child = child - 1;
//             }
//             if (local_height > max_height) {
//                 max_height = local_height;
//             }
//         }

//         for (let j = i; j < i + 7; j++) {
//             datesOfMonth.value[j].height = max_height;
//         }
//     }
//     document.body.removeChild(div);
// };

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
    // giveHeightToEachRow();
});

const PrevMonth = () => {
    // implement this

    datesOfMonth.value = getDaysOfPrevMonth("prev");
    // addEventindatesOfMonth();
    // giveHeightToEachRow();
};
const NextMonth = () => {
    // implement this

    datesOfMonth.value = getDaysOfPrevMonth("next");
    // addEventindatesOfMonth();
    // giveHeight();
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

.calender-body {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border: 1px solid rgb(176, 172, 172)
}

.calender-item {
    text-align: center;
    border: 1px solid rgb(176, 172, 172);
    grid-column: span 1;

}

.calender-item-events {
    display: flex;
    flex-direction: column;
}

.calender-item-event-date {
    display: flex;
    justify-content: center;
    align-items: center;
}

.calender-item-event {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1px;
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
  