'use strict';

// Requires
var express = require('express')
	, routes = require('./routes')
	, app = module.exports = express();
	

// CONFIGURATION
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
});

// Views
app.get('/app', routes.app);
app.get('/polygons', routes.polygons);
app.get('/', routes.index);
// Data API
app.get('/shapes', routes.shapes);
app.post('/shapes', routes.saveShape);
app.post('/shapes/:id', routes.updateShape);
app.get('/shapes/:id/delete', routes.deleteShape);

// Start App
app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');