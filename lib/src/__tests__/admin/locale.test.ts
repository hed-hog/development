import axios from 'axios';
import { getGlobalToken } from '../utils/loginUser';

const baseUrl = 'http://localhost:3000';
let token: string;

beforeAll(async () => {
  token = await getGlobalToken();
  axios.defaults.baseURL = baseUrl;
});

describe('Locale API tests', () => {
  // const newLocale = {
  //   name: 'english',
  //   code: 'en',
  //   region: 'US',
  //   country_id: 24,
  // };

  const localeId = 1;

  /* test('Create new locale', async () => {
    const response = await axios.post('/locale', newLocale, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(201);
    expect(response.data.name).toEqual(newLocale.name);
    expect(response.data.code).toEqual(newLocale.code);
    localeId = response.data.id;
  });
*/
  /*
  test('Get all locale with pagination', async () => {
    const response = await axios.get('/locale', {
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
  test('Update locale', async () => {
    const updatedName = 'english2';
    const response = await axios.patch(
      `/locale/${localeId}`,
      { name: updatedName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
    expect(response.data.name).toEqual(updatedName);
  });*/

  test('Get locale by ID', async () => {
    const response = await axios.get(`/locale/${localeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.id).toEqual(localeId);
  });

  /*
  test('Delete locale', async () => {
    const response = await axios.delete(`/locale`, {
      data: {
        ids: [localeId],
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(200);
  });*/

  /*
  test('Get translation for locale', async () => {
    const response = await axios.get(`/locale/${newLocale.code}/translation`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Object);
  });
  */
});
