import axios from 'axios';
import { faker } from '@faker-js/faker';
import { getGlobalToken } from '../utils/loginUser';

const baseUrl = 'http://localhost:3000';
let token = '';
let personId = 1;

beforeAll(async () => {
  axios.defaults.baseURL = baseUrl;
  token = await getGlobalToken();
});

describe('Person API tests', () => {
  const newPerson = {
    name: faker.name.fullName(),
    type_id: 1,
    birth_at: faker.date.birthdate(),
  };

  /*
  test('Create new person', async () => {
    const response = await axios.post('/persons', newPerson, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(201);
    expect(response.data.name).toEqual(newPerson.name);
    personId = response.data.id;
  });
  */

  test('Get all persons', async () => {
    const response = await axios.get(`/persons`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.total).toBeGreaterThan(0);
  });

  test('Get person by ID', async () => {
    const response = await axios.get(`/persons/${personId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.id).toEqual(personId);
  });

  /*
  test('Update person', async () => {
    const updatedPerson = {
      name: faker.name.fullName(),
    };

    const response = await axios.patch(`/persons/${personId}`, updatedPerson, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(200);
    expect(response.data.name).toEqual(updatedPerson.name);
  });
  */

  /*
  test('Delete person', async () => {
    const response = await axios.delete(`/persons`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ids: [personId],
      },
    });

    expect(response.status).toEqual(200);
    expect(response.data.count).toEqual(1);
  });
  */
});
