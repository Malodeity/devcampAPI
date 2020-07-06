const express = require('express');
const {
  getCourses, getCourse, addCourse, updateCourse, deleteCourse
} = require('../controllers/courses');

const Course = require('../models/course');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({mergeParams: true}); //Merging only for the bootcamp route to work with the courses to get the courses linked to a certain bootcamp


router.route('/').get(advancedResults(Course, {
  path: 'bootcamp',
  select : 'name description'
}),getCourses).post(addCourse);
router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
