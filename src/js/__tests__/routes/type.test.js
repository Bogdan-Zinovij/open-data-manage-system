'use strict';

const app = require('../app');
const db = require('../db/db');
const associate = require('../db/associate');

describe('Testing endpoints for type table', () => {
  beforeAll(async () => {
    associate();
    await app.ready();
  });

  afterAll(async () => {
    db.close();
    app.close();
  });

  const typeMock = {
    text: 'String',
  };
  test('Should create new type', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/type/',
      body: { ...typeMock },
    });

    const body = JSON.parse(response.body);

    const newItem = body.data.newItem;

    typeMock.id = newItem.id;

    expect(response.statusCode).toBe(201);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('success');
    expect(body).toHaveProperty('data');
    expect(typeof newItem).toBe('object');
    expect(newItem).toHaveProperty('id');
    expect(newItem).toHaveProperty('text', typeMock.text);
  });

  test('Should get all types', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/type/',
    });

    const body = response.json();

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('results');
    expect(body).toHaveProperty('data');
    expect(typeof body.data).toBe('object');
    expect(typeof body.results).toBe('number');
    expect(Array.isArray(body.data.items)).toBe(true);
  });

  test('Should get type by id', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/type/${typeMock.id}`,
    });

    const body = response.json();
    const {
      data: { item },
    } = body;

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('data');
    expect(body.status).toEqual('success');
    expect(typeof body.data).toBe('object');
    expect(typeof item).toBe('object');
    expect(item).toEqual(typeMock);
  });

  test('Should update type by id', async () => {
    const dataToUpdate = {
      text: 'Number',
    };

    const response = await app.inject({
      method: 'PATCH',
      url: `/api/v1/type/${typeMock.id}`,
      body: { ...dataToUpdate },
    });

    const body = JSON.parse(response.body);
    const {
      data: { updatedItem },
    } = body;

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('success');
    expect(body).toHaveProperty('data');
    expect(typeof updatedItem).toBe('object');
    expect(updatedItem).toHaveProperty('id', typeMock.id);
    expect(updatedItem).toHaveProperty('text', dataToUpdate.text);
  });

  test('Should delete type by id', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/api/v1/type/${typeMock.id}`,
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('data');
    expect(body.status).toEqual('success');
    expect(body.data).toEqual(null);
  });
});
