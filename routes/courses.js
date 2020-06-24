const express = require('express');
const {
  getCourses
} = require('../controllers/courses');

const router = express.Router({mergeParams: true}); //Merging only for the bootcamp route to work with the courses to get the courses linked to a certain bootcamp


router.route('/').get(getCourses);

module.exports = router;
