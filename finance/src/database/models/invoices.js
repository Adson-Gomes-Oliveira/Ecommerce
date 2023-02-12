'use strict';

const Invoices = (sequelize, DataTypes) => {
  const Invoices = sequelize.define('Invoices', {
    name: DataTypes.STRING,
    cpf: DataTypes.BIGINT,
    description: DataTypes.JSON,
    paymentId: DataTypes.INTEGER,
  }, {
    underscored: true,
    tableName: 'invoices',
    updatedAt: false
  });

  Invoices.associate = (models) => {
    Invoices.belongsToOne(models.Payments, {
      as: 'payments',
      foreignKey: 'paymentId',
    })
  }

  return Invoices
}

module.exports = Invoices
