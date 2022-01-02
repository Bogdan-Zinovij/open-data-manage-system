'use strict';

const app = require('../../app');
const db = require('../../db/db');
const associate = require('../../db/associate');

describe('Testing endpoints for category table', () => {
  beforeAll(async () => {
    associate();
    await app.ready();
  });

  afterAll(async () => {
    db.close();
    app.close();
  });

  const categoryMock = {
    category: null,
  };

  test('Should create new category', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/categories/',
      body: { ...categoryMock },
    });

    const body = JSON.parse(response.body);
    const newItem = body.data.newItem;
    categoryMock.id = newItem.id;

    expect(response.statusCode).toBe(201);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof newItem).toBe('object');
    expect(newItem).toHaveProperty('id');
    expect(newItem).toHaveProperty('category', categoryMock.category);
  });

  test('Should get all categories', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/categories/',
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

  test('Should get category by id', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/categories/${categoryMock.id}`,
    });

    const body = JSON.parse(response.body);
    const item = body.data.item;

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof body.data).toBe('object');
    expect(typeof item).toBe('object');
    expect(item).toEqual(categoryMock);
  });

  test('Should get all data sets in category', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/categories/${categoryMock.id}/dataSets`,
    });

    const body = JSON.parse(response.body);
    const category = body.data.category;

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof body.data).toBe('object');
    expect(typeof category).toBe('object');
    expect(category).toHaveProperty('id', categoryMock.id);
    expect(category).toHaveProperty('category', categoryMock.category);
    expect(category).toHaveProperty('dataSets');
    expect(Array.isArray(category.dataSets)).toBe(true);
  });

  test('Should update category by id', async () => {
    const dataToUpdate = {
      category: 1,
    };

    const response = await app.inject({
      method: 'PATCH',
      url: `/api/v1/categories/${categoryMock.id}`,
      body: { ...dataToUpdate },
    });

    const body = JSON.parse(response.body);
    const updatedItem = body.data.updatedItem;

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data');
    expect(typeof updatedItem).toBe('object');
    expect(updatedItem).toHaveProperty('id', categoryMock.id);
    expect(updatedItem).toHaveProperty('category', dataToUpdate.category);
  });

  test('Should delete category by id', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/api/v1/categories/${categoryMock.id}`,
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('status', 'success');
    expect(body).toHaveProperty('data', null);
  });
});
