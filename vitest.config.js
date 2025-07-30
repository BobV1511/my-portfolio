import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./setupTests.js'], // ✅ thêm dòng này để Vitest tự load matcher
  },
});
