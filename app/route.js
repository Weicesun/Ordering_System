var Food = require('./models/item');

module.exports = function(app) {

	
	app.get('/api/food', function(req, res) {

		Food.find(function(err, food) {
			if (err) {
				res.send(err)
			}
			res.json(food); // return all food in JSON format
		});
	});

	app.get('/api/total', function(req, res) {

		Food.find(function(err, food) {
			if (err) {
				res.send(err)
			}
			var subtotal = 0;
			var total = 0;
			food.forEach(function(deal, index){
				subtotal += deal.price;
			});
			//for (var i = 0; i < food.length; i++) {
			//	subtotal += food.get(i).price;
			//}
			total = subtotal * 1.075;
			res.json(total); // return all food in JSON format
		});
	});

	
	app.post('/api/food', function(req, res) {

		Food.create({
			name : req.body.name,
			price: req.body.price
		}, function(err, food) {
			if (err) {
				res.send(err);
			}
			
			Food.find(function(err, food) {
				if (err) {
					res.send(err);
				}
					
				res.json(food);
			});
		});

	});

	app.delete('/api/food/:food_id', function(req, res) {
		Food.remove({
			_id : req.params.food_id
		}, function(err, food) {
			if (err) {
				res.send(err);
			}
				
			Food.find(function(err, food) {
				if (err) {
					res.send(err);
				}
					
				res.json(food);
			});
		});
	});




	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); 
	});
};