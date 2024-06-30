const express = require('express');
const Road = require('../models/road');
const Review = require('../models/review');

const router = express.Router();

async function addReviews(roads) {
  const reviews = await Review.getAll(roads.map((road) => road.id));
  for (const road of roads) {
    console.log(road.name);
    const filteredReviews = reviews.filter((review) => review.road_id === road.id);
    let totalRating = 0;
    for (const review of filteredReviews) {
      totalRating += review.rating;
    }
    const averageRating = totalRating / filteredReviews.length;
    console.log(`Average rating: ${averageRating}`);
    road.rating = averageRating.toPrecision(2);
  }
  console.log(roads);
  return roads;
}

router.get('/roads', async (req, res) => {
  let roads = await Road.getAll();
  roads = await addReviews(roads);
  res.json({ roads });
});

module.exports = router;
