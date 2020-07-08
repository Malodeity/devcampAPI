const express = require('express');
const {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  getBootcampsInRadius,
  bootcampPhotoUpload
} = require('../controllers/bootcamps');


const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults');

//Including Other Resourse Routers
const courseRouter = require('./courses');

const router = express.Router();

const {protect } = require('../middleware/auth'); //user must be logged in to use a protected route

//Re-routing into other resource routers
router.use('/:bootcampId/courses', courseRouter);

//for raidus
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

//for file upload
router.route('/:id/photo').put(protect ,bootcampPhotoUpload);

//Only for the routes that doesn't need params
router.route('/').get(advancedResults(Bootcamp, 'courses'),getBootcamps).post(protect,createBootcamps); //adding the advanced results middleware to the get bootcamp route

//Only for the routes than needs the same param such as ID
router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, updateBootcamps)
  .delete(protect, deleteBootcamps);

module.exports = router;
