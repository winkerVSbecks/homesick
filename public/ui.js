'use strict';

/*************************************
  GUI
*************************************/
//  Globals
var shapes;
var loadedData;
var loadedId;

window.onload = function () {
  $.getJSON('/shapes', function(json) {
    shapes = json.shapes;
    if (shapes.length > 0) {
      loadedData = shapes[shapes.length-1].faces;
      loadedId = shapes[shapes.length-1]._id;
    }
  });
	window.walls = {};
  window.exprt = {
    nodes: [],
    faces: []
  };
  tryFindSketch();
}

function tryFindSketch () {
  // Find the processing.js sketch on this page with the id = mySketch
  var pjs = Processing.getInstanceById("polyMakerSketch");
  // Make sure everything is loaded
  if ( pjs == undefined || !window.walls.floor || !shapes) {
    return setTimeout(tryFindSketch, 200);
  } else {

    // -------------------------------------------
    // Init gui specifics
    // -------------------------------------------
  	window.xRot = -28;
  	window.yRot = -28;
  	window.zRot = 0;
  	window.zTrans = -800;
  	window.Add_Face = function() { 
	  	pjs.addFace();
	  };
	  window.Add_Point = function() { 
	  	pjs.addPoint();
	  };
	  window.Active_Hook = '0';
	  window.Face_Nodes = '0';
	  window.floorHook = window.walls.floor.i_start;
	  window.windowWall = window.walls.windowWall.i_start;
	  window.doorWall = window.walls.doorWall.i_start;
	  window.doubleDoorWall = window.walls.doubleDoorWall.i_start;
	  window.doorlessWall = window.walls.doorlessWall.i_start;
	  window.Wall_Visibility = function() { 
	  	pjs.hideWalls();
	  };
	  window.Wireframe = function () {
	  	pjs.wireframe();
	  }
    window.DoorsAndWalls = function () {
      pjs.viewDoorsAndWalls();
    }
    window.Save = function () {
      pjs.exportShape(loadedId);
    }
    window.SaveAsNewShape = function (argument) {
      pjs.exportShape(null);
    }
    window.Delete = function () {
      pjs.deleteShape(loadedId);
    }
    window.ShapeNo = 0;
    window.LoadShape = function () {
      pjs.loadFaces(loadedData);
    };
    window.shapeName = (shapes.length > 0) ? shapes[0].name : "No Shape Loaded";
    window.ShowPolygons = function () {
      pjs.polygonsVisibility();
    };
    window.BuildPolygons = function () {
      pjs.buildPolygons();
    };
    window.PolygonNo = 0;

  	// create gui folder
  	var gui = new dat.GUI();
  	var f1 = gui.addFolder('Orientation');
  	var f2 = gui.addFolder('Select Hooks');
  	var f3 = gui.addFolder('Build Faces');
  	var f4 = gui.addFolder('View Settings');
    var f5 = gui.addFolder('I/O');
    var f6 = gui.addFolder('Polygons');

  	// Orientation
  	f1.add(window, 'xRot', -180,180).listen();
  	f1.add(window, 'yRot', -180,180).listen();
  	f1.add(window, 'zRot', -180,180);
  	f1.add(window, 'zTrans', -800, 0);

  	// Select Hook
  	f2.add(window, 'Active_Hook').listen();
  	var wall0 = f2.add(window, 'floorHook', window.walls.floor.i_start, window.walls.floor.i_end).step(1);
  	var wall1 = f2.add(window, 'windowWall', window.walls.windowWall.i_start, window.walls.windowWall.i_end).step(1);
  	var wall2 = f2.add(window, 'doorWall', window.walls.doorWall.i_start, window.walls.doorWall.i_end).step(1);
  	var wall3 = f2.add(window, 'doubleDoorWall', window.walls.doubleDoorWall.i_start, window.walls.doubleDoorWall.i_end).step(1);
  	var wall4 = f2.add(window, 'doorlessWall', window.walls.doorlessWall.i_start, window.walls.doorlessWall.i_end).step(1);

  	// Build Face
  	f3.add(window, 'Add_Point');
  	f3.add(window, 'Add_Face');
  	f3.add(window, 'Face_Nodes').listen();

    // Visibility
  	f4.add(window, 'Wall_Visibility');
  	f4.add(window, 'Wireframe');
    f4.add(window, 'DoorsAndWalls');

    // Load/Export
    f5.add(window, 'shapeName').listen();
    var shapeNumber = f5.add(window, 'ShapeNo', 0, Object.size(shapes)-1).step(1);
    f5.add(window, 'LoadShape');
    f5.add(window, 'Save');
    f5.add(window, 'SaveAsNewShape');
    f5.add(window, 'Delete');

    // Polygons
    f6.add(window, 'ShowPolygons');
    f6.add(window, 'BuildPolygons');
    f6.add(window, 'PolygonNo', 0, 25).step(1);

    // -------------------------------------------
  	// on change functions for hook selection
    // -------------------------------------------
  	wall0.onChange(function(value) {
		  pjs.selectHook(0, value);
		});
		wall1.onChange(function(value) {
		  pjs.selectHook(1, value);
		});
		wall2.onChange(function(value) {
		  pjs.selectHook(2, value);
		});
		wall3.onChange(function(value) {
		  pjs.selectHook(3, value);
		});
		wall4.onChange(function(value) {
		  pjs.selectHook(4, value);
		});

    shapeNumber.onChange(function(value) {
      window.shapeName = shapes[value].name;
      loadedData = shapes[value].faces;
      loadedId = shapes[value]._id;
    });

    // -------------------------------------------
    // EXPORT FACES
    // -------------------------------------------
    window.saveShape = function (idToSave) {
      // Build Save Object
      window.exprt.nodes.forEach( function(vArr) {
        var face = [];
        vArr.forEach( function (v) {
          face.push(
          {
            x: v.x,
            y: v.y,
            z: v.z
          });
        });
        window.exprt.faces.push(face);
      });
      // Choose save url
      var saveUrl = (!idToSave) ? '/shapes' : '/shapes/'+idToSave;
      // Post data to server
      $.ajax({
        type: 'POST',
        url: saveUrl,
        data: { 
          faces: JSON.stringify(window.exprt.faces),  
          shapeName: JSON.stringify(window.shapeName),  
        },
        success: function(data) {
          console.log("Success", data);
        },
        failure: function(data) {
          console.log("Failed", data);
        }
      });
    };
    window.deleteShape = function (idToSave) {
      var saveUrl = '/shapes/'+idToSave+'/delete';
      // GET request to server
      $.ajax({
        type: 'GET',
        url: saveUrl,
        success: function(data) {
          console.log("Success", data);
          window.shapeName = "No Shape Loaded";
        },
        failure: function(data) {
          console.log("Failed", data);
        }
      });
    };
  }
}

// HELPER FUNCTIONS
Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};
