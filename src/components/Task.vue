<script setup lang="js"> 
import { ref } from 'vue';
import TaskForm from './TaskForm.vue'

const props = defineProps({
    taskitem: Object,
    isChecked: Boolean
});

const statusMap = {
    low: { backgroundColor: "#66bb6a", color: "#ffffff" },
    normal: { backgroundColor: "#dddddd", color: "#333333" },
    high: { backgroundColor: "#ff5722", color: "#ffffff" }
}

const emit = defineEmits(['task-deleted', 'check', 'submit-form']);
const deleteTask = () => {
    emit('task-deleted', props.taskitem.id);
}

const handleCheck = (event) => {
    emit('check', props.taskitem.id, event.target.checked);
}
const handleSubmitedForm = (formData) => {
    emit('submit-form', props.taskitem.id, formData);
}

const taskDetailvisible = ref(false)
</script>

<template>
    <section class="task">
        <div class = "task-item" :class = "{ 'task-completed': props.taskitem.completed }">
            <div class = "task-item-left">
                <input type="checkbox" value="0"
                    :checked="isChecked" 
                    @change="handleCheck">
                <div class ="task-item-left-content">
                    <div class = "task-priority-box" :style="statusMap[props.taskitem.priority]">
                        {{ props.taskitem.priority }}
                    </div>
                    <p>{{ props.taskitem.title }}</p>
                </div>
            </div>
            <div class = "task-item-right">
                <button @click= "deleteTask"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path></svg>
                </button>
                <button @click="taskDetailvisible = !taskDetailvisible"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path></svg>
                </button>
            </div>
        </div>
        <div class = "task-detail" v-show="taskDetailvisible">
            <TaskForm buttonName="Update" 
            :initialData = "props.taskitem"
            @submit-form="handleSubmitedForm"/>
        </div>
        
    </section>
</template>

<style scoped>
.task {
    margin-bottom: 1em;
    border: 1px solid transparent;
}

.task-item {
    display: flex;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    box-sizing: border-box;
    background-color: rgb(245, 245, 245);
    width: 100%;
    height: 3em;
    padding: 0em 0.5em;
    border-radius: 0.3em;
    -webkit-box-align: center;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.067) 0px 1px 1px;
    margin-bottom: 0.3em;
}

.task-item-left {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
}

.task-item-left input {
    margin: 3px 3px 3px 4px;
}

.task-item-left-content {
    display: flex;
    -webkit-box-align: baseline;
    align-items: baseline;
    flex-direction: row;
    color: rgb(255, 255, 255);
    margin: 0px 0.5em;
}

.task-completed {
    border-left: 3px solid rgb(0, 101, 161);
}

.task-priority-box {
    background-color: rgb(221, 221, 221);
    color: rgb(74, 74, 74);
    font-size: 0.6rem;
    font-weight: 700;
    padding: 0.2em 0.5em;
    border-radius: 3px;
    cursor: pointer;
    min-width: 5em;
    text-align: center;
}
.task-item-left-content p {
    font-size: 0.8rem;
    line-height: 1rem;
    font-weight: 600;
    color: rgb(58, 58, 58);
    letter-spacing: 0.5px;
    margin: 0px 0.5em;
}
.task-item-right button {
    border: none;
    padding: 0.5em;
    margin-left: 0.3em;
    border-radius: 5px;
    color: rgb(74, 74, 74);
    background-color: transparent;
    cursor: pointer;
}
.task-item-right svg {
    width: 1.3em;
    height: 1.3em;
}

.task-detail {
    margin-bottom: 0.5em;
    padding: 10px;
    background: rgb(250, 250, 250);
    border-radius: 5px;
}
</style>