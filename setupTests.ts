import * as ResizeObserverModule from 'resize-observer-polyfill';

(global as any).ResizeObserver = ResizeObserverModule.default;

jest.mock('nanoid', () => ({
  nanoid: () => {},
}));

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
    beforePopState: jest.fn(() => null),
    prefetch: jest.fn(() => null),
  }),
}));
