const express = require('express');
const {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  getBootcampsInRadius,
} = require('../controllers/bootcamps');

//Including Other Resourse Routers
const courseRouter = require('./courses');

const router = express.Router();

//Re-routing into other resource routers
router.use('/:bootcampId/courses', courseRouter);

//for raidus
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

//Only for the routes that doesn't need params
router.route('/').get(getBootcamps).post(createBootcamps);

//Only for the routes than needs the same param such as ID
router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamps)
  .delete(deleteBootcamps);

module.exports = router;
