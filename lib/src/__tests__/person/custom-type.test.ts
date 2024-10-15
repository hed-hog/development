import axios from 'axios';
import { faker } from '@faker-js/faker';
import { getGlobalToken } from '../utils/loginUser';

const baseUrl = 'http://localhost:3000';
let token = '';
let customTypeId = 0;

beforeAll(async () => {
  axios.defaults.baseURL = baseUrl;
  token = await getGlobalToken();
});

describe('Custom Type API tests', () => {
  const newCustomType = {
    name: faker.lorem.word(),
  };

  test('Create new custom type', async () => {
    const response = await axios.post('/custom-types', newCustomType, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(201);
    expect(response.data.name).toEqual(newCustomType.name);
    customTypeId = response.data.id;
  });

  test('Get all custom types with pagination', async () => {
    const response = await axios.get('/custom-types', {
      params: { page: 1, pageSize: 10 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.total).toBeGreaterThan(0);
  });

  test('Get custom type by ID', async () => {
    const response = await axios.get(`/custom-types/${customTypeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.id).toEqual(customTypeId);
  });

  test('Update custom type', async () => {
    const updatedCustomType = {
      name: faker.lorem.word(),
    };

    const response = await axios.patch(
      `/custom-types/${customTypeId}`,
      updatedCustomType,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
    expect(response.data.name).toEqual(updatedCustomType.name);
  });

  test('Delete custom type', async () => {
    const response = await axios.delete('/custom-types', {
      data: { ids: [customTypeId] },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(200);
    expect(response.data.count).toEqual(1);
  });
});
