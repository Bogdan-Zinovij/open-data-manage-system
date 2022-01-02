'use strict';

const app = require('../../app');
const db = require('../../db/db');
const associate = require('../../db/associate');

describe('Testing endpoints for metadataKey table', () => {
  beforeAll(async () => {
    associate();
    await app.ready();
  });

  afterAll(async () => {
    db.close();
    app.close();
  });

  const metadataKeyMock = {
    key: 'metadata key name',
    description: 'metadata key description',
    metaDataKey: null,
  };

  test('Should create new metadata key', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/metadataKey/',
      body: { ...metadataKeyMock },
    });

    const body = JSON.parse(response.body);
    const newItem = body.data.newItem;
    metadataKeyMock.id = newItem.id;

    expect(response.statusCode).toBe(201);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof newItem).toBe('object');
    expect(newItem).toHaveProperty('id');
    expect(newItem).toHaveProperty('key', metadataKeyMock.key);
    expect(newItem).toHaveProperty('description', metadataKeyMock.description);
    expect(newItem).toHaveProperty('metaDataKey', metadataKeyMock.metaDataKey);
  });

  test('Should get all metadata keys', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/metadataKey/',
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('results');
    expect(body).toHaveProperty('data');
    expect(typeof body.data).toBe('object');
    expect(typeof body.results).toBe('number');
    expect(Array.isArray(body.data.items)).toBe(true);
  });

  test('Should get metadata key by id', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/metadataKey/${metadataKeyMock.id}`,
    });

    const body = JSON.parse(response.body);
    const item = body.data.item;

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof body.data).toBe('object');
    expect(typeof item).toBe('object');
    expect(item).toEqual(metadataKeyMock);
  });

  test('Should update metadata key by id', async () => {
    const dataToUpdate = {
      key: 'updated metadata key name',
      description: 'updated metadata key description',
      metaDataKey: null,
    };

    const response = await app.inject({
      method: 'PATCH',
      url: `/api/v1/metadataKey/${metadataKeyMock.id}`,
      body: { ...dataToUpdate },
    });

    const body = JSON.parse(response.body);
    console.log(body);
    const updatedItem = body.data.updatedItem;

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof body.data).toBe('object');
    expect(typeof updatedItem).toBe('object');
    expect(updatedItem).toHaveProperty('id', metadataKeyMock.id);
    expect(updatedItem).toHaveProperty('key', dataToUpdate.key);
    expect(updatedItem).toHaveProperty('description', dataToUpdate.description);
    expect(updatedItem).toHaveProperty('metaDataKey', dataToUpdate.metaDataKey);
  });

  test('Should delete metadata key by id', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/api/v1/metadataKey/${metadataKeyMock.id}`,
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data', null);
  });
});
