<template>
  <div >    
    <form id="form" @submit.prevent="onSubmit">
    <input type="text" id="text" v-model="text" />
    <button>Add Task</button>
    </form>  
    
  </div>
</template>
<script setup>
import { ref, defineEmits } from 'vue';
import { useToast } from 'vue-toastification';

const text = ref('');
const toast = useToast();
const emit = defineEmits(['taskSubmit']);

const onSubmit = () =>{
    if(!text.value){
        toast.error("Empty!");
    }else{
      const taskData = {
          name: text.value
      };
      
      emit('taskSubmit',taskData);
      text.value = "";
    }
   
    
};
</script>