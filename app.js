const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();  // create an application object

// configure the template tool to use
app.set('view engine', 'pug');

// create listener for requests on port 3000
//  function parameter is optional
app.listen(3000, () => { console.log('app is listening on port 3000')});

// make available static assets in public folder
app.use(express.static('public'));

// config body-parser to create body object on request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const mainRoutes = require('./routes');  // shorthand for require('./routes/index.js')
app.use(mainRoutes);

const cardRoutes = require('./routes/cards');
app.use('/cards', cardRoutes);  // apply to routes starting with /cards

const about = require('./routes/about');
app.use('/about', about);

// capture routes not defined to show a 404 message.
app.use((req, res, next) => {
  err = new Error('The page was not found');
  err.statusCode = 404;
  res.render('error', { error: err });
});

// catch errors thrown by app for any request and route
app.use((err, req, res, next) => {
  // set for anything looking at response object, such as browser dev tools
  res.status(err.statusCode);
  // display stack dump on formated error page
  res.locals.error = err;
  res.render('error');  // or res.render('error', {error: err});
});
