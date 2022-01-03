'use strict';

const app = require('../../app');
const db = require('../../db/db');
const associate = require('../../db/associate');

describe('Testing endpoints for state table', () => {
  beforeAll(async () => {
    associate();
    await app.ready();
  });

  afterAll(async () => {
    db.close();
    app.close();
  });

  const stateMock = {
    name: 'State info 1',
  };

  test('Should create new state', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/state/',
      body: { ...stateMock },
    });

    const body = JSON.parse(response.body);
    const newItem = body.data.newItem;
    stateMock.id = newItem.id;

    expect(response.statusCode).toBe(201);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof newItem).toBe('object');
    expect(newItem).toHaveProperty('id');
    expect(newItem).toHaveProperty('name', stateMock.name);
  });

  test('Should get all states', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/state/',
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

  test('Should get state by id', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/state/${stateMock.id}`,
    });

    const body = JSON.parse(response.body);
    const item = body.data.item;

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof body.data).toBe('object');
    expect(typeof item).toBe('object');
    expect(item).toEqual(stateMock);
  });

  test('Should update state by id', async () => {
    const dataToUpdate = {
      name: 'State info 2',
    };

    const response = await app.inject({
      method: 'PATCH',
      url: `/api/v1/state/${stateMock.id}`,
      body: { ...dataToUpdate },
    });

    const body = JSON.parse(response.body);
    const updatedItem = body.data.updatedItem;

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof updatedItem).toBe('object');
    expect(updatedItem).toHaveProperty('id', stateMock.id);
    expect(updatedItem).toHaveProperty('name', dataToUpdate.name);
  });

  test('Should delete state by id', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/api/v1/state/${stateMock.id}`,
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(body.data).toEqual(null);
  });
});
