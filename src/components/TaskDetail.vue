<script setup lang="js">
import TaskForm from './TaskForm.vue'
import taskApi from '@/api/taskApi';
import { notify } from '@/utils/toast';

const emit = defineEmits(['task-created']);

const handleCreateTask = async (formData) => {
    try {
        await taskApi.create(formData);
        emit('task-created'); 
        notify.success("Success, Created Task");
    } catch (error) {
        console.error("Lỗi khi tạo task:", error);
    }
}
</script>

<template>
    <div class = "task-detail">
        <div class = "task-detail-content">
            <h2>New Task</h2>
            <TaskForm buttonName="Add"
            @submit-form="handleCreateTask" />
        </div>
    </div>
</template>

<style scoped>
h2 {
    font-family: "Open Sans", sans-serif;
}

@media (min-width: 766px) {
.task-detail {
    position: sticky;
    top: 0px;
    flex: 1 1 0%;
    padding: 1em;
}
}
.task-detail{
    border-radius: 0.6em;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 2em;
    padding: 1em;
}

.task-detail h2 {
    margin: 0px;
    font-size: 1.2rem;
    text-align: center;
    color: rgb(74, 74, 74);
    padding: 0.8rem 0px;
}

.task-detail-content {
    background-color: rgb(255, 255, 255);
    padding: 1em;
    border-radius: 0.5em;
    box-shadow: rgba(0, 0, 0, 0.2) 1px 2px 4px;
}
</style>