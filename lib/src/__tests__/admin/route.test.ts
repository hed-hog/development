import { faker } from '@faker-js/faker';
import axios from 'axios';
import { getGlobalToken } from '../utils/loginUser';

const baseUrl = 'http://localhost:3000';
let token = '';
let routeId = 0;

beforeAll(async () => {
  axios.defaults.baseURL = baseUrl;
  token = await getGlobalToken();
});

describe('Route API tests', () => {
  const newRoute = {
    url: faker.internet.url(),
    method: 'GET',
  };

  test('Create new route', async () => {
    const response = await axios.post('/route', newRoute, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(201);
    expect(response.data.url).toEqual(newRoute.url);
    expect(response.data.method).toEqual(newRoute.method);
    routeId = response.data.id;
  });

  test('Get all route with pagination', async () => {
    const response = await axios.get('/route', {
      params: { page: 1, pageSize: 10 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.total).toBeGreaterThan(0);
  });

  test('Get route by ID', async () => {
    const response = await axios.get(`/route/${routeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.id).toEqual(routeId);
  });

  /*
  test('Update route', async () => {
    const updatedRoute = {
      url: faker.internet.url(),
      method: 'POST',
    };

    const response = await axios.patch(`/route/${routeId}`, updatedRoute, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(200);
    expect(response.data.url).toEqual(updatedRoute.url);
    expect(response.data.method).toEqual(updatedRoute.method);
  });
  */

  /*
  test('Delete route', async () => {
    const response = await axios.delete(`/route`, {
      data: { ids: [routeId] },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(200);
  });
  */

  test('List role for a route', async () => {
    const response = await axios.get(`/route/${routeId}/role`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
  });

  /*
  test('Update role for a route', async () => {
    const roleIds = [1, 2];
    const response = await axios.patch(
      `/route/${routeId}/role`,
      { ids: roleIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
  });
  */

  test('List screens for a route', async () => {
    const response = await axios.get(`/route/${routeId}/screens`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
  });

  /*
  test('Update screens for a route', async () => {
    const screenIds = [1, 2];
    const response = await axios.patch(
      `/route/${routeId}/screens`,
      { ids: screenIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
  });
  */
});
