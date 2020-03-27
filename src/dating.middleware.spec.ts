import { DatingMiddleware } from './dating.middleware';

describe('DatingMiddleware', () => {
  it('should be defined', () => {
    expect(new DatingMiddleware()).toBeDefined();
  });
});
