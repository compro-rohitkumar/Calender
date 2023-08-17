<template>
  <div class="grid">
    <div>All Day</div>
    <div v-for="day in props.calenderDays" :key="day" class="border" @click="toggleModal(day.Date)">
        <div v-for="event in day.event" :key="event.id" >
            <p :style="{backgroundColor:event.color}">{{ `${event.eventUser} : ${event.name}` }}</p>
        </div>
    </div>
  </div>
</template>

<script setup>
    const emit = defineEmits(['toggleModal'])
    const props = defineProps({
        calenderDays:{
            type:Array,
            default:()=>[]
        }
    })
    const toggleModal = (Date)=>{
        emit('toggleModal',Date)
    }
   
</script>

<style scoped>
    .grid{
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        text-align: center;
        align-items: center;
        border: 0.5px gray solid;
        min-height: 60px;
    }
    .border{
        height: 100%;
        display: grid;
        grid-direction: row;
        border: 0.5px gray solid;
    }
    .border p{
        margin-top: 6px;
        margin-bottom: 6px;
        margin-left: 2px;
        margin-right: 2px;
        padding: 2px;
        word-break: break-all;
        border-radius: 4px;
    }
</style>