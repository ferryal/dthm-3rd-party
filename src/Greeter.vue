<template>
  <div class="greeter-container">
    <button class="greeter-button" @click="printMessage">
      {{ buttonText || "Click me" }}
    </button>
    <div v-if="showToast" class="greeter-toast" :class="{ show: showToast }">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Greeter",
  props: {
    message: {
      type: String,
      default: "Hello from the Greeter component!",
    },
    buttonText: {
      type: String,
      default: "",
    },
    toastDuration: {
      type: Number,
      default: 3000, // 3 seconds
    },
  },
  data() {
    return {
      showToast: false,
    };
  },
  methods: {
    printMessage() {
      console.log(this.message);

      // Show toast
      this.showToast = true;

      // Hide toast after duration
      setTimeout(() => {
        this.showToast = false;
      }, this.toastDuration);
    },
  },
};
</script>

<style scoped>
.greeter-container {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  padding: 10px;
  position: relative;
}

.greeter-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.greeter-button:hover {
  background-color: #45a049;
}

.greeter-toast {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(100%);
  background-color: #333;
  color: white;
  padding: 12px 20px;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s ease;
  opacity: 0;
  visibility: hidden;
  margin-bottom: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  text-align: center;
  max-width: 300px;
  white-space: normal;
  word-break: break-word;
}

.greeter-toast.show {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}
</style>
