import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Greeter from "../src/Greeter.vue";

describe("Greeter Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Greeter);
  });

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".greeter-container").exists()).toBe(true);
    expect(wrapper.find(".greeter-button").exists()).toBe(true);
  });

  it("displays default button text when no buttonText is provided", () => {
    expect(wrapper.find(".greeter-button").text()).toBe("Click me");
  });

  it("displays custom button text when buttonText is provided", async () => {
    const customText = "Custom Button";
    wrapper = mount(Greeter, {
      props: {
        buttonText: customText,
      },
    });
    expect(wrapper.find(".greeter-button").text()).toBe(customText);
  });

  it("uses the default message when no message is provided", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    await wrapper.find(".greeter-button").trigger("click");
    expect(consoleSpy).toHaveBeenCalledWith(
      "Hello from the Greeter component!"
    );
    consoleSpy.mockRestore();
  });

  it("prints the provided message when button is clicked", async () => {
    const customMessage = "Hello from the test!";
    wrapper = mount(Greeter, {
      props: {
        message: customMessage,
      },
    });

    const consoleSpy = vi.spyOn(console, "log");
    await wrapper.find(".greeter-button").trigger("click");
    expect(consoleSpy).toHaveBeenCalledWith(customMessage);
    consoleSpy.mockRestore();
  });

  it("shows toast notification when button is clicked", async () => {
    await wrapper.find(".greeter-button").trigger("click");

    // Check that toast is shown
    const toast = wrapper.find(".greeter-toast");
    expect(toast.exists()).toBe(true);
    expect(toast.isVisible()).toBe(true);
    expect(toast.text()).toBe("Hello from the Greeter component!");
  });

  it("hides toast notification after duration", async () => {
    vi.useFakeTimers();
    await wrapper.find(".greeter-button").trigger("click");

    // Check toast is visible
    expect(wrapper.find(".greeter-toast").exists()).toBe(true);

    // Advance timer
    vi.advanceTimersByTime(3000);
    await wrapper.vm.$nextTick();

    // Check toast is hidden
    expect(wrapper.find(".greeter-toast").exists()).toBe(false);

    vi.useRealTimers();
  });

  it("uses custom duration for toast notification", async () => {
    const customDuration = 5000;
    wrapper = mount(Greeter, {
      props: {
        toastDuration: customDuration,
      },
    });

    vi.useFakeTimers();
    await wrapper.find(".greeter-button").trigger("click");

    // Toast should be visible after 3 seconds (default duration)
    vi.advanceTimersByTime(3000);
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".greeter-toast").exists()).toBe(true);

    // Toast should be hidden after 5 seconds (custom duration)
    vi.advanceTimersByTime(2000);
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".greeter-toast").exists()).toBe(false);

    vi.useRealTimers();
  });
});
