'use strict';

/*************************************
  APP
*************************************/
var app = angular.module('exportPolygons', ['getShapes']);
 

 
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
        face.angles = $scope.getAngles(face);
      });
      // Total area
      $scope.selectedShape.totalArea = $scope.getTotalArea($scope.selectedShape.faces);
    }
  };

  $scope.getAngles = function (points) {
    var vecs = [];
    var sides = [];
    var angles = [];
    angular.forEach(points, function (p) {
      var v = new Vector(p.x, p.y, p.z);
      vecs.push(v);
    });
    if (vecs.length === 3) {
      var v1 = vecs[1].subtract(vecs[0]);
      var v2 = vecs[2].subtract(vecs[0]);
      sides.push((v1.length()/100).toFixed(2)+" & "+(v2.length()/100).toFixed(2));
      var angle1 = toDegrees( Math.acos( v1.dot(v2)/(v1.length()*v2.length()) ) );
      angles.push(angle1);
      var v3 = vecs[0].subtract(vecs[1]);
      var v4 = vecs[2].subtract(vecs[1]);
      sides.push((v3.length()/100).toFixed(2)+" & "+(v4.length()/100).toFixed(2));
      var angle2 = toDegrees( Math.acos( v3.dot(v4)/(v3.length()*v4.length()) ) );
      angles.push(angle2);
      var v5 = vecs[0].subtract(vecs[2]);
      var v6 = vecs[1].subtract(vecs[2]);
      sides.push((v5.length()/100).toFixed(2)+" & "+(v6.length()/100).toFixed(2));
      var angle3 = toDegrees( Math.acos( v5.dot(v6)/(v5.length()*v6.length()) ) );
      angles.push(angle3);
    } else if (vecs.length === 4) {
      var v1 = vecs[1].subtract(vecs[0]);
      var v2 = vecs[3].subtract(vecs[0]);
      sides.push((v1.length()/100).toFixed(2)+" & "+(v2.length()/100).toFixed(2));
      var angle1 = toDegrees( Math.acos( v1.dot(v2)/(v1.length()*v2.length()) ) );
      angles.push(angle1);
      var v3 = vecs[0].subtract(vecs[1]);
      var v4 = vecs[2].subtract(vecs[1]);
      sides.push((v3.length()/100).toFixed(2)+" & "+(v4.length()/100).toFixed(2));
      var angle2 = toDegrees( Math.acos( v3.dot(v4)/(v3.length()*v4.length()) ) );
      angles.push(angle2);
      var v5 = vecs[1].subtract(vecs[2]);
      var v6 = vecs[3].subtract(vecs[2]);
      sides.push((v5.length()/100).toFixed(2)+" & "+(v6.length()/100).toFixed(2));
      var angle3 = toDegrees( Math.acos( v5.dot(v6)/(v5.length()*v6.length()) ) );
      angles.push(angle3);
      var v7 = vecs[0].subtract(vecs[3]);
      var v8 = vecs[2].subtract(vecs[3]);
      sides.push((v7.length()/100).toFixed(2)+" & "+(v8.length()/100).toFixed(2));
      var angle4 = toDegrees( Math.acos( v7.dot(v8)/(v7.length()*v8.length()) ) );
      angles.push(angle4);
    }
    return [angles, sides];
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
  DIRECTIVES
*************************************/ 
app.directive('polygon', function() {
  return {
    restrict: 'A',
    scope: { 
      vertices: '=polygon',  
    },
    link: function(scope, element, attrs)
    {
      var camera, scene, renderer;
      var polygon;
      var targetRotation = 0;
      var targetYRotation = 0, targetXRotation = 0;
      var targetYRotationOnMouseDown = 0, targetXRotationOnMouseDown = 0;
      var mouseX = 0, mouseY = 0;
      var mouseXOnMouseDown = 0, mouseYOnMouseDown = 0;
      var width = $(element).width();
      var height = 200;
      var widthHalfX = width/2;
      var widthHalfY = height/2;

      init();
      animate();

      function init() {
        // Setup scene
        camera = new THREE.PerspectiveCamera( 70, width / height, 1, 1000 );
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 300;
        scene = new THREE.Scene();
        // Build Polygon
        var geometry =  new THREE.Geometry();
        angular.forEach(scope.vertices, function (v) {
          geometry.vertices.push( new THREE.Vector3( v.x, v.y, v.z ) );
        });
        // Build front and back 
        if (geometry.vertices.length===4) { 
          geometry.faces.push( new THREE.Face4(0, 1, 2, 3) );
        } else {
          geometry.faces.push( new THREE.Face3(0, 1, 2 ));
        }
        THREE.GeometryUtils.center( geometry );

        geometry.applyMatrix( new THREE.Matrix4().makeRotationX(Math.PI/2) );
        // Push polygon to scene
        var material = new THREE.MeshBasicMaterial( { color: 0x2ECC71, side: THREE.DoubleSide } );
        polygon = new THREE.Mesh( geometry, material );
        scene.add(polygon);

        renderer = new THREE.WebGLRenderer(); // new THREE.CanvasRenderer();
        renderer.setSize( width, height );
        $(element).append( renderer.domElement );
        $(element).on('mousedown', onDocumentMouseDown);
      }
      // MOUSE EVENTS
      function onDocumentMouseDown( event ) {
        event.preventDefault();
        $(element).on('mousemove', onDocumentMouseMove);
        $(element).on('mouseup', onDocumentMouseUp);
        $(element).on('mouseout', onDocumentMouseOut);
        mouseXOnMouseDown = event.clientX - widthHalfX;
        mouseYOnMouseDown = event.clientY - widthHalfY;
        targetYRotationOnMouseDown = targetYRotation;
        targetXRotationOnMouseDown = targetXRotation;
      }
      function onDocumentMouseMove( event ) {
        mouseX = event.clientX - widthHalfX;
        mouseY = event.clientY - widthHalfY;
        targetYRotation = targetYRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
        targetXRotation = targetXRotationOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.02;
      }
      function onDocumentMouseUp( event ) {
        $(element).off('mousemove', onDocumentMouseMove);
        $(element).off('mouseup', onDocumentMouseUp);
        $(element).off('mouseout', onDocumentMouseOut);
      }
      function onDocumentMouseOut( event ) {
        $(element).off('mousemove', onDocumentMouseMove);
        $(element).off('mouseup', onDocumentMouseUp);
        $(element).off('mouseout', onDocumentMouseOut);
      }
      // UPDATE AND RENDER
      function animate() {
        requestAnimationFrame( animate );
        render();
      }
      function render() {
        polygon.rotation.x += ( targetXRotation - polygon.rotation.x ) * 0.05;
        polygon.rotation.y += ( targetYRotation - polygon.rotation.y ) * 0.05;
        renderer.render( scene, camera );
      }
    }
  };
});



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



// HELPERS
function toDegrees (angle) {
  return angle * (180 / Math.PI);
}