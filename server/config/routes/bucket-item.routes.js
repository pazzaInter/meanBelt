const router = require('express').Router();
const bucketController = require('../../controllers/bucket-items')

module.exports = router
    .get('/', bucketController.index)
    .get('/list/:id', bucketController.list)
    .post('/', bucketController.create);
