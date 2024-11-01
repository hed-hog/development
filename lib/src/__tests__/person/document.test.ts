// const baseUrl = 'http://localhost:3000';
// let token = '';
// const documentId = 1;
// const personId = 1;

beforeAll(async () => {
  // axios.defaults.baseURL = baseUrl;
  // token = await getGlobalToken();
});

describe('Document API tests', () => {
  // const newDocument = {
  //   type_id: 1,
  //   primary: true,
  //   value: faker.number.int({ min: 999999 }),
  //   country_id: 1,
  //   issued_at: new Date(),
  //   expiry_at: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  // };

  /*
  test('Create new document', async () => {
    const response = await axios.post(
      `/person/${personId}/documents`,
      newDocument,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(201);
    expect(response.data.value).toEqual(newDocument.value);
    documentId = response.data.id;
  });
*/

  /*
  test('Get all documents for a person', async () => {
    const response = await axios.get(`/person/${personId}/documents`, {
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
  test('Get document by ID', async () => {
    const response = await axios.get(
      `/person/${personId}/documents/?id=${documentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toBe(200);
    expect(response.data.id).toEqual(documentId);
  });
  */

  /*
  test('Get document by type ID', async () => {
    const response = await axios.get(
      `/person/${personId}/documents?typeId=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toBe(200);
    expect(response.data.data).toBeInstanceOf(Array);
    expect(response.data.data.length).toBeGreaterThan(0);
  });
  */

  /*
  test('Update document', async () => {
    const updatedDocument = {
      primary: false,
      value: faker.number.int({ min: 999999 }),
    };

    const response = await axios.patch(
      `/person/${personId}/documents/${documentId}`,
      updatedDocument,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(response.status).toEqual(200);
    expect(response.data.primary).toEqual(updatedDocument.primary);
    expect(response.data.value).toEqual(updatedDocument.value);
  });
  */

  /*
  test('Delete document', async () => {
    const response = await axios.delete(
      `/person/${personId}/documents/${documentId}`,
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
