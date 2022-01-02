'use strict';

const app = require('../../app');
const db = require('../../db/db');
const associate = require('../../db/associate');

describe('Testing endpoints for availableAction table', () => {
  beforeAll(async () => {
    associate();
    await app.ready();
  });

  afterAll(async () => {
    db.close();
    app.close();
  });

  const availableActionMock = {
    role: 1,
    actionType: 1,
  };

  test('Should create new available action', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/availableAction/',
      body: { ...availableActionMock },
    });

    const body = JSON.parse(response.body);
    const newItem = body.data.newItem;
    availableActionMock.id = newItem.id;

    expect(response.statusCode).toBe(201);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof newItem).toBe('object');
    expect(newItem).toHaveProperty('id');
    expect(newItem).toHaveProperty('role', availableActionMock.role);
    expect(newItem).toHaveProperty(
      'actionType',
      availableActionMock.actionType
    );
  });

  test('Should get all available actions', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/availableAction/',
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

  test('Should get available action by id', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/availableAction/${availableActionMock.id}`,
    });

    const body = JSON.parse(response.body);
    const item = body.data.item;

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof body.data).toBe('object');
    expect(typeof item).toBe('object');
    expect(item).toEqual(availableActionMock);
  });

  test('Should update available action by id', async () => {
    const dataToUpdate = {
      role: 2,
      actionType: 2,
    };

    const response = await app.inject({
      method: 'PATCH',
      url: `/api/v1/availableAction/${availableActionMock.id}`,
      body: { ...dataToUpdate },
    });

    const body = JSON.parse(response.body);
    const updatedItem = body.data.updatedItem;

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof body.data).toBe('object');
    expect(typeof updatedItem).toBe('object');
    expect(updatedItem).toHaveProperty('id', availableActionMock.id);
    expect(updatedItem).toHaveProperty('role', dataToUpdate.role);
    expect(updatedItem).toHaveProperty('actionType', dataToUpdate.actionType);
  });

  test('Should delete available action by id', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/api/v1/availableAction/${availableActionMock.id}`,
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data', null);
  });
});
