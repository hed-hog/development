import axios from 'axios';
import { faker } from '@faker-js/faker';
import { getGlobalToken } from '../utils/loginUser';

const baseUrl = 'http://localhost:3000';
let token = '';
// let personId = 0;
// let contactId = 1;

beforeAll(async () => {
  axios.defaults.baseURL = baseUrl;
  token = await getGlobalToken();
});

describe('Contacts API tests', () => {
  const newContact = {
    type_id: 1,
    primary: true,
    value: faker.phone.number(),
  };

  /*
  test('Create new contact', async () => {
    const response = await axios.post(
      `/persons/${personId}/contacts`,
      newContact,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(201);
    expect(response.data.value).toEqual(newContact.value);
    contactId = response.data.id;
  });
  */

  /*
  test('Get all contacts for a person', async () => {
    const response = await axios.get(`/persons/${personId}/contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.total).toBeGreaterThan(0);
  });
  */

  /*
  test('Get contact by ID', async () => {
    const response = await axios.get(
      `/persons/${personId}/contacts?id=${contactId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toBe(200);
    expect(response.data.id).toEqual(contactId);
  });
*/
  /*
  test('Get contact by type ID', async () => {
    const response = await axios.get(`/persons/${personId}/contacts?typeId=1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.data.length).toBeGreaterThan(0);
  });
*/

  /*
  test('Update contact', async () => {
    const updatedContact = {
      primary: false,
      value: faker.phone.number(),
    };

    const response = await axios.patch(
      `/persons/${personId}/contacts/${contactId}`,
      updatedContact,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
    expect(response.data.primary).toEqual(updatedContact.primary);
    expect(response.data.value).toEqual(updatedContact.value);
  });
  */

  /*
  test('Delete contact', async () => {
    const response = await axios.delete(
      `/persons/${personId}/contacts/${contactId}`,
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

  test('avoid empty testing file', () => {
    expect(true).toBeTruthy();
  });
});
