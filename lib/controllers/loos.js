const { Router } = require('express');
const Loo = require('../models/Loo');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const loos = await Loo.getAll();
    res.json(loos);
  } catch (e) {
    next(e);
  }
});
// .post('/', authenticate, async (req, res, next) => {
//   try {
//     const loo = await Loo.insert({
//       location: req.body.location,
//       description: req.body.description,
//       rating: req.body.rating,
//     });
//     res.json(loo);
//   } catch (e) {
//     next(e);
//   }
// })
