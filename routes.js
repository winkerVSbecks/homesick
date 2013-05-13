/*************************************
	ROUTES
*************************************/
var ShapeProvider = require('./models/ShapeProvider').ShapeProvider
	, ShapeProvider = new ShapeProvider();


exports.index = function (req, res) {
  res.render('index', {});
};

exports.app = function (req, res) {
  res.render('app', {});
};


// ----------------------------------
// ----------- SHAPESAPI ------------
// ----------------------------------
exports.shapes = function (req, res) {;
  ShapeProvider.findAll(function (error, shapes) {
    res.json({
    	shapes: shapes
  	});
  }); 
};

exports.saveShape = function (req, res) {

	var saveData = { 
    faces: JSON.parse(req.body.faces), 
    shapeName: JSON.parse(req.body.shapeName) 
  };

  ShapeProvider.save(saveData); 

	res.end();
};