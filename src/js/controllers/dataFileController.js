'use strict';

const DataFile = require('../db/models/DataFile');

exports.getAllDataFiles = async (req, reply) => {
  try {
    const items = await DataFile.findAll();

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

exports.getAllDataFilesInDataSet = async (req, reply) => {
  try {
    const items = await DataFile.findAll({
      where: { dataSet: req.params.id },
    });

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

exports.getDataFile = async (req, reply) => {
  try {
    const item = await DataFile.findOne({
      where: {
        id: req.params.fileId,
        dataSet: req.params.id,
      },
    });

    if (!item) {
      throw new Error(
        'Datafile with the specified ID was not found in this Dataset'
      );
    }

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

exports.createDataFile = async (req, reply) => {
  try {
    const dataSet = +req.params.id;
    const newFile = await DataFile.create({ dataSet });

    reply.status(201).send({
      status: 'success',
      data: { newItem: newFile },
    });
  } catch (err) {
    reply.status(400).send({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateDataFile = async (req, reply) => {
  try {
    const { id, fileId } = req.params;
    const file = await DataFile.findOne({
      where: { id: +fileId, dataSet: +id },
    });
    let updatedItem;

    if (!file)
      throw new Error(
        'Datafile with the specified ID was not found in this Dataset'
      );

    const [isUpdated] = await DataFile.update(req.body, {
      where: { id: +fileId, dataSet: +id },
    });

    if (isUpdated) {
      updatedItem = await DataFile.findOne({
        where: { id: fileId },
      });
    } else {
      updatedItem = file;
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
};

exports.deleteDataFile = async (req, reply) => {
  try {
    const { id, fileId } = req.params;
    const deleted = await DataFile.destroy({
      where: {
        id: fileId,
        dataSet: id,
      },
    });
    if (!deleted)
      throw new Error(
        'Datafile with the specified ID was not found in this Dataset'
      );

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
