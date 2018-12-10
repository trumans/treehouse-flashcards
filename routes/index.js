const express = require('express');
const router = express.Router();

// define route for root
router.get('/', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.render('index', { name: req.cookies.username });
  } else {
    res.redirect('/hello');
  }
});

// define /hello route
router.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});

router.post('/hello', (req, res) => {
  res.cookie('username', req.body.username );
  res.redirect('/');
});

// define /goodbye route from Goodbye button
router.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/hello');
});

module.exports = router
