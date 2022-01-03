'use strict';

const app = require('../../app');
const db = require('../../db/db');
const associate = require('../../db/associate');

describe('Testing endpoints for action table', () => {
  beforeAll(async () => {
    associate();
    await app.ready();
  });

  afterAll(async () => {
    db.close();
    app.close();
  });

  const actionMock = {
    at: '2002-11-17',
    state: 2,
    actionType: 2,
    grant: 2,
  };

  test('Should create new action', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/action/',
      body: { ...actionMock },
    });

    const body = JSON.parse(response.body);
    const newItem = body.data.newItem;
    actionMock.id = newItem.id;

    expect(response.statusCode).toBe(201);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof newItem).toBe('object');
    expect(newItem).toHaveProperty('id');
    expect(newItem).toHaveProperty('at');
    expect(newItem).toHaveProperty('state', actionMock.state);
    expect(newItem).toHaveProperty('actionType', actionMock.actionType);
    expect(newItem).toHaveProperty('grant', actionMock.grant);
  });

  test('Should get all actions', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/action/',
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

  test('Should get action by id', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/action/${actionMock.id}`,
    });

    const body = JSON.parse(response.body);
    const item = body.data.item;

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof body.data).toBe('object');
    expect(typeof item).toBe('object');
    expect(item).toEqual(actionMock);
  });

  test('Should update action by id', async () => {
    const dataToUpdate = {
      at: '2002-11-17',
      state: 1,
      actionType: 1,
      grant: 2,
    };

    const response = await app.inject({
      method: 'PATCH',
      url: `/api/v1/action/${actionMock.id}`,
      body: { ...dataToUpdate },
    });

    const body = JSON.parse(response.body);
    const updatedItem = body.data.updatedItem;

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof updatedItem).toBe('object');
    expect(updatedItem).toHaveProperty('id', actionMock.id);
    expect(updatedItem).toHaveProperty('at', dataToUpdate.at);
    expect(updatedItem).toHaveProperty('state', dataToUpdate.state);
    expect(updatedItem).toHaveProperty('actionType', dataToUpdate.actionType);
    expect(updatedItem).toHaveProperty('grant', dataToUpdate.grant);
  });

  test('Should delete action by id', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/api/v1/action/${actionMock.id}`,
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(body.data).toEqual(null);
  });
});
