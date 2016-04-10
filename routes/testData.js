var express = require('express');
var router = express.Router();

/* You are entering my sandbox. Proceed with caution. */
router.get('/', function(req, res, next) {
	var x = {"user_input":"Hello Mr. Fridge today you have milk eggs and cheese","list_of_foods":{"cheese":1,"eggs":2,"milk":3}}; //{'user_input':'Hello Mr. Fridge today you have milk eggs and cheese'}; {'user_input':['chocolate', 'milk']}; {'user_input':'1309 NW 5th Ave, Gainesville, FL'};
	res.send(JSON.stringify(x));
});

module.exports = router;