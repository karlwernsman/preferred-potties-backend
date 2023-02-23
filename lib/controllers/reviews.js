const { Router } = require('express');
const Review = require('../models/Review.js');

module.exports = Router().get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const review = await Review.getById(id);
    res.json(review);
  } catch (e) {
    next(e);
  }
}).get('/', async (req, res, next) => {
  try {
    const reviews = await Review.getAll();
    res.json(reviews);
  } catch (e) {
    next(e);
  }
});
