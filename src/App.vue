<script setup lang="js">
import { ref } from 'vue';
import TaskDetail from './components/TaskDetail.vue'
import TaskList from './components/TaskList.vue'

const taskListRef = ref(null);
const refreshTasks = () => {
  taskListRef.value?.fetchTasks();
}
</script>

<template>
  <div id = "root">
  <main class = "flex"> 
    <TaskDetail @task-created="refreshTasks" />
    <TaskList ref="taskListRef" />
  </main>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}


body, html {
  font-size: 16px;
  font-family: "Open Sans", sans-serif;
  width: 100%;
  height: 100%;
}
.flex {
    display: flex;
    flex-direction: column;
    background-color: rgb(152, 193, 217);
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    min-height: 100vh;
    align-items: flex-start;
}

div {
  display :block;
  unicode-bidi: isolate;
}

@media (min-width: 766px) {
  .flex {
    flex-direction: row;
  }

}
</style>
