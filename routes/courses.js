const express = require('express');
const {
  getCourses, getCourse, addCourse, updateCourse, deleteCourse
} = require('../controllers/courses');

const Course = require('../models/course');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({mergeParams: true}); //Merging only for the bootcamp route to work with the courses to get the courses linked to a certain bootcamp


const {protect, authorize } = require('../middleware/auth'); //user must be logged in to use a protected route.

router.route('/').get(advancedResults(Course, {
  path: 'bootcamp',
  select : 'name description'
}),getCourses).post(protect,authorize('publisher', 'admin'),addCourse);
router.route('/:id').get(getCourse).put(protect,authorize('publisher', 'admin'),updateCourse).delete(protect,authorize('publisher', 'admin'),deleteCourse);

module.exports = router;
