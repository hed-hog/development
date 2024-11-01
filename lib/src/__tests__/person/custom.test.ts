import axios from 'axios';
import { getGlobalToken } from '../utils/loginUser';

const baseUrl = 'http://localhost:3000';
let token = '';
// let customId = 0;
const personId = 1;

beforeAll(async () => {
  axios.defaults.baseURL = baseUrl;
  token = await getGlobalToken();
});

describe('Custom API tests', () => {
  // const newCustom = {
  //   type_id: 1,
  //   name: faker.lorem.word(),
  //   value: faker.lorem.sentence(),
  // };

  /*
  test('Create new custom entry', async () => {
    const response = await axios.post(
      `/person/${personId}/customs`,
      newCustom,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(201);
    expect(response.data.name).toEqual(newCustom.name);
    customId = response.data.id;
  });
  */

  test('Get all customs for a person', async () => {
    const response = await axios.get(`/person/${personId}/customs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
  });

  /*
  test('Get custom entry by ID', async () => {
    const response = await axios.get(
      `/person/${personId}/customs?id=${customId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toBe(200);
    expect(response.data.id).toEqual(customId);
  });
  */

  /*
  test('Update custom entry', async () => {
    const updatedCustom = {
      name: faker.lorem.word(),
      value: faker.lorem.sentence(),
    };

    const response = await axios.patch(
      `/person/${personId}/customs/${customId}`,
      updatedCustom,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
    expect(response.data.name).toEqual(updatedCustom.name);
  });
  */

  /*
  test('Delete custom entry', async () => {
    const response = await axios.delete(
      `/person/${personId}/customs/${customId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
    expect(response.data.count).toEqual(1);
  });
  */
});
