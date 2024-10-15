import axios from 'axios';
import { faker } from '@faker-js/faker';
import { getGlobalToken } from './utils/loginUser';

const baseUrl = 'http://localhost:3000';
let token = '';
let userId = 0;

beforeAll(async () => {
  axios.defaults.baseURL = baseUrl;
  token = await getGlobalToken();
});

describe('Users API tests', () => {
  const newUser = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  test('Create new user', async () => {
    const response = await axios.post('/users', newUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(201);
    expect(response.data.name).toEqual(newUser.name);
    expect(response.data.email).toEqual(newUser.email);
    userId = response.data.id;
  });

  test('Get all users with pagination', async () => {
    const response = await axios.get('/users', {
      params: { page: 1, pageSize: 10 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.total).toBeGreaterThan(0);
  });

  test('Get user by ID', async () => {
    const response = await axios.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.id).toEqual(userId);
  });

  test('Update user', async () => {
    const updatedUser = {
      name: faker.person.firstName(),
      email: faker.internet.email(),
    };

    const response = await axios.patch(`/users/${userId}`, updatedUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(200);
    expect(response.data.name).toEqual(updatedUser.name);
    expect(response.data.email).toEqual(updatedUser.email);
  });

  test('Delete user', async () => {
    const response = await axios.delete(`/users`, {
      data: { ids: [userId] },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(200);
  });
});
