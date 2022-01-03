'use strict';

const Category = require('../db/models/Category');
const DataSet = require('../db/models/DataSet');
const RoutesController = require('../utils/routesController');

const categoryController = new RoutesController(Category);

categoryController.getAllDataSetsInCategory = async (req, reply) => {
  try {
    const id = +req.params.id;

    const category = await Category.findOne({
      where: { id },
      include: [DataSet],
    });

    if (!category)
      throw new Error('Category with the specified ID does not exist');

    reply.status(200).send({
      status: 'success',
      data: { category },
    });
  } catch (err) {
    reply.status(404).send({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports = categoryController;
