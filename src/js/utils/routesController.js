'use strict';

module.exports = class RoutesController {
  constructor(model) {
    this.model = model;
    this.modelName = this.model.name;
  }

  getAllItems = async (req, reply) => {
    try {
      const items = await this.model.findAll();
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
  };

  getItemById = async (req, reply) => {
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
  };

  createNewItem = async (req, reply) => {
    try {
      const newItem = await this.model.create(req.body);
      reply.status(201).send({
        status: 'success',
        data: {
          newItem,
        },
      });
    } catch (err) {
      reply.status(400).send({
        status: 'fail',
        message: err.message,
      });
    }
  };

  updateItem = async (req, reply) => {
    try {
      const { id } = req.params;
      const item = await this.model.findOne({
        where: { id },
      });
      let updatedItem;

      if (!item)
        throw new Error(
          `${this.modelName} with the specified ID does not exist`
        );

      const [isUpdated] = await this.model.update(req.body, {
        where: { id },
      });

      if (isUpdated) {
        updatedItem = await this.model.findOne({
          where: { id },
        });
      } else {
        updatedItem = item;
      }

      reply.status(200).send({
        status: 'success',
        data: {
          updatedItem,
        },
      });
    } catch (err) {
      reply.status(404).send({
        status: 'fail',
        message: err.message,
      });
    }
  };
};
