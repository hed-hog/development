import axios from 'axios';
import { getGlobalToken } from '../utils/loginUser';

const baseUrl = 'http://localhost:3000';
let token = '';
beforeAll(async () => {
  axios.defaults.baseURL = baseUrl;
  token = await getGlobalToken();
});

describe('Role API tests', () => {
  // const newRole = {
  //   name: faker.lorem.word(),
  //   description: faker.lorem.sentence(),
  // };
  const roleId = 1;

  /*
  test('Create new role', async () => {
    const response = await axios.post('/role', newRole, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(201);
    expect(response.data.name).toEqual(newRole.name);
    roleId = response.data.id;
  });
  */

  test('Get all role with pagination', async () => {
    const response = await axios.get('/role', {
      params: { page: 1, pageSize: 10 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.total).toBeGreaterThan(0);
  });
  /*
  test('Update role', async () => {
    const updatedRole = {
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
    };

    const response = await axios.patch(`/role/${roleId}`, updatedRole, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(200);
    expect(response.data.name).toEqual(updatedRole.name);
  });
  */
  test('Get role by ID', async () => {
    const response = await axios.get(`/role/${roleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.id).toEqual(roleId);
  });
  /*
  test('Delete role', async () => {
    const response = await axios.delete(`/role`, {
      data: { ids: [roleId] },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(200);
  });
  */
  /*
  test('Update user for a role', async () => {
    const userIds = [1, 2];
    const response = await axios.patch(
      `/role/${roleId}/user`,
      { ids: userIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
  });
*/

  /*
  test('Update screens for a role', async () => {
    const screenIds = [1, 2];
    const response = await axios.patch(
      `/role/${roleId}/screens`,
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

  /*
  test('Update route for a role', async () => {
    const routeIds = [1, 2];
    const response = await axios.patch(
      `/role/${roleId}/route`,
      { ids: routeIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
  });
  */

  /*
  test('Update menu for a role', async () => {
    const menuIds = [1, 2];
    const response = await axios.patch(
      `/role/${roleId}/menu`,
      { ids: menuIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
  });
*/

  test('Get user for a specific role', async () => {
    const response = await axios.get(`/role/${roleId}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.total).toBeGreaterThan(0);
  });

  test('Get menu for a specific role', async () => {
    const response = await axios.get(`/role/${roleId}/menu`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.total).toBeGreaterThan(0);
  });

  test('Get screens for a specific role', async () => {
    const response = await axios.get(`/role/${roleId}/screens`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.total).toBeGreaterThan(0);
  });

  test('Get route for a specific role', async () => {
    const response = await axios.get(`/role/${roleId}/route`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.total).toBeGreaterThan(0);
  });
});
