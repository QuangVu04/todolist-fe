import { ref, onMounted } from 'vue';
import taskApi from '@/api/taskApi';
import { notify } from '@/utils/toast';

export function useTaskList() {
    const tasks = ref([]);
    const selectedTask = ref([]);
    const searchKeyword = ref('');

    const fetchTasks = async () => {
        try {
            const response = await taskApi.getAll();
            tasks.value = response.data;
        } catch (err) {
            alert("Không thể kết nối đến server!");
        }
    };

    const searchTasks = async () => {
        if (searchKeyword.value.trim() === '') {
            await fetchTasks();
            return;
        }
        try {
            const response = await taskApi.search(searchKeyword.value);
            tasks.value = response.data;
        } catch (err) {
            alert("Không thể kết nối đến server!");
        }
    };

    const handleCheck = (id, isChecked) => {
        if (isChecked) {
            selectedTask.value.push(id);
        } else {
            selectedTask.value = selectedTask.value.filter(itemId => itemId !== id);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await taskApi.delete(taskId);
            tasks.value = tasks.value.filter(task => task.id !== taskId);
            notify.success("Success, Deleted Task #" + taskId);
        } catch (err) {
            alert("Không thể kết nối đến server!");
        }
    };

    const handleBulkRemove = async () => {
        if (selectedTask.value.length === 0) return;
        try {
            const promises = selectedTask.value.map(id => taskApi.delete(id));
            await Promise.all(promises);
            
            tasks.value = tasks.value.filter(t => !selectedTask.value.includes(t.id));
            notify.success("Success, Deleted Tasks #" + selectedTask.value.join(", "));
            selectedTask.value = [];
        } catch (err) {
            alert("Có lỗi xảy ra khi xóa!");
        }
    };

    const handleBulkComplete = async () => {
        if (selectedTask.value.length === 0) return;
        try {
            const promises = selectedTask.value.map(id => {
                const taskToUpdate = tasks.value.find(t => t.id === id);
                if (taskToUpdate) {
                    return taskApi.update(id, { ...taskToUpdate, completed: true });
                }
            });
            await Promise.all(promises);

            tasks.value = tasks.value.map(t =>
                selectedTask.value.includes(t.id) ? { ...t, completed: true } : t
            );
            notify.success("Success, Completed Tasks #" + selectedTask.value.join(", "));
            selectedTask.value = [];
        } catch (err) {
            alert("Có lỗi xảy ra khi cập nhật!");
        }
    };

    const updateTask = async (id, payload) => {
        try {
            await taskApi.update(id, payload);
            await fetchTasks();
            notify.success("Success, Updated Task #" + id);
        } catch (error) {
            alert("Cập nhật thất bại!");
        }
    };

    onMounted(fetchTasks);

    return {
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
    };
}