'use strict';

const AvailableAction = require('../db/models/AvailableAction');

exports.getAllAvailableActions = async (req, reply) => {
  try {
    const availableActions = await AvailableAction.findAll();
    reply.status(200).send({
      status: 'success',
      results: availableActions.length,
      data: {
        availableActions,
      },
    });
  } catch (err) {
    reply.status(404).send({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getAvailableAction = async (req, reply) => {
  try {
    const { id } = req.params;
    const availableAction = await AvailableAction.findOne({ where: { id } });

    if (!availableAction)
      throw new Error(`There's no available action with an id value of ${id}`);

    reply.status(200).send({
      status: 'success',
      data: { availableAction },
    });
  } catch (err) {
    reply.status(404).send({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.createAvailableAction = async (req, reply) => {
  try {
    const newAvailableAction = await AvailableAction.create(req.body);
    reply.status(201).send({
      status: 'success',
      data: { newAvailableAction },
    });
  } catch (err) {
    reply.status(404).send({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteAvailableAction = async (req, reply) => {
  try {
    const { id } = req.params;
    const availableAction = await AvailableAction.findOne({ where: { id } });

    if (!availableAction)
      throw new Error(
        `Can't delete an available action with an id value of ${id}`
      );

    await availableAction.destroy({ where: { id } });

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
};

exports.updateAvailableAction = async (req, reply) => {
  try {
    const { id } = req.params;
    const availableAction = await AvailableAction.findOne({ where: { id } });

    if (!availableAction)
      throw new Error(`There's no available action with an id value of ${id}`);

    const [affectedRowsCount] = await AvailableAction.update(req.body, {
      where: { id },
    });

    if (!affectedRowsCount)
      throw new Error(
        `Available action with an id value of ${id} hasn't been updated`
      );

    const updatedRole = await AvailableAction.findOne({ where: { id } });

    reply.status(200).send({
      status: 'success',
      data: {
        updatedRole,
      },
    });
  } catch (err) {
    reply.status(404).send({
      status: 'fail',
      message: err.message,
    });
  }
};
