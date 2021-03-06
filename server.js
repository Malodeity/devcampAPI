const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); //for logging api's
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

//load the env file
dotenv.config({ path: './config/config.env' });

//Connect To DB
connectDB();

//Route Files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');

const app = express();

//Body Parser
app.use(express.json());

//Cookie Parser

app.use(cookieParser());

//Dev Logging Middleware - running it only on dev
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


//File Upload
app.use(fileupload());

//Set Static Folder

app.use(express.static(path.join(__dirname, 'public')));


//Mount Routes
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);

//error handler must be after mounting the routes so it can work with the api's
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//Handle unhanlded promise rejections

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  server.close(() => process.exit(1));
});

 



