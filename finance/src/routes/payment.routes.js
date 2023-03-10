const { Router } = require('express');
const passport = require('passport');
const paymentController = require('../controllers/payments.controller');
const statusMiddleware = require('../middlewares/status.middleware');

const route = Router();

route.use(passport.authenticate('bearer', { session: false }));
route.get('/', paymentController.findAll);
route.get('/:id', paymentController.findById);
route.patch('/cancel/:id', statusMiddleware, paymentController.cancelPayment);
route.post('/confirm/:id', statusMiddleware, paymentController.confirmPayment);
route.post('/', paymentController.create);

module.exports = route;
