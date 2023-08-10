<template>
    <div class="RightBar-container">
        <p>Compro Calender</p>
        <div>
            <CalenderEvent v-for="item in props.events" :key="item.id" :name="item.name" :image="item.image" :id="item.id"
                @click="handleClick" />
        </div>
    </div>
</template>
  
<script setup>
const emit = defineEmits(["include", "exclude"]);
const props = defineProps({
    events: {
        type: Array,
        required: true,
    },
});

const handleClick = (prop) => {
    if (prop.checked) {
        emit("include", prop.id);
    } else {
        // console.log(prop.id)
        emit("exclude", prop.id);
    }
};
</script>


<style scoped>
.RightBar-container {
    margin-left: 2rem;
    width: 20%;
}

.RightBar-container p {
    font-size: 1.5rem;
    font-weight: 600;
    color: #374151;
}

.RightBar-container div {
    display: flex;
    flex-direction: column;
}
</style>
  