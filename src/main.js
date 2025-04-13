import { createApp } from "vue";
import { pinia, useGreeterStore } from "./store";
import Greeter from "./Greeter.vue";
import TestResults from "./TestResults.vue";

// Global object that will be exposed to the browser
window.Greeter = {
  init(selector, options = {}) {
    const app = createApp(Greeter, {
      message: options.message || "Default message",
      buttonText: options.buttonText || "",
      toastDuration: options.toastDuration || 3000,
    });

    // Add Pinia store
    app.use(pinia);

    // Store initialization with options
    const store = useGreeterStore();
    if (options.message) {
      store.setMessage(options.message);
    }
    if (options.buttonText) {
      store.setButtonText(options.buttonText);
    }

    // Find the target element and mount
    const targetElement = document.querySelector(selector);
    if (!targetElement) {
      console.error(`Element ${selector} not found`);
      return;
    }

    app.mount(targetElement);

    return app;
  },

  // New method to initialize the test runner
  initTestRunner(selector) {
    const app = createApp(TestResults);

    // Find the target element and mount
    const targetElement = document.querySelector(selector);
    if (!targetElement) {
      console.error(`Element ${selector} not found`);
      return;
    }

    app.mount(targetElement);

    return app;
  },
};
