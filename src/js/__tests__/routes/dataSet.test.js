'use strict';

const app = require('../../app');
const db = require('../../db/db');
const associate = require('../../db/associate');

describe('Testing endpoints for dataSet table', () => {
  beforeAll(async () => {
    associate();
    await app.ready();
  });

  afterAll(async () => {
    db.close();
    app.close();
  });

  const dataSetMock = {
    category: null,
  };

  test('Should create new data set', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/dataSets/',
      body: { ...dataSetMock },
    });

    const body = JSON.parse(response.body);
    const newItem = body.data.newItem;
    dataSetMock.id = newItem.id;

    expect(response.statusCode).toBe(201);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof newItem).toBe('object');
    expect(newItem).toHaveProperty('id');
    expect(newItem).toHaveProperty('createdAt');
    expect(newItem).toHaveProperty('updatedAt');
    expect(newItem).toHaveProperty('category', dataSetMock.category);
  });

  test('Should get all data sets', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/dataSets/',
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

  test('Should get data set by id', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/dataSets/${dataSetMock.id}`,
    });

    const body = JSON.parse(response.body);
    const item = body.data.item;

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof body.data).toBe('object');
    expect(typeof item).toBe('object');
    expect(item).toHaveProperty('id', dataSetMock.id);
    expect(item).toHaveProperty('category', dataSetMock.category);
  });

  test('Should update data set by id', async () => {
    const dataToUpdate = {
      category: 1,
    };

    const response = await app.inject({
      method: 'PATCH',
      url: `/api/v1/dataSets/${dataSetMock.id}`,
      body: { ...dataToUpdate },
    });

    const body = JSON.parse(response.body);
    const updatedItem = body.data.updatedItem;

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof updatedItem).toBe('object');
    expect(updatedItem).toHaveProperty('id', dataSetMock.id);
    expect(updatedItem).toHaveProperty('category', dataToUpdate.category);
  });

  test('Should delete data set by id', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/api/v1/dataSets/${dataSetMock.id}`,
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data', null);
  });
});
