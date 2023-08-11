<template>
  <div class="RightBar_container">
    <p>Compro Calender</p>
    <div>
      <event
        v-for="item in props.events"
        :key="item.id"
        :name="item.name"
        :image="item.image"
        :id="item.id"
        @click="handleClick"
      />
    </div>
  </div>
</template>
  
<script setup>
const emit = defineEmits(["addEvent", "removeEvent"]);
const props = defineProps({
  events: {
    type: Array,
    required: true,
  },
});

const handleClick = (prop) => {
  if (prop.checked) {
    emit("addEvent", prop.id);
  } else {
    emit("removeEvent", prop.id);
  }
};
</script>
<style scoped>
.RightBar_container {
  margin-left: 2rem;
  width: 20%;
}

.RightBar_container p {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
}

.RightBar_container div {
  display: flex;
  flex-direction: column;
}
</style>
  