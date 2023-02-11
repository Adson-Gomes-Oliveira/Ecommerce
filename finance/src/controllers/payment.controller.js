const { Payments } = require('../database/models');
const HTTPStatus =  require('../../helpers/HTTP.status');
const validations = require('../validations/payment.validations');

const findAll = async (_req, res) => {
  const response = await Payments.findAll();
  return res.status(HTTPStatus.OK).json(response);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const response = await Payments.findByPk(id);
  const { cvv:_, ...responseWithoutCVV } = response.dataValues;

  return res.status(HTTPStatus.OK).json(responseWithoutCVV);
}

const create = async (req, res) => {
  const payload = req.body;
  const valid = validations.payloadValidation(payload);
  if (valid) return res.status(valid.code).send(valid.message);

  const response = await Payments.create(payload);
  return res
    .status(HTTPStatus.CREATED)
    .header({location: `/api/payments/${response.id}`})
    .json(response);
}

const changePaymentStatus = async (req, res) => {
  const { id } = req.params;
  let { status } = req.body;
  status = status.toUpperCase();

  const valid = validations.statusValidation(status);
  if (valid) return res.status(valid.code).send(valid.message);
  await Payments.update({ status }, { where: { id } });
  const payment = await Payments.findByPk(id);

  return res.status(HTTPStatus.OK).json(payment.status);
}

module.exports = {
  findAll,
  findById,
  create,
  changePaymentStatus,
}
