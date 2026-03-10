<script setup lang="js">
import { ref, watch, onMounted, computed } from 'vue';
import ImageUploader from './ImageUploader.vue';

const props = defineProps({
  buttonName: {
    type: String,
    default: "Submit"
  },
  initialData: { 
    type: Object, 
    default: () => ({}) }
})
console.log("TaskForm props:", props);

const imageUploaderRef = ref(null);
const isTouched = ref(false);
const required = computed (() => {
    return {
        title: props.initialData.title ? props.initialData.title.trim() === '' : true,
        description: props.initialData.description ? props.initialData.description.trim() === '' : true,
        dueDate: props.initialData.dueDate ? !props.initialData.dueDate : true
    };
});
const emit = defineEmits(['submit-form']);

const formData = ref({
  title: '',
  description: '',
  dueDate: null,
  priority: 'normal',
  completed: false,
    pictures: [],
});

const assignInitialData = () => {
  if (props.initialData && Object.keys(props.initialData).length > 0) {
    formData.value = { 
      ...props.initialData,
    };
    console.log("Assigned initial data to formData:", formData.value);
  }
};


const handleSubmit = (event) => {
  event.preventDefault(); 
  
  if (!formData.value.title.trim()) {
    alert("Vui lòng nhập Title!");
    return;
  }
  const currentImages = imageUploaderRef.value.imgList;
  formData.value.pictures = [...currentImages];

  emit('submit-form', { ...formData.value });
}

watch(() => props.initialData, () => {
  assignInitialData();
}, { deep: true });

onMounted(() => {
  assignInitialData();
});
</script>

<template>
    <form @submit="handleSubmit">
     <div class="font flex">
        <label class = "label-font" >Title : <sup>*</sup> <small>Required</small>
        </label>
        <input name="title" placeholder="Title" class="input input-title" v-model="formData.title" 
        @blur="isTouched = true" @input="isTouched = false"
        :class="{ 'input-error': required.title && isTouched }">
    </div>
    <div class="font"><label class="label-font">Description : <sup>*</sup> <small>Required</small></label><div class="input-description"><textarea name="description" placeholder="Description" v-model="formData.description" @blur="isTouched = true" @input="isTouched = false"
        :class="{ 'input-error': required.description && isTouched }"></textarea></div></div>
    <div class="input-option">
        <div class="font flex flex-size"><label class="label-font" >Due Date : <sup>*</sup> <small>Required</small></label><input name="date" id="date" type="date" :min="new Date().toLocaleDateString('en-CA')" placeholder="date" class="input input-date" v-model="formData.dueDate" @blur="isTouched = true" @input="isTouched = false"
        :class="{ 'input-error': required.dueDate && isTouched }"></div>
        <div class="font flex flex-size"><label class="label-font">Priority :  <sup style = "color: #FFFFFF">*</sup><small></small></label><div class="input-priority"><select name="priority" v-model="formData.priority"><option value="low">low</option><option value="high">high</option><option value="normal">normal</option></select></div></div></div>
    <div class="font"><button type="submit" class="submit-button">{{ buttonName }}</button></div>
    </form>
    <div>
        <ImageUploader ref="imageUploaderRef"
        :initialImages="formData.pictures"/>
    </div>
</template>

<style scoped>
form {
    display: block;
    margin-top: 0em;
    unicode-bidi: isolate; 
}

.flex-size {
    flex: 1 1 0%;
}

.font {
    font-size: 0.9rem;
    font-weight: 400;
    margin-bottom: 0.5em;
    font-family: "Open Sans", sans-serif;
}

.flex {
    display: flex;
    flex-direction: column;
}

small , sup{
    color: rgb(244, 67, 54);
} 

.label-font {
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 0.6em;
    color: rgb(74, 74, 74);
}
 .input, .input-description textarea {
    box-sizing: border-box;
    width: 100%;
    line-height: 35px;
    border-radius: 5px;
    padding: 3px 10px;
    letter-spacing: 0.5px;
    font-size: 0.8rem;
}

.input-error {
    border: 1px solid rgb(244, 67, 54);
}

.input-option {
    display: flex;
    gap: 1em;
}

.input-title, .input-date {
    height: 35px;
}

.input-priority select {
    border: 1px solid rgb(221, 221, 221);
    box-sizing: border-box;
    width: 100%;
    height: 35px;
    line-height: 35px;
    border-radius: 5px;
    padding: 3px 10px;
    letter-spacing: 0.5px;
    font-size: 0.8rem;
}

.submit-button {
    width: 100%;
    padding: 0.8em;
    margin-top: 1em;
    background: rgb(0, 101, 161);
    color: rgb(255, 255, 255);
    border: none;
    border-radius: 0.3em;
    font-weight: 600;
    letter-spacing: 0.5px;
    font-size: 0.8rem;
}
</style>

