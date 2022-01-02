'use strict';

const app = require('../../app');
const db = require('../../db/db');
const associate = require('../../db/associate');

describe('Testing endpoints for role table', () => {
  beforeAll(async () => {
    associate();
    await app.ready();
  });

  afterAll(async () => {
    db.close();
    app.close();
  });

  const roleMock = {
    name: 'role name',
  };

  test('Should create new role', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/role/',
      body: { ...roleMock },
    });

    const body = JSON.parse(response.body);
    const newItem = body.data.newItem;
    roleMock.id = newItem.id;

    expect(response.statusCode).toBe(201);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof newItem).toBe('object');
    expect(newItem).toHaveProperty('id');
    expect(newItem).toHaveProperty('name', roleMock.name);
  });

  test('Should get all roles', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/role/',
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

  test('Should get role by id', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/role/${roleMock.id}`,
    });

    const body = JSON.parse(response.body);
    const item = body.data.item;

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof body.data).toBe('object');
    expect(typeof item).toBe('object');
    expect(item).toEqual(roleMock);
  });

  test('Should update role by id', async () => {
    const dataToUpdate = {
      name: 'updated role name',
    };

    const response = await app.inject({
      method: 'PATCH',
      url: `/api/v1/role/${roleMock.id}`,
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
    expect(updatedItem).toHaveProperty('id', roleMock.id);
    expect(updatedItem).toHaveProperty('name', dataToUpdate.name);
  });

  test('Should delete role by id', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/api/v1/role/${roleMock.id}`,
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data', null);
  });
});
