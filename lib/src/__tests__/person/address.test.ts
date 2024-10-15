import axios from 'axios';
import { faker } from '@faker-js/faker';
import { getGlobalToken } from '../utils/loginUser';

const baseUrl = 'http://localhost:3000';
let token = '';
let personId = 0;
let addressId = 0;

beforeAll(async () => {
  axios.defaults.baseURL = baseUrl;
  token = await getGlobalToken();

  const personResponse = await axios.post(
    '/persons',
    {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  personId = personResponse.data.id;
});

describe('Addresses API tests', () => {
  const newAddress = {
    country_id: 1,
    type_id: 1,
    primary: true,
    street: faker.location.street(),
    number: faker.number.int({ min: 1, max: 999 }),
    complement: faker.location.secondaryAddress(),
    district: faker.location.city(),
    city: faker.location.city(),
    state: faker.location.state(),
    postal_code: faker.location.zipCode(),
    reference: faker.location.streetAddress(),
  };

  test('Create new address', async () => {
    const response = await axios.post(
      `/persons/${personId}/address`,
      newAddress,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(201);
    expect(response.data.street).toEqual(newAddress.street);
    addressId = response.data.id;
  });

  test('Get all addresses for a person', async () => {
    const response = await axios.get(`/persons/${personId}/address`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.total).toBeGreaterThan(0);
  });

  test('Get address by ID', async () => {
    const response = await axios.get(
      `/persons/${personId}/address?id=${addressId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toBe(200);
    expect(response.data.id).toEqual(addressId);
  });

  test('Update address', async () => {
    const updatedAddress = {
      primary: false,
      street: faker.location.street(),
      city: faker.location.city(),
    };

    const response = await axios.patch(
      `/persons/${personId}/address/${addressId}`,
      updatedAddress,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
    expect(response.data.primary).toEqual(updatedAddress.primary);
    expect(response.data.street).toEqual(updatedAddress.street);
  });

  test('Delete address', async () => {
    const response = await axios.delete(
      `/persons/${personId}/address/${addressId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
    expect(response.data.count).toEqual(1);
  });
});
