const authController = require('../../controllers/user');
const router = require('express').Router();

module.exports = router
  .post('/login', authController.login)
  .delete('/logout', authController.logout)
  .get('/', authController.show)
  .get('/list/:id', authController.list);