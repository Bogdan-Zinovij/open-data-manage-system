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
