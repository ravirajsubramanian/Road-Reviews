var express = require('express');
var cors = require('cors')
var router = express.Router();

var corsOptions = {
  origin: 'http://localhost:3006',
  optionsSuccessStatus: 200
}
router.use(cors(corsOptions));

/* GET home page. */
router.get('/', function(req, res) {
  res.send('Hello World!')
});

module.exports = router;
