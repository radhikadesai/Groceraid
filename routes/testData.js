var express = require('express');
var router = express.Router();

/* You are entering my sandbox. Proceed with caution. */
router.get('/', function(req, res, next) {
	res.send(JSON.stringify(x));
});

module.exports = router;