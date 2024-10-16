import axios from 'axios';
import { faker } from '@faker-js/faker';
import { getGlobalToken } from '../utils/loginUser';

const baseUrl = 'http://localhost:3000';
let token = '';
let contactTypeId = 1;

beforeAll(async () => {
  axios.defaults.baseURL = baseUrl;
  token = await getGlobalToken();
});

describe('Contact Types API tests', () => {
  const newContactType = {
    name: faker.commerce.productName(),
  };

  /*
  test('Create new contact type', async () => {
    const response = await axios.post('/contact-types', newContactType, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(201);
    expect(response.data.name).toEqual(newContactType.name);
    contactTypeId = response.data.id;
  });
  */

  test('Get all contact types', async () => {
    const response = await axios.get('/contact-types', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.total).toBeGreaterThan(0);
  });

  test('Get contact type by ID', async () => {
    const response = await axios.get(`/contact-types/${contactTypeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.id).toEqual(contactTypeId);
  });

  /*
  test('Update contact type', async () => {
    const updatedContactType = {
      name: faker.commerce.productName(),
    };

    const response = await axios.patch(
      `/contact-types/${contactTypeId}`,
      updatedContactType,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
    expect(response.data.name).toEqual(updatedContactType.name);
  });
  */

  /*
  test('Delete contact type', async () => {
    const response = await axios.delete(`/contact-types`, {
      data: {
        ids: [contactTypeId],
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(200);
    expect(response.data.count).toEqual(1);
  });
  */
});
