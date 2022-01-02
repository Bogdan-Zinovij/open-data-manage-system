'use strict';

const app = require('../../app');
const db = require('../../db/db');
const associate = require('../../db/associate');

describe('Testing endpoints for dataFile table', () => {
  beforeAll(async () => {
    associate();
    await app.ready();
  });

  afterAll(async () => {
    db.close();
    app.close();
  });

  const dataFileMock = {
    dataSet: 1,
  };

  test('Should create new data file', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/dataSets/1/dataFiles/',
      body: { ...dataFileMock },
    });

    const body = JSON.parse(response.body);
    const newItem = body.data.newItem;
    dataFileMock.id = newItem.id;

    expect(response.statusCode).toBe(201);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof newItem).toBe('object');
    expect(newItem).toHaveProperty('id');
    expect(newItem).toHaveProperty('dataSet', dataFileMock.dataSet);
    expect(newItem).toHaveProperty('createdAt');
    expect(newItem).toHaveProperty('updatedAt');
  });

  test('Should get all data files', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/dataSets/dataFiles/',
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

  test('Should get all data files in data set', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/dataSets/1/dataFiles/',
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

  test('Should get data file in data set by id', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/dataSets/1/dataFiles/${dataFileMock.id}`,
    });

    const body = JSON.parse(response.body);
    const item = body.data.item;

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof body.data).toBe('object');
    expect(typeof item).toBe('object');
    expect(item.id).toBe(dataFileMock.id);
    expect(item.dataSet).toBe(dataFileMock.dataSet);
  });

  test('Should update data file by id', async () => {
    const dataToUpdate = {
      dataSet: 2,
    };

    const response = await app.inject({
      method: 'PATCH',
      url: `/api/v1/dataSets/1/dataFiles/${dataFileMock.id}`,
      body: { ...dataToUpdate },
    });

    const body = JSON.parse(response.body);
    const updatedItem = body.data.updatedItem;

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof updatedItem).toBe('object');
    expect(updatedItem).toHaveProperty('id', dataFileMock.id);
    expect(updatedItem).toHaveProperty('dataSet', dataToUpdate.dataSet);
    expect(updatedItem).toHaveProperty('createdAt');
    expect(updatedItem).toHaveProperty('updatedAt');
  });

  test('Should delete data file by id', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/api/v1/dataSets/2/dataFiles/${dataFileMock.id}`,
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data', null);
  });
});
