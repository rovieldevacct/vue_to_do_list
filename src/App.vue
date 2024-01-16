<template>  
  <div class="centeredBaseDiv">
    <div class="headerText">
      <MyIndex/>
    </div>
    <div class="navDiv">
    <NavBars :totalTask="totalTask" :completedTask="completedTask" @deleteAllTask="handleDeleteAllTask"/>
    </div>
    <div class="storedDataDiv">
      <StoredData :tasks="tasks" @taskDeleted="handleTaskDelete" />
    </div>
    <div class="navDiv">
      <AddTaskForm @taskSubmit="handleTaskSubmit"/>
    </div>
    
  </div>
</template>

<script setup>
import MyIndex from './components/MyIndex.vue'
import NavBars from './components/NavBars.vue'
import StoredData from './components/StoredData.vue'
import AddTaskForm from './components/AddTaskForm.vue'
import { ref, computed, onMounted, watch } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const tasks = ref([]);
const idCtr = ref([]);
/*
const tasks = ref([
  {id: 1, name: "test me", status: {done: false}},
  {id: 2, name: "random", status: {done: true}},
  {id: 3, name: "task", status: {done: false}},
]);
*/

//mounting the localstorage data if anything is present
onMounted(() => {
  const cachedSavedTask = JSON.parse(localStorage.getItem('tasks'));
  const idCtrCached = JSON.parse(localStorage.getItem('idCtr'));
  if(cachedSavedTask){
    tasks.value = cachedSavedTask;
    if(idCtrCached){
      idCtr.value[0].id = 1;
    }else{
      idCtr.value = idCtrCached;
    }
  }else{
    tasks.value = [
      {id: 1, name: "test me", status: {done: false}},
      {id: 2, name: "random", status: {done: true}},
      {id: 3, name: "task", status: {done: false}},
    ]
    idCtr.value = [{id: 3}];
  }  

});

//checks for any updates in local storage
watch(tasks, (newVal) =>{
  localStorage.setItem('tasks',JSON.stringify(newVal));
}, {deep: true})

//id counter tracker
watch(idCtr, (newVal) =>{
  localStorage.setItem('idCtr',JSON.stringify(newVal));
}, {deep: true})

//total task count
const totalTask = computed(() => {
  return tasks.value.reduce((acc) =>{
    return acc+1
  },0);
});

//total completed task counts
const completedTask = computed(() => {
  return tasks.value.filter((task) => task.status.done == true).reduce((acc) =>{  
      return acc+1
  },0);
});


//add handle submit task
const handleTaskSubmit = (taskData) => {
  tasks.value.push({
    id: generateUniqueId(),
    name: taskData.name,
    status: {done: false}
  });
  idCtr.value[0].id = generateUniqueId();
  saveToLocalStorage();
  toast.success("New Task Added!")
}


//handle delete task
const handleTaskDelete = (id) => {
  tasks.value = tasks.value.filter(
    (task) => task.id !== id
  );
  saveToLocalStorage();
  toast.success("Task Deleted!")
}

//handle delete all task
// type= 1: all task, 0: completed task
const handleDeleteAllTask = (type) => {
  let delMsg = "";
  if(type == "1"){
    
    localStorage.removeItem('tasks');
    tasks.value = [];
    idCtr.value[0].id = 0;
    delMsg = "All task deleted!";
    
  }else{
    
    if(completedTask.value > 0){
        tasks.value = tasks.value.filter(
        (task) => task.status.done !== true
      );
      delMsg="All completed task"
    }else{
      delMsg="No task deleted!"
    }
    
  }

  saveToLocalStorage();
  toast.success(delMsg)  
}


// generateUniqueId
const generateUniqueId = () => {
  let ctr = idCtr.value[0].id;
  // alert(ctr);
  // return Math.floor(Math.random() * 10000000);
  return ctr+1;
};

//save to localStorage
const saveToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
  localStorage.setItem('idCtr', JSON.stringify(idCtr.value))
}


</script>

<style>

</style>
