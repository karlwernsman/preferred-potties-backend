const { Router } = require('express');
const Loo = require('../models/Loo');
const authenticate = require('../middleware/authenticate');

module.exports = Router().post('/', authenticate, async (req, res, next) => {
  try {
    const loo = await Loo.insert({
      location: req.body.location,
      description: req.body.description,
      rating: req.body.rating,
    });
    res.json(loo);
  } catch (e) {
    next(e);
  }
});
