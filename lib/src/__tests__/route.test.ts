import axios from 'axios';
import { faker } from '@faker-js/faker';
import { getGlobalToken } from './utils/loginUser';

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
    method: 'GET', // ou 'POST', 'PUT', etc.
  };

  test('Create new route', async () => {
    const response = await axios.post('/routes', newRoute, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(201);
    expect(response.data.url).toEqual(newRoute.url);
    expect(response.data.method).toEqual(newRoute.method);
    routeId = response.data.id; // Armazena o ID da nova rota
  });

  test('Get all routes with pagination', async () => {
    const response = await axios.get('/routes', {
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
    const response = await axios.get(`/routes/${routeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.id).toEqual(routeId);
  });

  test('Update route', async () => {
    const updatedRoute = {
      url: faker.internet.url(),
      method: 'POST',
    };

    const response = await axios.patch(`/routes/${routeId}`, updatedRoute, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(200);
    expect(response.data.url).toEqual(updatedRoute.url);
    expect(response.data.method).toEqual(updatedRoute.method);
  });

  test('Delete route', async () => {
    const response = await axios.delete(`/routes`, {
      data: { ids: [routeId] }, // Use o formato correto para a exclusão
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(200);
  });

  test('List roles for a route', async () => {
    const response = await axios.get(`/routes/${routeId}/roles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
  });

  test('Update roles for a route', async () => {
    const roleIds = [1, 2]; // IDs fictícios de roles
    const response = await axios.patch(
      `/routes/${routeId}/roles`,
      { ids: roleIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
  });

  test('List screens for a route', async () => {
    const response = await axios.get(`/routes/${routeId}/screens`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
  });

  test('Update screens for a route', async () => {
    const screenIds = [1, 2]; // IDs fictícios de telas
    const response = await axios.patch(
      `/routes/${routeId}/screens`,
      { ids: screenIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
  });
});
