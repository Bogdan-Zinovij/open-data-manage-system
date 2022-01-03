'use strict';

module.exports = class RoutesController {
  constructor(model) {
    this.model = model;
    this.modelName = this.model.name;

    this.getAllItems = this.getAllItems.bind(this);
    this.getItemById = this.getItemById.bind(this);
    this.createNewItem = this.createNewItem.bind(this);
    this.updateItemById = this.updateItemById.bind(this);
    this.deleteItemById = this.deleteItemById.bind(this);
  }

  async getAllItems(req, reply) {
    try {
      const items = await this.model.findAll({ order: ['id'] });
      reply.status(200).send({
        status: 'success',
        results: items.length,
        data: { items },
      });
    } catch (err) {
      reply.status(404).send({
        status: 'fail',
        message: err.message,
      });
    }
  }

  async getItemById(req, reply) {
    try {
      const { id } = req.params;
      const item = await this.model.findOne({ where: { id } });

      if (!item)
        throw new Error(
          `${this.modelName} with the specified ID does not exist`
        );

      reply.status(200).send({
        status: 'success',
        data: { item },
      });
    } catch (err) {
      reply.status(404).send({
        status: 'fail',
        message: err.message,
      });
    }
  }

  async createNewItem(req, reply) {
    try {
      const newItem = await this.model.create(req.body);
      reply.status(201).send({
        status: 'success',
        data: { newItem },
      });
    } catch (err) {
      reply.status(400).send({
        status: 'fail',
        message: err.message,
      });
    }
  }

  async updateItemById(req, reply) {
    try {
      const { id } = req.params;
      const item = await this.model.findOne({ where: { id } });
      let updatedItem;

      if (!item)
        throw new Error(
          `${this.modelName} with the specified ID does not exist`
        );

      const [isUpdated] = await this.model.update(req.body, { where: { id } });

      if (isUpdated) {
        updatedItem = await this.model.findOne({ where: { id } });
      } else {
        updatedItem = item;
      }

      reply.status(200).send({
        status: 'success',
        data: { updatedItem },
      });
    } catch (err) {
      reply.status(404).send({
        status: 'fail',
        message: err.message,
      });
    }
  }

  async deleteItemById(req, reply) {
    try {
      const { id } = req.params;
      const item = await this.model.findOne({ where: { id } });

      if (!item)
        throw new Error(
          `${this.modelName} with the specified ID does not exist`
        );

      await this.model.destroy({ where: { id } });

      reply.status(200).send({
        status: 'success',
        data: null,
      });
    } catch (err) {
      reply.status(404).send({
        status: 'fail',
        message: err.message,
      });
    }
  }
};
