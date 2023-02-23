const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');

describe('reviews routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('GET /api/v1/reviews should return a list of reviews', async () => {
    const res = await request(app).get('/api/v1/reviews');
    // expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      created_at: expect.any(String),
      safety: expect.any(String),
      accessibility: expect.any(String),
      cleanliness: expect.any(String),
      gendered: expect.any(Boolean),
      locks: expect.any(Boolean),
      sanitizer: expect.any(Boolean),
      amenities: expect.any(String),
      comments: expect.any(String),
    });
  });
});
