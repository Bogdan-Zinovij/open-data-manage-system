'use strict';

const DataTypes = require('sequelize');
const db = require('../db');

const MetaDataType = db.define(
  'availableFor',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    metaDataKey: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    db,
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = MetaDataType;
