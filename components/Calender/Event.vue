<template>
    <div class="flex flex-row m-1 items-center">
      <input type="checkbox" class="w-4 h-4" @click="handleClick()" checked />
      <img :src="image" alt="image" class="w-6 h-6" />
      <p class="text-sm font-medium text-gray-500 ml-2">{{ name }}</p>
    </div>
  </template>
  
  <script setup>
  const emit = defineEmits(["click"]);
  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  });
  const checked = ref(true);
  const name = computed(() => props.name);
  const image = computed(() => props.image);
  
  const handleClick = () => {
    checked.value = !checked.value;
    emit("click", {
      checked: checked.value,
      id: props.id,
    });
  };
  </script>


<style scoped>
    div{
        display: flex;
        align-items: center;
        margin:4px;
    }
    input{
        width: 16px;
        height: 16px;
    }
    image{
        width: 16px;
        height: 16px;
    }
    p{
        font-size: 12px;
        font-weight: 500;
        color: #374151;
    }
</style>