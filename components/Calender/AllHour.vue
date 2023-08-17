<template>
    <div class="scroll">
        <div class="container" v-for="i in 24" :key="i">
            <div class="time">
                <p>{{ i-1<=12?i-1:(i-1)%12}}</p>
            </div>
            <div v-for="j in 7" :key="j" class="cell" @click="addEvent(j,i)">
                
            </div>
        </div>
    </div>
</template>

<script setup>
    const emit = defineEmits(['addEvent'])
    const props = defineProps({
        calenderDays:{
            type: Array,
            required: true
        }
    })

    const addEvent = (day, time) => {
        
        day = new Date(props.calenderDays[day-1].Date);
        emit('addEvent', day)
    }


</script>

<style scoped>
    .scroll {
       height: 640px;
       overflow-y: scroll;
    }
    .container {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        text-align: center;
        align-items: center;
        border: 0.5px gray solid;
    }
    .time{
        text-align: center;
        /* background-color: #000; */
        color: black !important;
        padding: 20px;
        border: 0.5px gray solid;
    }
    .cell{
        height: 100%;
        border: 0.5px gray solid;
    }
    
</style>