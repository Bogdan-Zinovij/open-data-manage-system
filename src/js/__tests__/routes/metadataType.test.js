'use strict';

const app = require('../../app');
const db = require('../../db/db');
const associate = require('../../db/associate');

describe('Testing endpoints for metadataType table', () => {
  beforeAll(async () => {
    associate();
    await app.ready();
  });

  afterAll(async () => {
    db.close();
    app.close();
  });

  const metadataTypeMock = {
    type: 1,
    metaDataKey: 1,
  };
  test('Should create new metadataType', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/metadataType/',
      body: { ...metadataTypeMock },
    });

    const body = JSON.parse(response.body);

    const newItem = body.data.newItem;

    metadataTypeMock.id = newItem.id;

    expect(response.statusCode).toBe(201);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof newItem).toBe('object');
    expect(newItem).toHaveProperty('id');
    expect(newItem).toHaveProperty('type', metadataTypeMock.type);
    expect(newItem).toHaveProperty('metaDataKey', metadataTypeMock.metaDataKey);
  });

  test('Should get all metadataTypes', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/metadataType/',
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

  test('Should get metadataType by id', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/metadataType/${metadataTypeMock.id}`,
    });

    const body = JSON.parse(response.body);
    const {
      data: { item },
    } = body;

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(typeof body.data).toBe('object');
    expect(typeof item).toBe('object');
    expect(item).toEqual(metadataTypeMock);
  });

  test('Should update metadataType by id', async () => {
    const dataToUpdate = {
      type: 2,
      metaDataKey: 2,
    };

    const response = await app.inject({
      method: 'PATCH',
      url: `/api/v1/metadataType/${metadataTypeMock.id}`,
      body: { ...dataToUpdate },
    });

    const body = JSON.parse(response.body);
    const {
      data: { updatedItem },
    } = body;

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof updatedItem).toBe('object');
    expect(updatedItem).toHaveProperty('id', metadataTypeMock.id);
    expect(updatedItem).toHaveProperty('type', dataToUpdate.type);
    expect(updatedItem).toHaveProperty('metaDataKey', dataToUpdate.metaDataKey);
  });

  test('Should delete metadataType by id', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/api/v1/metadataType/${metadataTypeMock.id}`,
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(body.data).toEqual(null);
  });
});
