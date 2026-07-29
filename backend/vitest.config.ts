import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Increase timeout to 60 seconds to allow MongoDB binary to download on the first run
    hookTimeout: 60000,
    testTimeout: 60000,
    // Disable parallelism so multiple test suites don't try to download the binary at the exact same time
    fileParallelism: false,
  },
});
