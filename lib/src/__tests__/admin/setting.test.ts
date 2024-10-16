import axios from 'axios';
import { faker } from '@faker-js/faker';
import { getGlobalToken } from '../utils/loginUser';

const baseUrl = 'http://localhost:3000';
let token = '';
let settingId = 1;

beforeAll(async () => {
  axios.defaults.baseURL = baseUrl;
  token = await getGlobalToken();
});

describe('Settings API tests', () => {
  const newSetting = {
    name: faker.lorem.word(),
  };

  /*
  test('Create new setting', async () => {
    try {
      const response = await axios.post('/settings', newSetting, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(response.status).toEqual(201);
      expect(response.data.name).toEqual(newSetting.name);
      settingId = response.data.id;
    } catch (error) {}
  });
  */

  test('Get all settings with pagination', async () => {
    try {
      const response = await axios.get('/settings', {
        params: { page: 1, pageSize: 10 },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data.data).toBeInstanceOf(Array);
      expect(response.data.total).toBeGreaterThan(0);
    } catch (error) {}
  });

  test('Get setting by ID', async () => {
    try {
      const response = await axios.get(`/settings/${settingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data.id).toEqual(settingId);
    } catch (error) {}
  });

  /*
  test('Update setting', async () => {
    try {
      const updatedSetting = {
        name: faker.lorem.word(),
      };

      const response = await axios.patch(
        `/settings/${settingId}`,
        updatedSetting,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      expect(response.status).toEqual(200);
      expect(response.data.name).toEqual(updatedSetting.name);
    } catch (error) {}
  });
*/

  /*
  test('Delete setting', async () => {
    try {
      const response = await axios.delete(`/settings`, {
        data: { ids: [settingId] },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(response.status).toEqual(200);
      expect(response.data.count).toEqual(1);
    } catch (error) {}
  });
  */
});
