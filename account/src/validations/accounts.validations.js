const JOI = require('joi');
const HTTPStatus = require('../helpers/HTTP.status');
const customError = require('../helpers/error.custom');

const payload = (payload) => {
  const { error } = JOI.object({
    name: JOI.string().required(),
    email: JOI.string().email().required(),
    password: JOI.string().min(8).pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')).required(),
    cpf: JOI.string().required(),
    phone: JOI.string().required(),
    address: {
      street: JOI.string().required(),
      number: JOI.string().required(),
      cep: JOI.string().required(),
      city: JOI.string().required(),
      state: JOI.string().min(2).max(2).pattern(new RegExp('^(AC|AL|AM|AP|BA|CE|DF|ES|GO|MA|MG|MS|MT|PA|PB|PE|PI|PR|RJ|RN|RO|RR|RS|SC|SE|SP|TO)$')).required(),
    }
  }).validate(payload);

  if (error) throw customError(error.message, HTTPStatus.UN_ENTITY);
}

module.exports = {
  payload,
}