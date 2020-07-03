const express = require('express');
const {
  getCourses, getCourse, addCourse, updateCourse, deleteCourse
} = require('../controllers/courses');

const router = express.Router({mergeParams: true}); //Merging only for the bootcamp route to work with the courses to get the courses linked to a certain bootcamp


router.route('/').get(getCourses).post(addCourse);
router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
