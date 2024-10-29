import axios from 'axios';
import { getGlobalToken } from '../utils/loginUser';

const baseUrl = 'http://localhost:3000';
let token = '';
const addressTypeId = 1;

beforeAll(async () => {
  axios.defaults.baseURL = baseUrl;
  token = await getGlobalToken();
});

describe('Address Types API tests', () => {
  // const newAddressType = {
  //   name: faker.commerce.productName(),
  // };

  /*
  test('Create new address type', async () => {
    const response = await axios.post('/address-types', newAddressType, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(201);
    expect(response.data.name).toEqual(newAddressType.name);
    addressTypeId = response.data.id;
  });
  */

  test('Get all address types', async () => {
    const response = await axios.get('/address-types', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.total).toBeGreaterThan(0);
  });

  test('Get address type by ID', async () => {
    const response = await axios.get(`/address-types/${addressTypeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.id).toEqual(addressTypeId);
  });

  /*
  test('Update address type', async () => {
    const updatedAddressType = {
      name: faker.commerce.productName(),
    };

    const response = await axios.patch(
      `/address-types/${addressTypeId}`,
      updatedAddressType,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
    expect(response.data.name).toEqual(updatedAddressType.name);
  });
  */

  /*
  test('Delete address type', async () => {
    const response = await axios.delete(`/address-types/`, {
      data: {
        ids: [addressTypeId],
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
