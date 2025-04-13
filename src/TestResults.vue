<template>
  <div class="test-results">
    <div class="test-controls">
      <button class="run-tests-button" @click="runTests" :disabled="isRunning">
        {{ isRunning ? "Running Tests..." : "Run Tests" }}
      </button>
      <div v-if="results" class="test-summary">
        <span class="test-count">
          {{ results.passed }} / {{ results.total }} tests passed
        </span>
        <span
          class="test-status"
          :class="{
            pass: results.passed === results.total,
            fail: results.failed > 0,
          }"
        >
          {{ results.passed === results.total ? "PASS" : "FAIL" }}
        </span>
      </div>
    </div>

    <div v-if="results && results.tests.length > 0" class="test-details">
      <div
        v-for="(test, index) in results.tests"
        :key="index"
        class="test-case"
        :class="{ pass: test.passed, fail: !test.passed }"
      >
        <div class="test-name">
          <span class="test-icon">{{ test.passed ? "✓" : "✗" }}</span>
          {{ test.name }}
        </div>
        <div class="test-message">{{ test.message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { runTests } from "./testRunner";

export default {
  name: "TestResults",
  setup() {
    const results = ref(null);
    const isRunning = ref(false);

    const executeTests = async () => {
      try {
        isRunning.value = true;
        results.value = null;

        // Short delay to allow UI to update before potentially CPU-intensive tests
        await new Promise((resolve) => setTimeout(resolve, 100));

        const testResults = await runTests();
        results.value = testResults;
      } catch (error) {
        console.error("Error running tests:", error);
        results.value = {
          total: 0,
          passed: 0,
          failed: 1,
          tests: [
            {
              name: "Test Runner Error",
              passed: false,
              message: error.message || "Unknown error occurred",
            },
          ],
        };
      } finally {
        isRunning.value = false;
      }
    };

    return {
      results,
      isRunning,
      runTests: executeTests,
    };
  },
};
</script>

<style scoped>
.test-results {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  padding: 15px;
  border-radius: 8px;
  background-color: #f5f5f5;
  margin-top: 20px;
}

.test-controls {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.run-tests-button {
  background-color: #4a56e2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.run-tests-button:hover:not(:disabled) {
  background-color: #3a46d2;
}

.run-tests-button:disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
}

.test-summary {
  margin-left: 15px;
  display: flex;
  align-items: center;
}

.test-count {
  margin-right: 10px;
}

.test-status {
  font-weight: bold;
  padding: 3px 8px;
  border-radius: 4px;
}

.test-status.pass {
  background-color: #4caf50;
  color: white;
}

.test-status.fail {
  background-color: #f44336;
  color: white;
}

.test-details {
  border-top: 1px solid #ddd;
  padding-top: 15px;
}

.test-case {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
}

.test-case.pass {
  background-color: rgba(76, 175, 80, 0.1);
  border-left: 4px solid #4caf50;
}

.test-case.fail {
  background-color: rgba(244, 67, 54, 0.1);
  border-left: 4px solid #f44336;
}

.test-name {
  font-weight: bold;
  display: flex;
  align-items: center;
}

.test-icon {
  margin-right: 8px;
}

.test-case.pass .test-icon {
  color: #4caf50;
}

.test-case.fail .test-icon {
  color: #f44336;
}

.test-message {
  margin-top: 5px;
  font-size: 14px;
  color: #666;
  margin-left: 20px;
}
</style>
