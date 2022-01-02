'use strict';

const app = require('../../app');
const db = require('../../db/db');
const associate = require('../../db/associate');

describe('Testing endpoints for metadataValue table', () => {
  beforeAll(async () => {
    associate();
    await app.ready();
  });

  afterAll(async () => {
    db.close();
    app.close();
  });

  const metadataValueMock = {
    value: 'metadataValue value',
    metaDataKey: 1,
    dataSet: null,
    category: null,
    dataFile: null,
  };

  test('Should create new metadata value', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/metadataValue/',
      body: { ...metadataValueMock },
    });

    const body = JSON.parse(response.body);
    const newItem = body.data.newItem;
    metadataValueMock.id = newItem.id;

    expect(response.statusCode).toBe(201);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof newItem).toBe('object');
    expect(newItem).toHaveProperty('id', metadataValueMock.id);
    expect(newItem).toHaveProperty('value', metadataValueMock.value);
    expect(newItem).toHaveProperty(
      'metaDataKey',
      metadataValueMock.metaDataKey
    );
    expect(newItem).toHaveProperty('dataSet', metadataValueMock.dataSet);
    expect(newItem).toHaveProperty('category', metadataValueMock.category);
    expect(newItem).toHaveProperty('dataFile', metadataValueMock.dataFile);
  });

  test('Should get all metadata values', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/metadataValue/',
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

  test('Should get metadata value by id', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/metadataValue/${metadataValueMock.id}`,
    });

    const body = JSON.parse(response.body);
    const item = body.data.item;

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof body.data).toBe('object');
    expect(typeof item).toBe('object');
    expect(item).toEqual(metadataValueMock);
  });

  test('Should update metadata value by id', async () => {
    const dataToUpdate = {
      value: 'metadata value to update',
      metaDataKey: 2,
      dataSet: null,
      category: null,
      dataFile: null,
    };

    const response = await app.inject({
      method: 'PATCH',
      url: `/api/v1/metadataValue/${metadataValueMock.id}`,
      body: { ...dataToUpdate },
    });

    const body = JSON.parse(response.body);
    const updatedItem = body.data.updatedItem;

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof updatedItem).toBe('object');
    expect(updatedItem).toHaveProperty('id', metadataValueMock.id);
    expect(updatedItem).toHaveProperty('value', dataToUpdate.value);
    expect(updatedItem).toHaveProperty('metaDataKey', dataToUpdate.metaDataKey);
    expect(updatedItem).toHaveProperty('dataSet', dataToUpdate.dataSet);
    expect(updatedItem).toHaveProperty('category', dataToUpdate.category);
    expect(updatedItem).toHaveProperty('dataFile', dataToUpdate.dataFile);
  });

  test('Should delete metadata value by id', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/api/v1/metadataValue/${metadataValueMock.id}`,
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data', null);
  });
});
