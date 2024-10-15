import axios from 'axios';
import { faker } from '@faker-js/faker';
import { getGlobalToken } from '../utils/loginUser';

const baseUrl = 'http://localhost:3000';
let token = '';
let documentTypeId = 0;
const locale = 'en';

beforeAll(async () => {
  axios.defaults.baseURL = baseUrl;
  token = await getGlobalToken();
});

describe('DocumentType API tests', () => {
  const newDocumentType = {
    name: faker.commerce.productName(),
  };

  test('Create new document type', async () => {
    const response = await axios.post('/document-types', newDocumentType, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toEqual(201);
    expect(response.data.name).toEqual(newDocumentType.name);
    documentTypeId = response.data.id;
  });

  test('Get all document types', async () => {
    const response = await axios.get(`/document-types`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        locale: locale,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.total).toBeGreaterThan(0);
  });

  test('Get document type by ID', async () => {
    const response = await axios.get(`/document-types/${documentTypeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.id).toEqual(documentTypeId);
  });

  test('Update document type', async () => {
    const updatedDocumentType = {
      name: faker.commerce.productName(),
    };

    const response = await axios.patch(
      `/document-types/${documentTypeId}`,
      updatedDocumentType,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
    expect(response.data.name).toEqual(updatedDocumentType.name);
  });

  test('Delete document type', async () => {
    const response = await axios.delete(`/document-types`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ids: [documentTypeId],
      },
    });

    expect(response.status).toEqual(200);
    expect(response.data.count).toEqual(1);
  });
});
