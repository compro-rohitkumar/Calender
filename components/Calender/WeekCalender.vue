<template>
    <div class="grid">
        <div></div>
        <div v-for="day in props.calenderDays" :key="day">
            <p>{{ getWeekNameAndDate(day.Date) }}</p>
        </div>
    </div>
</template>


<script setup>
const props = defineProps({
    calenderDays:{
        type: Array,
        required: true
    },
})




</script>


<style scoped>
    .grid{
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        border: 0.5px gray solid;
        text-align: center;
    }
    .grid div{
        border: 0.5px gray solid;
        
    }
</style>