<script setup>
import { watch } from 'vue';
import { useImageUploader } from '@/api/useImageUploader';

const { imgList, uploadImage, deleteImage } = useImageUploader();

const props = defineProps({
  initialImages: {
    type: Array,
    default: () => []
  }
});

watch(() => props.initialImages, (newVal) => {
    imgList.value = newVal;
});
const handleUpload = async (event) => {
  const files = event.target.files;
  console.log("handleUpload invoked, files:", files);
  if (!files) return;

  for (let i = 0; i < files.length; i++) {
    console.log(`Uploading file #${i}:`, files[i]);
    await uploadImage(files[i]);
  }
  event.target.value = '';
};

defineExpose({ imgList });
</script>

<template>
  <div class="image-uploader">
    <div class="grid-container">
      <div v-for="(image, index) in imgList" :key="index" class="image-item">
        <img :src="`http://localhost:8080/${image.thumbUrl}`" class="thumbnail" />
        <button @click="deleteImage(index)" class="remove-btn">×</button>
      </div>

      <label class="add-box">
        <input type="file" @change="handleUpload" accept="image/*" multiple hidden />
        <span class="plus-icon">+</span>
        <span class="text">Thêm ảnh</span>
      </label>
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  /* Chia làm 4 cột bằng nhau */
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  max-width: 800px;
  margin: 20px auto;
}

.image-item, .add-box {
  aspect-ratio: 1 / 1; /* Giữ ô luôn là hình vuông */
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.add-box {
  border: 2px dashed #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s;
  color: #888;
}

.add-box:hover {
  background: #f9f9f9;
  border-color: #aaa;
}

.plus-icon {
  font-size: 2rem;
  line-height: 1;
}

.remove-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

/* Responsive cho màn hình nhỏ (Mobile) */
@media (max-width: 600px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>