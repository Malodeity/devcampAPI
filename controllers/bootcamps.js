const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const Bootcamp = require('../models/Bootcamp');
const { json } = require('express');

// @desc Get All Bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  

  res
    .status(200)
    .json(res.advancedResults);
});

// @desc Get Single Bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404) //wrong formatted ID
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc Create A Bootcamp
// @route POST /api/v1/bootcamps
// @access Private

exports.createBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

// @desc Update Single Bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404) //wrong formatted ID
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc Delete Bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404) //wrong formatted ID
    );
  }

  bootcamp.remove(); //For triggering the middleware to remove the bootcamp
  res.status(200).json({ success: true, data: {} });
});

// @desc Get Bootcamps within a radius
// @route DELETE /api/v1/radius/:zipcode/:distance
// @access Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  //Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  //Calc Radius Using Radians
  //Divide dist by radius of Earth
  //Earth Radius = 3,963 m/ 6,378
  const radius = distance / 3963;
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});



// @desc Upload photo for Bootcamp
// @route PUT /api/v1/bootcamps/:id/photo
// @access Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404) //wrong formatted ID
    );
  }

  if(!req.files){
    return next(
      new ErrorResponse(`Please upload a file`, 404) 
    );
  }

  const file = req.files.file;

//Making Sure The Image is a photo
if(!file.mimetype.startsWith('image')){
  return next(
    new ErrorResponse(`Please upload an image file`, 404) 
  );
}

//Check filesize
if(file.size > process.env.MAX_FILE_UPLOAD){
  return next(
    new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 404) 
  );
}
//Create custome filename to avoid duplications
file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
  if(err){
    console.error(err);
    return next(
      new ErrorResponse(`Problem with file upload`, 500) 
    );
  }

   await Bootcamp.findByIdAndUpdate(req.params.id, {photo: file.name });

   res.status(200).json({
     success: true,
     data: file.name
   })
});


});
