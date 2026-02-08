import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

vi.stubGlobal('import', {
  meta: {
    env: {
      VITE_ADMIN_PASSWORD_HASH: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      MODE: 'test'
    }
  }
});

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

Object.defineProperty(window, 'location', {
  value: {
    hostname: 'localhost',
    href: 'http://localhost:8000',
  },
  writable: true,
});

if (!global.crypto) {
  global.crypto = {} as any;
}

if (!global.crypto.subtle) {
  Object.defineProperty(global.crypto, 'subtle', {
    value: {
      digest: async (algorithm: string, data: BufferSource) => {
        return new ArrayBuffer(32);
      },
    },
    writable: true,
  });
}