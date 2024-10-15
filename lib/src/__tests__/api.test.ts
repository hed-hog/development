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

beforeAll(async () => {
  axios.defaults.baseURL = baseUrl;

  const { id: rootUserId } = await loginUser(
    userRootData.email,
    userRootData.password,
  );

  expect(rootUserId).toBeGreaterThan(0);

  userRootData.id = rootUserId;

  const { id: userId } = await loginUser(userData.email, userData.password);

  expect(userId).toBeGreaterThan(0);

  userData.id = userId;
});

describe('API tests with Axios', () => {
  it('Check index route', async () => {
    const response = await axios.get('/');
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ hello: 'world' });
  });
});

describe('Test authentication with Root User', () => {
  test('Validate authentication', async () => {
    const response = await axios.get('/auth/verify', {
      headers: {
        Authorization: `Bearer ${userRootData.token}`,
      },
    });

    expect(response.status).toEqual(200);
    expect(response.data).hasOwnProperty('id');
    expect(response.data.email).toEqual(userRootData.email);
  });

  test('Show Root User Data', async () => {
    const response = await axios.get(`/users/${userRootData.id}`, {
      headers: {
        Authorization: `Bearer ${userRootData.token}`,
      },
    });

    expect(response.status).toEqual(200);
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

    expect(response.status).toEqual(200);
    expect(response.data.name).toEqual(newName);
    expect(response.data.email).toEqual(userRootData.email);
  });

  test('Test users list', async () => {
    const response = await axios.get('/users', {
      headers: {
        Authorization: `Bearer ${userRootData.token}`,
      },
    });

    expect(response.status).toEqual(200);
    expect(response.data).toBeInstanceOf(Array);
    expect(response.data.length).toBeGreaterThan(0);
  });
});
