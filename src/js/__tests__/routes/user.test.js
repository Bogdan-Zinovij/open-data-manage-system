'use strict';

const app = require('../app');
const db = require('../db/db');
const associate = require('../db/associate');

describe('Testing endpoints for user table', () => {
  beforeAll(async () => {
    associate();
    await app.ready();
  });

  afterAll(async () => {
    db.close();
    app.close();
  });

  const userMock = {
    name: 'Mike',
    password: 'Marcus2000',
  };
  test('Should create new user', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/user/',
      body: { ...userMock },
    });

    const body = JSON.parse(response.body);

    const newItem = body.data.newItem;

    userMock.id = newItem.id;

    expect(response.statusCode).toBe(201);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('success');
    expect(body).toHaveProperty('data');
    expect(typeof newItem).toBe('object');
    expect(newItem).toHaveProperty('id');
    expect(newItem).toHaveProperty('name', userMock.name);
    expect(newItem).toHaveProperty('password', userMock.password);
  });

  test('Should get all users', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/user/',
    });

    const body = response.json();

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('results');
    expect(body).toHaveProperty('data');
    expect(typeof body.data).toBe('object');
    expect(typeof body.results).toBe('number');
    expect(Array.isArray(body.data.items)).toBe(true);
  });

  test('Should get user by id', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/user/${userMock.id}`,
    });

    const body = response.json();
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
    expect(item).toEqual(userMock);
  });

  test('Should update user by id', async () => {
    const dataToUpdate = {
      name: 'Mika',
      password: 'Marks2000',
    };

    const response = await app.inject({
      method: 'PATCH',
      url: `/api/v1/user/${userMock.id}`,
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
    expect(updatedItem).toHaveProperty('id', userMock.id);
    expect(updatedItem).toHaveProperty('name', dataToUpdate.name);
    expect(updatedItem).toHaveProperty('password', dataToUpdate.password);
  });

  test('Should delete user by id', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/api/v1/user/${userMock.id}`,
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
