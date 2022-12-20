import { GetUserMiddlewareMiddleware } from './get-user-middleware.middleware';

describe('GetUserMiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new GetUserMiddlewareMiddleware()).toBeDefined();
  });
});
