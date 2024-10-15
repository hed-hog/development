import axios from 'axios';
import { faker } from '@faker-js/faker';
import { getGlobalToken } from './utils/loginUser';

const baseUrl = 'http://localhost:3000';
let token = '';
beforeAll(async () => {
  axios.defaults.baseURL = baseUrl;
  token = await getGlobalToken();
});

describe('Menu API tests', () => {
  const newMenu = {
    name: faker.lorem.word({ length: 8 }),
    url: faker.internet.url(),
    icon: faker.lorem.word({ length: 8 }),
    order: 0,
    menuId: null,
  };
  let menuId = 0;

  test('Create new menu', async () => {
    const response = await axios.post('/menus', newMenu, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(201);
    expect(response.data.name).toEqual(newMenu.name);
    expect(response.data.url).toEqual(newMenu.url);
    menuId = response.data.id;
  });

  test('Get all menus with pagination', async () => {
    const response = await axios.get('/menus', {
      params: { page: 1, pageSize: 10 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.total).toBeGreaterThan(0);
  });

  test('Update menu', async () => {
    const updatedName = faker.lorem.word();
    const response = await axios.patch(
      `/menus/${menuId}`,
      { name: updatedName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
    expect(response.data.name).toEqual(updatedName);
  });

  test('Get menu by ID', async () => {
    const response = await axios.get(`/menus/${menuId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.id).toEqual(menuId);
  });

  test('Delete menu', async () => {
    const response = await axios.delete(`/menus/${menuId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(200);
  });

  test('Get menus for a specific role', async () => {
    const roleId = 1; // Replace with a valid role ID
    const response = await axios.get(`/menus/roles/${roleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Array);
  });

  test('Get screens for a specific menu', async () => {
    const response = await axios.get(`/menus/${menuId}/screens`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Array);
  });
});
