<template>
    <span class="blueNavTitle">&nbsp;Tasks <span class="navTitleCounter">{{ totalTask }}</span></span>
    &nbsp;<span class="blueNavTitle">&nbsp;Tasks Done <span class="navTitleCounter">{{ completedTask }}</span></span>
    &nbsp;<button @click="deleteTask(0)" class="delTask"> Done Tasks</button>
    &nbsp;<button @click="deleteTask(1)" class="delTask"> All Tasks</button>
    


</template>

<script setup>
  import { defineProps } from 'vue';
  import { defineEmits } from 'vue';

  defineProps({
    totalTask: {
      type: Number,
      required: true,
    },
    completedTask: {
      type: Number,
      required: true,
    },

  });

  const emit = defineEmits(['deleteAllTask']);

//type = 1: all task, 0: completed task 
  const deleteTask = (type) => {
    emit('deleteAllTask',type)
  }  

</script>


<style scoped>

</style>
