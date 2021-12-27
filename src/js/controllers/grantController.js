'use strict';

const Grant = require('../db/models/Grant');

exports.getAllGrants = async (req, reply) => {
  try {
    const grants = await Grant.findAll();
    reply.status(200).send({
      status: 'success',
      results: grants.length,
      data: {
        grants,
      },
    });
  } catch (err) {
    reply.status(404).send({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getGrant = async (req, reply) => {
  try {
    const { id } = req.params;
    const grant = await Grant.findOne({ where: { id } });

    if (!grant) throw new Error(`There's no grant with an id value of ${id}`);

    reply.status(200).send({
      status: 'success',
      data: { grant },
    });
  } catch (err) {
    reply.status(404).send({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.createGrant = async (req, reply) => {
  try {
    const newGrant = await Grant.create(req.body);
    reply.status(201).send({
      status: 'success',
      data: { newGrant },
    });
  } catch (err) {
    reply.status(404).send({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteGrant = async (req, reply) => {
  try {
    const { id } = req.params;
    const grant = await Grant.findOne({ where: { id } });

    if (!grant)
      throw new Error(`Can't delete a grant with an id value of ${id}`);

    await Grant.destroy({ where: { id } });

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

exports.updateGrant = async (req, reply) => {
  try {
    const { id } = req.params;
    const grant = await Grant.findOne({ where: { id } });

    if (!grant) throw new Error(`There's no grant with an id value of ${id}`);

    const [affectedRowsCount] = await Grant.update(req.body, {
      where: { id },
    });

    if (!affectedRowsCount)
      throw new Error(`Grant with an id value of ${id} hasn't been updated`);

    const updatedRole = await Grant.findOne({ where: { id } });

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
