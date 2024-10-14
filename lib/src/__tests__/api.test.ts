import axios from 'axios';
import { faker } from '@faker-js/faker';

const baseUrl = 'http://localhost:3000';
let token: string;

beforeAll(() => {
  axios.defaults.baseURL = baseUrl;
});

describe('API tests with Axios', () => {
  it('Check index route', async () => {
    const response = await axios.get('/');
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ hello: 'world' });
  });
});

describe('Authentication', () => {
  it('Authenticate User', async () => {
    const response = await axios.post('/auth/login', {
      email: 'user@hedhog.com',
      password: 'hedhog',
    });

    expect([200, 201]).toContain(response.status);
    expect(response.data).toHaveProperty('token');

    token = response.data.token;
  });
});
