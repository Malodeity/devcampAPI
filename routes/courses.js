const express = require('express');
const {
  getCourses, getCourse, addCourse, updateCourse, deleteCourse
} = require('../controllers/courses');

const Course = require('../models/course');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({mergeParams: true}); //Merging only for the bootcamp route to work with the courses to get the courses linked to a certain bootcamp


const {protect } = require('../middleware/auth'); //user must be logged in to use a protected route.

router.route('/').get(advancedResults(Course, {
  path: 'bootcamp',
  select : 'name description'
}),getCourses).post(protect,addCourse);
router.route('/:id').get(getCourse).put(protect,updateCourse).delete(protect,deleteCourse);

module.exports = router;
