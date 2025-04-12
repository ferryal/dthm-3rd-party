import { createPinia, defineStore } from "pinia";

export const pinia = createPinia();

export const useGreeterStore = defineStore("greeter", {
  state: () => ({
    message: "",
    buttonText: "",
    toastDuration: 3000,
  }),
  actions: {
    setMessage(message) {
      this.message = message;
    },
    setButtonText(text) {
      this.buttonText = text;
    },
    setToastDuration(duration) {
      this.toastDuration = duration;
    },
  },
});
