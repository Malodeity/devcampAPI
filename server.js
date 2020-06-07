const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); //for logging api's

//Route Files
const bootcamps = require('./routes/bootcamps');

//load the env file
dotenv.config({ path: './config/config.env' });

const app = express();

//Dev Logging Middleware - running it only on dev
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Mount Routes
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
