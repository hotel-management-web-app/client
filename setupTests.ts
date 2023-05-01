import * as ResizeObserverModule from 'resize-observer-polyfill';

(global as any).ResizeObserver = ResizeObserverModule.default;

jest.mock('nanoid', () => ({
  nanoid: () => {},
}));
