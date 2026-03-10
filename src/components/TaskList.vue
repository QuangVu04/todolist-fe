<script setup lang="js">
import Task from './Task.vue'
import { useTaskList } from '@/api/useTaskList'; 

const {
    tasks,
    selectedTask,
    searchKeyword,
    fetchTasks,
    searchTasks,
    handleCheck,
    deleteTask,
    handleBulkRemove,
    handleBulkComplete,
    updateTask
} = useTaskList();

defineExpose({
    fetchTasks
});

</script>

<template>
    <div class = "task-list">
        <header class="task-list-header"><h2 class = "font" >Todo list</h2>
            <div class="search-input">
                <input v-model="searchKeyword" placeholder="keywork">
                <button @click="searchTasks">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                    </svg>
                </button>
            </div>
        </header>
        <div class="task-holder">
            <Task v-for="item in tasks" 
                    :key="item.id" 
                    :taskitem="item"
                    @task-deleted="deleteTask"
                    @submit-form="updateTask"
                    @check="handleCheck"
            />
        </div>
        <div class="bulk-action"><span>Bluk Action</span><div class="bulk-action-button">
            <button class="blue-button" @click = "handleBulkComplete" ><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"></path><path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"></path></svg>Done</button>
            <button class="white-button" @click = "handleBulkRemove"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path></svg>Remove</button></div></div>
    </div>
</template>

<style scoped>
/* @media (min-width: 990px) {
    .task-list {
        flex: 2 1 0%;
    }
} */
@media (min-width: 766px) {
    .task-list {
        flex: 2 1 0%;
        margin: 15px;
        border-radius: 10px;
    }
    .bulk-action {
        padding: 0px 1em;
        flex-direction: row;
    }
}

    .bulk-action {
        height: 80px;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        justify-content: space-between;
        display: flex;
        background: rgb(241, 241, 241);
        color: rgb(74, 74, 74);
        margin: 10px 0px;
        border-radius: 8px;
        padding: 0em 1em;
    }
    .bulk-action-button {
        display: flex;
        gap: 1em;
    }

    .bulk-action-button button {
        border: 1px solid rgb(221, 221, 221);
        padding: 0.5em 1.5em;
        margin-left: 0.3em;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        opacity: 0.8;
        transition: 0.3s;
    }
    .bulk-action-button svg {
        width: 1em;
        height: 1em;
        margin-right: 0.3em;
    }


    .task-list-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 10px 0px 25px;
    }
    .font{
    margin: 0px;
    font-size: 1.5rem;
    font-weight: 700;
    font-family: "Open Sans", sans-serif;
    }
    .task-list-header h2 {
    color: #0065A1;
    padding: 0px 0.5em;
    }



.task-list {
    width: 100%;
    padding: 1em;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.2) 1px 2px 4px;
}

.search-input {
    position:relative;
}

.search-input input {
    min-width: 220px;
    border: 1px solid rgb(0, 101, 161);
    border-radius: 5px;
    padding: 0px 10px;
    height: 30px;
}
.search-input button {
    background: transparent;
    border: none;
    position: absolute;
    right: 0px;
    top: -5px;
    height: 40px;
    width: 40px;
    cursor: pointer;
}

.search-input svg {
    width: 1.1em;
    height: 1.1em;
}
.blue-button{
    background: rgb(0, 101, 161);
    color: rgb(255, 255, 255);
}
.white-button{
    background: rgb(255, 255, 255);
    color: rgb(0, 101, 161);
}
.task-holder{
    height: calc(-235px + 100vh);
    overflow-y: auto;
    box-sizing: border-box;
    border: 2px solid rgb(241, 241, 241);
    border-radius: 8px;
    padding: 10px;
}

</style>