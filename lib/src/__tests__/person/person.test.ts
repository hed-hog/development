import axios from 'axios';
import { getGlobalToken } from '../utils/loginUser';

const baseUrl = 'http://localhost:3000';
let token = '';
// const personId = 1;

beforeAll(async () => {
  axios.defaults.baseURL = baseUrl;
  token = await getGlobalToken();
});

describe('Person API tests', () => {
  // const newPerson = {
  //   name: faker.person.fullName(),
  //   type_id: 1,
  //   birth_at: faker.date.birthdate(),
  // };

  /*
  test('Create new person', async () => {
    const response = await axios.post('/person', newPerson, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(201);
    expect(response.data.name).toEqual(newPerson.name);
    personId = response.data.id;
  });
  */

  test('Get all person', async () => {
    const response = await axios.get(`/person`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
  });

  /*
  test('Get person by ID', async () => {
    const response = await axios.get(`/person/${personId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.id).toEqual(personId);
  });
  */

  /*
  test('Update person', async () => {
    const updatedPerson = {
      name: faker.name.fullName(),
    };

    const response = await axios.patch(`/person/${personId}`, updatedPerson, {
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
    const response = await axios.delete(`/person`, {
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
