<template>
  
    <div v-for="task in tasks" :key="task.id" class="storedDataItems" v-bind:x="index * 15">      
      <span :class="`statusDone_${task.status.done}`"><input type="checkbox" :checked="task.status.done" v-model="task.status.done">{{ task.name }}</span>
      
      &nbsp;<button @click="deleteTask(task.id)" class="delete-btn">x</button>
    </div>
    
  
</template>

<script setup>
  import { defineProps } from 'vue';
  import { defineEmits } from 'vue';

  const emit = defineEmits(['taskDeleted']);
  defineProps({
    tasks: {
      type: Array,
      required: true,
    }
  });

  const deleteTask = (id) => {
    emit('taskDeleted',id)
  }


</script>

<style scoped>
</style>
