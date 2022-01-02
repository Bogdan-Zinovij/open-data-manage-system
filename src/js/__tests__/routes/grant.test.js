'use strict';

const app = require('../../app');
const db = require('../../db/db');
const associate = require('../../db/associate');

describe('Testing endpoints for grant table', () => {
  beforeAll(async () => {
    associate();
    await app.ready();
  });

  afterAll(async () => {
    db.close();
    app.close();
  });

  const grantMock = {
    user: 1,
    role: 1,
    actionType: 1,
    dataSet: 1,
  };

  test('Should create new grant', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/grant/',
      body: { ...grantMock },
    });

    const body = JSON.parse(response.body);
    const newItem = body.data.newItem;
    grantMock.id = newItem.id;

    expect(response.statusCode).toBe(201);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof newItem).toBe('object');
    expect(newItem).toHaveProperty('id');
    expect(newItem).toHaveProperty('user', grantMock.user);
    expect(newItem).toHaveProperty('role', grantMock.role);
    expect(newItem).toHaveProperty('actionType', grantMock.actionType);
    expect(newItem).toHaveProperty('dataSet', grantMock.dataSet);
  });

  test('Should get all grants', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/grant/',
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

  test('Should get grant by id', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/grant/${grantMock.id}`,
    });

    const body = JSON.parse(response.body);
    const item = body.data.item;

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof body.data).toBe('object');
    expect(typeof item).toBe('object');
    expect(item).toEqual(grantMock);
  });

  test('Should update grant by id', async () => {
    const dataToUpdate = {
      role: 2,
      user: 2,
      actionType: 2,
    };

    const response = await app.inject({
      method: 'PATCH',
      url: `/api/v1/grant/${grantMock.id}`,
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
    expect(updatedItem).toHaveProperty('id', grantMock.id);
    expect(updatedItem).toHaveProperty('role', dataToUpdate.role);
    expect(updatedItem).toHaveProperty('user', dataToUpdate.user);
    expect(updatedItem).toHaveProperty('actionType', dataToUpdate.actionType);
    expect(updatedItem).toHaveProperty('dataSet', grantMock.dataSet);
  });

  test('Should delete grant by id', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/api/v1/grant/${grantMock.id}`,
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data', null);
  });
});
