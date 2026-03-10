import { ref } from "vue";
import pictureApi from "@/api/pictureApi";

export function useImageUploader() {

    const imgList = ref([]);
    const uploadImage = async (file) => {
    try {
        console.log("Uploading file:", file);
        const formData = new FormData();
        formData.append('file', file); 
        console.log("Uploading file2:", file);
        const response = await pictureApi.uploadPicture(formData);
        
        console.log("Full Response:", response);

        if (response && response.data) {
            const newImageData = {
                ogUrl: response.data[0], 
                thumbUrl: response.data[1]
            };

            imgList.value.push(newImageData);
        }
    } catch (err) {
        console.error("Chi tiết lỗi:", err);
        alert("Không thể tải ảnh lên!");
    }
};

    const deleteImage = async (index) => {
        const fileUrl = {
            ogUrl: imgList.value[index].ogUrl,
            thumbUrl: imgList.value[index].thumbUrl
        };
        try {
            await pictureApi.deletePicture(fileUrl);
            imgList.value.splice(index, 1);
        } catch (err) {
            alert("Không thể kết nối đến server!");
            throw err;
        }
    }

    return {
        imgList,
        deleteImage,
        uploadImage,
    };
}