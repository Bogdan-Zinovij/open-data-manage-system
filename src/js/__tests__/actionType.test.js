'use strict';

const app = require('../app');
const db = require('../db/db');
const associate = require('../db/associate');
const ActionType = require('../db/models/ActionType');

describe('Testing endpoints for actionType table', () => {
  beforeAll(async () => {
    associate();
    await app.ready();
  });

  afterAll(async () => {
    //await db.sync({ force: true });
    db.close();
    app.close();
  });

  const { dataValues: actionTypeMock } = ActionType.build({
    name: 'actiontype name',
    description: 'actiontype description',
  });

  test('Should create new action type', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/actionType/',
      body: { ...actionTypeMock },
    });

    const body = JSON.parse(response.body);

    const {
      data: { newItem },
    } = JSON.parse(response.body);

    actionTypeMock.id = newItem.id;

    expect(response.statusCode).toBe(201);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('success');
    expect(body).toHaveProperty('data');
    expect(typeof newItem).toBe('object');
    expect(newItem).toHaveProperty('id');
    expect(newItem).toHaveProperty('name');
    expect(newItem).toHaveProperty('description');
    expect(newItem.name).toEqual(actionTypeMock.name);
    expect(newItem.description).toEqual(actionTypeMock.description);
  });

  test('Should get all action types', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/actionType/',
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

  test('Should get action type by id', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/actionType/${actionTypeMock.id}`,
    });

    const body = JSON.parse(response.body);
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
    expect(item).toEqual(actionTypeMock);
  });

  test('Should update action type by id', async () => {
    const dataToUpdate = {
      name: 'updated name',
      description: 'updated description',
    };

    const response = await app.inject({
      method: 'PATCH',
      url: `/api/v1/actionType/${actionTypeMock.id}`,
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
    expect(updatedItem).toHaveProperty('id');
    expect(updatedItem).toHaveProperty('name');
    expect(updatedItem).toHaveProperty('description');
    expect(updatedItem.name).toEqual(dataToUpdate.name);
    expect(updatedItem.description).toEqual(dataToUpdate.description);
    expect(updatedItem.id).toEqual(actionTypeMock.id);
  });

  test('Should delete action type by id', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/api/v1/actionType/${actionTypeMock.id}`,
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
