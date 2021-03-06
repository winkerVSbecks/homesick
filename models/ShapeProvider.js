var mongoose = require('mongoose');
mongoose.connect('mongodb://winker:U0Tc5*&4f^@ds029787.mongolab.com:29787/shapes');

var Schema = mongoose.Schema;

var Shape = new Schema(
{
  "faces": [Schema.Types.Mixed],
  "name": String
});

mongoose.model('Shape', Shape, 'shape');
var Shape = mongoose.model('Shape');


/*************************************
  SHAPE PROVIDER
*************************************/
ShapeProvider = function(){};

// Create a new shape
ShapeProvider.prototype.save = function(saveData) {
  var shape = new Shape(
    {
      name: saveData.shapeName, 
      faces: saveData.faces
    }
  );
  shape.save(function (err) {
    console.log("%s data saved", saveData.shapeName);
  });
};

// Find all shapes
ShapeProvider.prototype.findAll = function(callback) {
  Shape.find({}, function (err, shapes) {
    if(!err) {
      callback(null, shapes);
    }  else {
      callback(err, null);
    }
  }); 
};

// Find shape by ID
ShapeProvider.prototype.findById = function(id, callback) {
  Shape.findById(id, function (err, shape) {
    if (!err) {
      callback(null, shape);
    } else {
      callback(error, null);
    }
  });
};

// Update shape by ID
ShapeProvider.prototype.updateById = function(id, faces, shapeName, callback) {
  Shape.findById(id, function (err, shape) {
    if (!err) {
      shape.faces = faces;
      shape.name = shapeName;
      shape.save(function(err) {
        callback();
      });
    }
  });
};

// Delete a shape
ShapeProvider.prototype.deleteById = function(id, callback) {
  Shape.findById(id).remove();
  callback();
};

exports.ShapeProvider = ShapeProvider;