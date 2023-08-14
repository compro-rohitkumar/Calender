<template>
  <div class="backdrop w-full"></div>

  <div class="Modal">
    <div class="modal_container">
      <div class="button_container">
        <button @click="handleCancel">Cancel</button>
      </div>
      <h2 class="m-4 text-2xl">Create Event</h2>
      <div class="input_container">
        <label class="event_label">Event Type</label>
        <select class="select" v-model="eventType">
          <option value="1">Holiday</option>
          <option value="2">Birthday</option>
          <option value="3">Leave</option>
        </select>
      </div>
      <div class="line"></div>
      <div class="input_container">
        <label class="event_label">What</label>
        <input type="text" v-model="what" />
      </div>
      <div class="input_container">
        <label class="event_label">Event User</label>
        <select class="select" v-model="eventUser">
          <option v-for="user in props.users" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>
      <div class="input_container">
        <label class="event_label">Start Date</label>
        <input type="date" v-model="eventStartDate" />
      </div>
      <div class="input_container">
        <label class="event_label">End Date</label>
        <input type="date" v-model="eventEndDate" />
      </div>
      <div class="input_container_button">
        <button
          type="submit"
          :disabled="
            what.trim() === '' ||
            eventType.trim() === '' ||
            eventStartDate.trim() === '' ||
            eventEndDate.trim() === ''
          "
          @click="handleSubmit"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>
  
<script setup>


const props = defineProps({
  date: {
    type: Date,
    default: () => new Date(),
  },
  users:{
    type:Array,
    default:()=>[]
  }
});
const data = new Date(props.date);
let day = data.getDate();
let month = data.getMonth() + 1;

if (day < 10) {
  day = "0" + day;
}
if (month < 10) {
  month = "0" + month;
}

const eventStartDate = ref(`${data.getFullYear()}-${month}-${day}`);
const eventEndDate = ref(`${data.getFullYear()}-${month}-${day}`);
const eventUser = ref("");
const what = ref("");
const eventType = ref("1");

const emit = defineEmits(["closeModal", "toggleModal"]);

const getUserName = (id, users) => {
  const user = users.find((user) => user.id === Number(id));
  return user.name;
};

const handleSubmit = () => {
  const evenDetail = {
    eventUser: getUserName(eventUser.value, props.users),
    what: what.value,
    eventType: Number(eventType.value),
    startDate: eventStartDate.value,
    endDate: eventEndDate.value,
  };
  emit("closeModal", evenDetail);
};
const handleCancel = () => {
  emit("closeModal");
};
</script>
  
<style scoped>
.form {
  width: 100%;
  height: 32rem;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.Modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  width: 100%;
}

.modal_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  background-color: #f8e8e8;
  margin: auto;
  border-radius: 10px;
  position: relative;
  animation: slide-up 0.4s linear;
}



.button_container {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.5rem;
  
}

.button_container button {
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1rem;
  transition: all;
  background: white;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  color: black;
}

.button_container button:hover {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  background: black;
  color: white;
}

.line {
  border-bottom: 2px;
  border-color: black;
}

.input_container {
  display: grid;
  grid-template-columns: 1fr 5fr;
  justify-content: left;
  align-items: center;
  width: 80%;
  margin: 0 0.4rem;
  
  animation: slide-up 0.3s linear;
  animation-delay: 0.4s;
  animation-fill-mode: both;
}

.event_label {
  text-align: left;
  column-span: 2;
  justify-self: right;
}

.input_container input,
select {
  column-span: 3;
  margin: 0.6rem;
  margin-left: 3rem;
  border: 4px;
  height: 1rem;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  align-self: flex-end;
}

.input_container_button {
  margin: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: slide-up 0.3s linear;
  animation-delay: 0.4s;
  animation-fill-mode: both;
}

.input_container_button button {
  border: none;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: larger;
  border-radius: 10px;
  background-color: white;
  color: black;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;
  
}

.input_container_button button:hover {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  background: black;
  color: white;
}

.select {
  height: 2rem;
  padding: 0;
  background-color: white;
}

@keyframes slide-up{
  from{
    opacity: 0;
    transform:  translateY(100%);
    size: 0%;
    
  }
  to{
    opacity: 1;
    transform: none;
    size: 100%;
  }

}
</style>
  