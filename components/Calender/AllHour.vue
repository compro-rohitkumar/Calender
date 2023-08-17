<template>
    <div class="scroll">
        <div class="container" v-for="i in 24" :key="i">
            <div class="time">
                <p>{{ i-1<=12?i-1:(i-1)%12}}</p>
            </div>
            <div v-for="j in 7" :key="j" class="cell" @click="addEvent" :data-index="j" :data-hour="i">
                
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

    const addEvent = (e) => {
        var y = e.clientY;
        const target = e.target;
        const rect = target.getBoundingClientRect();
        const pos = e.clientY - rect.top;
        const index = e.target.getAttribute('data-index');
        const date = props.calenderDays[index-1].Date;
        const hour = e.target.getAttribute('data-hour');
        date.setHours(hour-1);
        date.setMinutes(Math.floor(pos));
        emit('addEvent',date);

    }


</script>

<style scoped>
    .scroll {
       height: 50vh;
       overflow-y: scroll;
       border-bottom:0.5px gray solid ;
       
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
        border: 0.5px gray solid;
        height: 60px;
    }
    .cell{
        height: 60px;
        border: 0.5px gray solid;
    }
    
</style>