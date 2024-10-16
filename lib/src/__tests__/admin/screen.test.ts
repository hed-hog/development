import axios from 'axios';
import { faker } from '@faker-js/faker';
import { getGlobalToken } from '../utils/loginUser';

const baseUrl = 'http://localhost:3000';
let token = '';
let screenId = 1;

beforeAll(async () => {
  axios.defaults.baseURL = baseUrl;
  token = await getGlobalToken();
});

describe('Screen API tests', () => {
  const newScreen = {
    name: faker.commerce.productName(),
    slug: faker.lorem.slug(),
    description: faker.lorem.sentence(),
    icon: faker.lorem.word(),
  };

  /*
  test('Create new screen', async () => {
    const response = await axios.post('/screens', newScreen, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(201);
    expect(response.data.name).toEqual(newScreen.name);
    expect(response.data.slug).toEqual(newScreen.slug);
    screenId = response.data.id;
  });
  */

  test('Get all screens with pagination', async () => {
    const response = await axios.get('/screens', {
      params: { page: 1, pageSize: 10 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.total).toBeGreaterThan(0);
  });

  test('Get screen by ID', async () => {
    const response = await axios.get(`/screens/${screenId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.id).toEqual(screenId);
  });

  /*
  test('Update screen', async () => {
    const updatedScreen = {
      name: faker.commerce.productName(),
      slug: faker.lorem.slug(),
      description: faker.lorem.sentence(),
      icon: faker.lorem.word(),
    };

    const response = await axios.patch(`/screens/${screenId}`, updatedScreen, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(200);
    expect(response.data.name).toEqual(updatedScreen.name);
    expect(response.data.slug).toEqual(updatedScreen.slug);
  });
  */

  /*
  test('Delete screen', async () => {
    const response = await axios.delete(`/screens`, {
      data: { ids: [screenId] },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(200);
  });
*/

  test('List roles for a screen', async () => {
    const response = await axios.get(`/screens/${screenId}/roles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
  });

  test('Update roles for a screen', async () => {
    const roleIds = [1, 2];
    const response = await axios.patch(
      `/screens/${screenId}/roles`,
      { ids: roleIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
  });

  test('List routes for a screen', async () => {
    const response = await axios.get(`/screens/${screenId}/routes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
  });

  test('Update routes for a screen', async () => {
    const routeIds = [1, 2];
    const response = await axios.patch(
      `/screens/${screenId}/routes`,
      { ids: routeIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
  });
});
