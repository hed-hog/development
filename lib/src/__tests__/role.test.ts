import axios from 'axios';
import { faker } from '@faker-js/faker';
import { getGlobalToken } from './utils/loginUser';

const baseUrl = 'http://localhost:3000';
let token = '';
beforeAll(async () => {
  axios.defaults.baseURL = baseUrl;
  token = await getGlobalToken();
});

describe('Role API tests', () => {
  const newRole = {
    name: faker.lorem.word(),
    description: faker.lorem.sentence(),
  };
  let roleId = 0;

  test('Create new role', async () => {
    const response = await axios.post('/roles', newRole, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(201);
    expect(response.data.name).toEqual(newRole.name);
    roleId = response.data.id;
  });

  test('Get all roles with pagination', async () => {
    const response = await axios.get('/roles', {
      params: { page: 1, pageSize: 10 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.total).toBeGreaterThan(0);
  });

  test('Update role', async () => {
    const updatedRole = {
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
    };

    const response = await axios.patch(`/roles/${roleId}`, updatedRole, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(200);
    expect(response.data.name).toEqual(updatedRole.name);
  });

  test('Get role by ID', async () => {
    const response = await axios.get(`/roles/${roleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.id).toEqual(roleId);
  });

  test('Delete role', async () => {
    const response = await axios.delete(`/roles`, {
      data: { ids: [roleId] }, // Use o formato correto para a exclusão
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(200);
  });

  test('Update users for a role', async () => {
    const userIds = [1, 2]; // IDs fictícios de usuários
    const response = await axios.patch(
      `/roles/${roleId}/users`,
      { ids: userIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
  });

  test('Update screens for a role', async () => {
    const screenIds = [1, 2]; // IDs fictícios de telas
    const response = await axios.patch(
      `/roles/${roleId}/screens`,
      { ids: screenIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
  });

  test('Update routes for a role', async () => {
    const routeIds = [1, 2]; // IDs fictícios de rotas
    const response = await axios.patch(
      `/roles/${roleId}/routes`,
      { ids: routeIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
  });

  test('Update menus for a role', async () => {
    const menuIds = [1, 2]; // IDs fictícios de menus
    const response = await axios.patch(
      `/roles/${roleId}/menus`,
      { ids: menuIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
  });

  test('Get users for a specific role', async () => {
    const response = await axios.get(`/roles/${roleId}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Array);
    expect(response.data.total).toBeGreaterThan(0);
  });

  test('Get menus for a specific role', async () => {
    const response = await axios.get(`/roles/${roleId}/menus`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Array);
    expect(response.data.total).toBeGreaterThan(0);
  });

  test('Get screens for a specific role', async () => {
    const response = await axios.get(`/roles/${roleId}/screens`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.total).toBeGreaterThan(0);
  });

  test('Get routes for a specific role', async () => {
    const response = await axios.get(`/roles/${roleId}/routes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.total).toBeGreaterThan(0);
  });
});
