import { useToast } from "vue-toastification";

const toast = useToast();

export const notify = {
  success: (message, options = {}) => {
    toast.success(message, { timeout: 3000, ...options });
  },
  info: (message, options = {}) => {
    toast.info(message, { timeout: 3000, ...options });
  },
};