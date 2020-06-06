const express = require('express');
const {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
} = require('../controllers/bootcamps');

const router = express.Router();

//Only for the routes that doesn't need params
router.route('/').get(getBootcamps).post(createBootcamps);

//Only for the routes than needs the same param such as ID
router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamps)
  .delete(deleteBootcamps);

module.exports = router;
