const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const mockUser = {
  username: 'User',
  email: 'test@example.com',
  password: '12345',
};

const mockLoo = {
  description: 'This loo is nice!',
  rating: '5',
  review_id: null,
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;

  // Create an "agent" that gives us the ability
  // to store cookies between requests in a test
  const agent = request.agent(app);

  // Create a user to sign in with
  const user = await UserService.create({ ...mockUser, ...userProps });

  // ...then sign in
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

describe('loo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('POST /api/v1/loos should create a new loo', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent.post('/api/v1/loos').send(mockLoo);
    // expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      created_at: expect.any(String),
      ...mockLoo,
    });
  });

  it('GET /api/v1/loos should return a list of loos', async () => {
    const res = await request(app).get('/api/v1/loos');
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      created_at: expect.any(String),
      description: expect.any(String),
      rating: expect.any(String),
      review_id: null,
    });
  });

  it('GET /api/v1/loos/:id should get a single loo', async () => {
    const insertLooRes = await request(app).post('/api/v1/loos').send(mockLoo);
    expect(insertLooRes.status).toBe(200);
    const res = await request(app).get(`/api/v1/loos/${insertLooRes.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      created_at: expect.any(String),
      ...mockLoo,
    })
  })
});
