import axios from 'axios';
import { faker } from '@faker-js/faker';
import { loginUser } from './utils/loginUser';
import { decodeTokenJWT } from './utils/decodeTokenJWT';

const baseUrl = 'http://localhost:3000';

const userRootData = {
  email: 'root@hedhog.com',
  password: 'hedhog',
  token: '',
  id: 0,
};
const userData = {
  email: 'user@hedhog.com',
  password: 'hedhog',
  token: '',
  id: 0,
};

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

describe('Test authentication with Root User', () => {
  beforeAll(async () => {
    userRootData.token = await loginUser(
      userRootData.email,
      userRootData.password,
    );

    const { id } = decodeTokenJWT(userRootData.token);

    expect(id).toBeGreaterThan(0);

    userRootData.id = id;
  });

  test('Validate authentication', async () => {
    const response = await axios.get('/auth/verify', {
      headers: {
        Authorization: `Bearer ${userRootData.token}`,
      },
    });

    expect([200, 201]).toBe(response.status);
    expect(response.data).hasOwnProperty('id');
    expect(response.data.email).toEqual(userRootData.email);
  });

  test('Show Root User Data', async () => {
    const response = await axios.get(`/users/${userRootData.id}`, {
      headers: {
        Authorization: `Bearer ${userRootData.token}`,
      },
    });

    expect([200, 201]).toBe(response.status);
    expect(response.data.email).toEqual(userRootData.email);
  });

  test('Update Root User Data', async () => {
    const newName = faker.person.fullName();
    const response = await axios.put(
      `/users/${userRootData.id}`,
      { name: newName },
      {
        headers: {
          Authorization: `Bearer ${userRootData.token}`,
        },
      },
    );

    expect([200, 201]).toBe(response.status);
    expect(response.data.name).toEqual(newName);
  });

  test('Test users list', async () => {
    const response = await axios.get('/users', {
      headers: {
        Authorization: `Bearer ${userRootData.token}`,
      },
    });

    expect([200, 201]).toBe(response.status);
    expect(response.data).toBeInstanceOf(Array);
    expect(response.data.length).toBeGreaterThan(0);
  });
});
