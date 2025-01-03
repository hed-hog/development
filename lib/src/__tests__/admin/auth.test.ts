import { faker } from '@faker-js/faker';
import axios from 'axios';
import { loginUser } from '../utils/loginUser';

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

  const {
    user: { id: rootUserId },
    token: tokenRoot,
  } = await loginUser(userRootData.email, userRootData.password);

  expect(rootUserId).toBeGreaterThan(0);

  userRootData.token = tokenRoot;
  userRootData.id = rootUserId;

  const {
    user: { id: userId },
    token: tokenUser,
  } = await loginUser(userData.email, userData.password);

  expect(userId).toBeGreaterThan(0);

  userData.token = tokenUser;
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
    const response = await axios.get(`/user/${userRootData.id}`, {
      headers: {
        Authorization: `Bearer ${userRootData.token}`,
      },
    });

    expect(response.status).toEqual(200);
    expect(response.data.email).toEqual(userRootData.email);
  });

  test('Update Root User Data', async () => {
    const newName = faker.person.fullName();
    const response = await axios.patch(
      `/user/${userRootData.id}`,
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

  test('Test user list', async () => {
    const response = await axios.get('/user', {
      headers: {
        Authorization: `Bearer ${userRootData.token}`,
      },
    });

    expect(response.status).toEqual(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.total).toBeGreaterThan(0);
    expect(response.data.data.length).toBeGreaterThan(0);
    expect(response.data.lastPage).toBeGreaterThanOrEqual(response.data.page);
    expect(response.data.pageSize).toBeGreaterThan(0);
  });
});

describe('Test authentication with normal user', () => {
  const newUser = {
    id: 0,
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.person.fullName(),
  };
  let newUserToken = '';

  test('Test create user', async () => {
    const response = await axios.post('/user', newUser, {
      headers: {
        Authorization: `Bearer ${userRootData.token}`,
      },
    });

    expect(response.status).toEqual(201);
    expect(response.data.email).toEqual(newUser.email);
    expect(response.data.name).toEqual(newUser.name);
    newUser.id = response.data.id;
  });

  test('Test login with new user', async () => {
    const response = await loginUser(newUser.email, newUser.password);
    expect(response.user.id).toBeGreaterThan(0);
    expect(response.token).not.toBeNull();
    newUserToken = response.token;
  });

  test('Test to access forbidden route', async () => {
    try {
      await axios.get('/user', {
        headers: {
          Authorization: `Bearer ${newUserToken}`,
        },
      });
    } catch (error) {
      expect(error.response.status).toEqual(403);
      expect(error.response.data).toBeInstanceOf(Object);
      expect(error.response.data).toHaveProperty(
        'message',
        'Forbidden resource',
      );
    }
  });
});
