const express = require('express');
const Review = require('../models/review');

const router = express.Router();

router.post('/roads/:road_id/reviews', async (req, res) => {
  const { road_id } = req.params;
  const { rating, review } = req.body;
  const newReview = await Review.create(road_id, rating, review);
  res.json(newReview);
});

module.exports = router;
