const express = require('express');
const router = express.Router();

const { data } = require('../data/flashcardData.json');
const { cards } = data;  // same as const cards = data.cards

// routes omits /cards because app.js references with app.use('/cards', ...);

// define /cards route
router.get('/', (req, res) => {
  const id = Math.floor( Math.random() * cards.length ).toString();
  res.redirect(`/cards/${id}?side=question`);
});

// define /cards/#
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  if ( cards[id] === undefined ) next();
  let { side } = req.query;
  // set/reset side if not valid
  if ( !['question', 'answer'].includes(side) ) side = 'question';
  res.locals.name = req.cookies.username;
  res.locals.text = cards[id][side];
  res.locals.id = id;
  if ( side === 'question' ) {
    res.locals.hint = cards[id].hint
    res.locals.thisSide = 'question'
    res.locals.flipSide = 'answer'
  } else {
    res.locals.thisSide = 'answer'
    res.locals.flipSide = 'question'
  }
  res.render('card');
});

module.exports = router
