'use strict';

/*************************************
  APP
*************************************/
angular.module('exportPolygons', ['getShapes']);
 

 
/*************************************
  CONTROLLERS
*************************************/ 
function ShapeCtrl ($scope, Shapes) {
  Shapes.get({}, function(shapes) {
    self.original = shapes;
    $scope.shapes = new Shapes(self.original).shapes;
  });

  $scope.update = function () {
    if($scope.selectedShape) {
      // Generate measurements
      angular.forEach($scope.selectedShape.faces, function (face) {
        face.lengths = [];
        // Calculate length of sides
        angular.forEach(face, function (point, index) {
          if (index === face.length-1) {
            face.lengths.push($scope.getLength(point, face[0]));
          } else {
            face.lengths.push($scope.getLength(point, face[index+1]));
          }
        });
        // Calculate area
        face.area = $scope.getArea(face);
        face.triArea = $scope.getAreaOfTraingle(face); 
      });
      $scope.selectedShape.totalArea = $scope.getTotalArea($scope.selectedShape.faces);
    }
  };

  $scope.getArea = function (points) {
    var area = 0;
    var vecs = [];
    var j = 0;
    var a = new Vector(0,0,0);
    // Convert point to vector
    angular.forEach(points, function (p) {
      var v = new Vector(p.x, p.y, p.z);
      vecs.push(v);
    });
    // Calc area
    for (var i = 0; i < vecs.length; i++) {
      j = (i + 1) % vecs.length;
      a = a.add( vecs[i].cross(vecs[j]) );
    }
    a = a.divide(2);
    var v1 = vecs[1].subtract(vecs[0]);
    var v2 = vecs[2].subtract(vecs[0]);
    var normal = v1.cross(v2);
    normal = normal.unit();
    // area = a.length()/10000; // convert to m2
    area = (normal.dot(a))/10000;
    return area;
  };

  $scope.getAreaOfTraingle = function (points) {
    var vecs = [];
    angular.forEach(points, function (p) {
      var v = new Vector(p.x, p.y, p.z);
      vecs.push(v);
    });
    var ab = vecs[1].subtract(vecs[0]);
    var ac = vecs[2].subtract(vecs[0]);
    var vCross = ab.cross(ac);
    var area = vCross.length()/20000;
    if (vecs.length>3) {
      var ab2 = vecs[2].subtract(vecs[3]);
      var ac2 = vecs[0].subtract(vecs[3]);
      var vCross2 = ab2.cross(ac2);
      var area2 = vCross2.length()/20000;
      area = area + area2;
    }
    return area;
  }

  $scope.getLength = function (v1, v2) {
    var len = Math.sqrt((v1.x - v2.x)*(v1.x - v2.x)+(v1.y - v2.y)*(v1.y - v2.y)+(v1.z - v2.z)*(v1.z - v2.z));
    len = len/100; // convert to m
    return len;
  };

  $scope.getTotalArea = function (faces) {
    var area = 0;
    angular.forEach(faces, function (face) {
      area += face.area;
    });
    return area;
  };

  $scope.getLengthOfFabric = function (area, width) {
    var len = area/(width*0.0254);
    return len;
  };
}



/*************************************
  SERVICES
*************************************/
angular.module('getShapes', ['ngResource']).
  factory('Shapes', function($resource){
    var Shapes = $resource('/shapes', {}, 
      {
        query: {
          method: 'GET',
          isArray: false
        },
        getById: {
          method: 'PUT'
        },
        update: {
          method: 'POST'
        }
      });
    return Shapes;
  });
