import axios from 'axios';
import { faker } from '@faker-js/faker';
import { getGlobalToken } from '../utils/loginUser';

const baseUrl = 'http://localhost:3000';
let token = '';
let personTypeId = 0;
const locale = 'en';

beforeAll(async () => {
  axios.defaults.baseURL = baseUrl;
  token = await getGlobalToken();
});

describe('PersonType API tests', () => {
  const newPersonType = {
    name: faker.lorem.word(),
  };

  test('Create new person type', async () => {
    const response = await axios.post('/person-types', newPersonType, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(201);
    expect(response.data.name).toEqual(newPersonType.name);
    personTypeId = response.data.id;
  });

  test('Get all person types', async () => {
    const response = await axios.get(`/person-types`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        locale,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.total).toBeGreaterThan(0);
  });

  test('Get person type by ID', async () => {
    const response = await axios.get(`/person-types/${personTypeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.id).toEqual(personTypeId);
  });

  test('Update person type', async () => {
    const updatedPersonType = {
      name: faker.lorem.word(),
    };

    const response = await axios.patch(
      `/person-types/${personTypeId}`,
      updatedPersonType,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
    expect(response.data.name).toEqual(updatedPersonType.name);
  });

  test('Delete person type', async () => {
    const response = await axios.delete(`/person-types`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ids: [personTypeId],
      },
    });

    expect(response.status).toEqual(200);
    expect(response.data.count).toEqual(1);
  });
});
