const express = require('express');
const Road = require('../models/road');

const router = express.Router();

router.get('/places', async (req, res) => {
  const roads = await Road.getAll();
  const places = roads.reduce((acc, road) => {
    road.connecting.forEach(place => {
      if (!acc.includes(place)) {
        acc.push(place);
      }
    });
    return acc;
  }, []);
  res.json({ places });
});

module.exports = router;
