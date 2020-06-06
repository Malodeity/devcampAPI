// @desc Get All Bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show All BootCamps' });
};

// @desc Get Single Bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Get A Bootcamp ${req.params.id}` });
};

// @desc Create A Bootcamp
// @route POST /api/v1/bootcamps
// @access Private

exports.createBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create New BootCamp' });
};

// @desc Update Single Bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamps = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update Bootcamp ${req.params.id}` });
};

// @desc Delete Bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamps = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete Bootcamp ${req.params.id}` });
};
