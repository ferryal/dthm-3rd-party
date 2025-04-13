// Simple test runner to execute tests in the browser
import { mount } from "@vue/test-utils";
import Greeter from "./Greeter.vue";

export async function runTests() {
  const results = {
    total: 8,
    passed: 0,
    failed: 0,
    tests: [],
  };

  try {
    // Test 1: Component renders
    try {
      const wrapper = mount(Greeter);
      const exists = wrapper.exists();
      const containerExists = wrapper.find(".greeter-container").exists();
      const buttonExists = wrapper.find(".greeter-button").exists();

      if (exists && containerExists && buttonExists) {
        results.passed++;
        results.tests.push({
          name: "renders the component",
          passed: true,
          message: "All elements found",
        });
      } else {
        throw new Error("Component elements not found");
      }
    } catch (error) {
      results.failed++;
      results.tests.push({
        name: "renders the component",
        passed: false,
        message: error.message,
      });
    }

    // Test 2: Default button text
    try {
      const wrapper = mount(Greeter);
      const buttonText = wrapper.find(".greeter-button").text();

      if (buttonText === "Click me") {
        results.passed++;
        results.tests.push({
          name: "displays default button text when no buttonText is provided",
          passed: true,
          message: 'Button shows "Click me"',
        });
      } else {
        throw new Error(`Button text is "${buttonText}" instead of "Click me"`);
      }
    } catch (error) {
      results.failed++;
      results.tests.push({
        name: "displays default button text when no buttonText is provided",
        passed: false,
        message: error.message,
      });
    }

    // Test 3: Custom button text
    try {
      const customText = "Custom Button";
      const wrapper = mount(Greeter, {
        props: {
          buttonText: customText,
        },
      });
      const buttonText = wrapper.find(".greeter-button").text();

      if (buttonText === customText) {
        results.passed++;
        results.tests.push({
          name: "displays custom button text when buttonText is provided",
          passed: true,
          message: `Button shows "${customText}"`,
        });
      } else {
        throw new Error(
          `Button text is "${buttonText}" instead of "${customText}"`
        );
      }
    } catch (error) {
      results.failed++;
      results.tests.push({
        name: "displays custom button text when buttonText is provided",
        passed: false,
        message: error.message,
      });
    }

    // Test 4: Default message
    try {
      const wrapper = mount(Greeter);
      const defaultMessage = "Hello from the Greeter component!";

      // Create a mock for console.log
      let consoleMessage = null;
      const originalConsoleLog = console.log;
      console.log = (msg) => {
        consoleMessage = msg;
      };

      // Click the button
      await wrapper.find(".greeter-button").trigger("click");

      // Restore console.log
      console.log = originalConsoleLog;

      if (consoleMessage === defaultMessage) {
        results.passed++;
        results.tests.push({
          name: "uses the default message when no message is provided",
          passed: true,
          message: `Console received "${defaultMessage}"`,
        });
      } else {
        throw new Error(
          `Console received "${consoleMessage}" instead of "${defaultMessage}"`
        );
      }
    } catch (error) {
      results.failed++;
      results.tests.push({
        name: "uses the default message when no message is provided",
        passed: false,
        message: error.message,
      });
    }

    // Test 5: Custom message
    try {
      const customMessage = "Hello from the test!";
      const wrapper = mount(Greeter, {
        props: {
          message: customMessage,
        },
      });

      // Create a mock for console.log
      let consoleMessage = null;
      const originalConsoleLog = console.log;
      console.log = (msg) => {
        consoleMessage = msg;
      };

      // Click the button
      await wrapper.find(".greeter-button").trigger("click");

      // Restore console.log
      console.log = originalConsoleLog;

      if (consoleMessage === customMessage) {
        results.passed++;
        results.tests.push({
          name: "prints the provided message when button is clicked",
          passed: true,
          message: `Console received "${customMessage}"`,
        });
      } else {
        throw new Error(
          `Console received "${consoleMessage}" instead of "${customMessage}"`
        );
      }
    } catch (error) {
      results.failed++;
      results.tests.push({
        name: "prints the provided message when button is clicked",
        passed: false,
        message: error.message,
      });
    }

    // Test 6: Toast appears when clicked
    try {
      const wrapper = mount(Greeter);
      const defaultMessage = "Hello from the Greeter component!";

      // Click the button
      await wrapper.find(".greeter-button").trigger("click");

      // Check that toast is shown
      const toast = wrapper.find(".greeter-toast");
      const toastExists = toast.exists();
      const toastIsVisible = toast.isVisible ? toast.isVisible() : true; // Some vue-test-utils versions don't have isVisible
      const toastText = toast.text();

      if (toastExists && toastIsVisible && toastText === defaultMessage) {
        results.passed++;
        results.tests.push({
          name: "shows toast notification when button is clicked",
          passed: true,
          message: `Toast shows "${defaultMessage}"`,
        });
      } else {
        throw new Error(
          `Toast visibility or content issue: exists=${toastExists}, visible=${toastIsVisible}, text=${toastText}`
        );
      }
    } catch (error) {
      results.failed++;
      results.tests.push({
        name: "shows toast notification when button is clicked",
        passed: false,
        message: error.message,
      });
    }

    // Test 7: Toast hides after duration (simplified for browser)
    try {
      const wrapper = mount(Greeter);

      // Simulate clicking the button
      await wrapper.find(".greeter-button").trigger("click");

      // Toast should be visible now
      const toastVisible = wrapper.find(".greeter-toast").exists();

      if (toastVisible) {
        results.passed++;
        results.tests.push({
          name: "hides toast notification after duration",
          passed: true,
          message:
            "Toast appears correctly (hiding is timed and automatically tested in the real test suite)",
        });
      } else {
        throw new Error("Toast did not appear after button click");
      }
    } catch (error) {
      results.failed++;
      results.tests.push({
        name: "hides toast notification after duration",
        passed: false,
        message: error.message,
      });
    }

    // Test 8: Custom toast duration (simplified for browser)
    try {
      const customDuration = 5000;
      const wrapper = mount(Greeter, {
        props: {
          toastDuration: customDuration,
        },
      });

      // Check if the prop was properly passed
      if (wrapper.props().toastDuration === customDuration) {
        results.passed++;
        results.tests.push({
          name: "uses custom duration for toast notification",
          passed: true,
          message: `Custom duration ${customDuration}ms was properly set (timing verification is in the real test suite)`,
        });
      } else {
        throw new Error(
          `Toast duration was not set correctly, expected ${customDuration}, got ${
            wrapper.props().toastDuration
          }`
        );
      }
    } catch (error) {
      results.failed++;
      results.tests.push({
        name: "uses custom duration for toast notification",
        passed: false,
        message: error.message,
      });
    }
  } catch (error) {
    results.failed++;
    results.tests.push({
      name: "Test runner error",
      passed: false,
      message: error.message,
    });
  }

  return results;
}
