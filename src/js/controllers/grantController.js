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
