const express = require('express');
const Road = require('../models/road');

const router = express.Router();

router.get('/roads', async (req, res) => {
  const roads = await Road.getAll();
  res.json({ roads });
});

module.exports = router;
