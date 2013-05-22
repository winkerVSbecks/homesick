/* @pjs crisp="true"; pauseOnBlur="true"; */
/*************************************
  GUI
*************************************/
float ld = 711-10;
float wd = 500-10;
float hd = 384-10;
float res = 50;

Hook[] hooks = new Hook[634];
Wall[] walls =  new Wall[6];
Face[] faces = new Face[0];
Polygon[] polygons = new Polygon[0];
Face[] loadedFaces = new Face[0];

int i;
int wallCnt = 0;
int activeHook;
float xRot, yRot, zRot, zTrans;
PVector[] ns = new PVector[0];
Boolean areHidden = false;
Boolean isWireframe = false;
Boolean isDoorsAndWalls = false;
Boolean isDrawPolygons = false;
Boolean isHooks = true;


//--------------------------------------
//	SETUP
//--------------------------------------
void setup() {

  size(screenWidth, screenHeight, OPENGL);
  noLights();
  textAlign(CENTER);

  int temp_i_start = 0;
  // ---------------------
  // Floor
  // ---------------------
	for (int b = res; b < wd; b+=res) {
	  for (int c = res; c < ld; c+=res) {
	    hooks[i] = new Hook(new PVector(b,hd,c), #93D2E4);
	    i++;
	  }
	}
	walls[0] = new Wall(
		new PVector(0,hd,0), 
		new PVector(0,hd,ld), 
		new PVector(wd,hd,ld), 
		new PVector(wd,hd,0), 
		temp_i_start, 
		i-1, 
		#ECF0F1);
	window.walls.floor = {
		'i_start': temp_i_start, 
		'i_end': i-1 
	};
	temp_i_start = i;
	// ---------------------
  // Window Wall
  // ---------------------
	for (int b = res; b < wd; b+=res) {
	  for (int c = res; c <= hd; c+=res) {
	    hooks[i] = new Hook(new PVector(b,c,ld), #93D2E4);
	    i++;
	  }
	}
	walls[1] = new Wall(
		new PVector(0,0,ld), 
		new PVector(wd,0,ld), 
		new PVector(wd,hd,ld), 
		new PVector(0,hd,ld),
		temp_i_start, 
		i-1, 
		#ECF0F1);
	window.walls.windowWall = {
		'i_start': temp_i_start, 
		'i_end': i-1 
	};
	temp_i_start = i;
	// ---------------------
	// Door Wall
	// ---------------------
	for (int b = res; b < wd; b+=res) {
	  for (int c = 0; c <= hd; c+=res) {
	    hooks[i] = new Hook(new PVector(b,c,0), #93D2E4);
	    i++;
	  }
	}
	walls[2] = new Wall(
		new PVector(0,0,0), 
		new PVector(wd,0,0), 
		new PVector(wd,hd,0), 
		new PVector(0,hd,0),   
		temp_i_start, 
		i-1, 
		#ECF0F1);
	window.walls.doorWall = {
		'i_start': temp_i_start, 
		'i_end': i-1 
	};
	temp_i_start = i;
	// ---------------------
  // Wall with double door
  // ---------------------
	for (int b = 0; b <= hd; b+=res) {
	  for (int c = 0; c <= ld; c+=res) {
	    hooks[i] = new Hook(new PVector(0,b,c), #93D2E4);
	    i++;
	  }
	}
	walls[3] = new Wall(
		new PVector(0,0,0), 
		new PVector(0,0,ld), 
		new PVector(0,hd,ld), 
		new PVector(0,hd,0), 
		temp_i_start, 
		i-1, 
		#ECF0F1);
	window.walls.doubleDoorWall = {
		'i_start': temp_i_start, 
		'i_end': i-1 
	};
	temp_i_start = i;
	// ---------------------
	// Doorless wall
	// ---------------------
	for (int b = 0; b <= hd; b+=res) {
	  for (int c = 0; c <= ld; c+=res) {
	    hooks[i] = new Hook(new PVector(wd,b,c), #93D2E4);
	    i++;
	  }
	}
	walls[4] = new Wall(
		new PVector(wd,0,0), 
		new PVector(wd,hd,0), 
		new PVector(wd,hd,ld), 
		new PVector(wd,0,ld),
		temp_i_start, 
		i-1, 
		#ECF0F1);
	window.walls.doorlessWall = {
		'i_start': temp_i_start, 
		'i_end': i-1 
	};
	temp_i_start = i;
	// ---------------------
  // CIELING
  // ---------------------
	for (int b = res; b < wd; b+=res) {
	  for (int c = res; c < ld; c+=res) {
	    hooks[i] = new Hook(new PVector(b,0,c), #93D2E4);
	    i++;
	  }
	}
	walls[5] = new Wall(
		new PVector(0,0,0), 
		new PVector(0,0,ld), 
		new PVector(wd,0,ld), 
		new PVector(wd,0,0), 
		temp_i_start, 
		i-1, 
		#ECF0F1);
	window.walls.cieling = {
		'i_start': temp_i_start, 
		'i_end': i-1 
	};
}


//--------------------------------------
//	DRAW
//--------------------------------------
void draw() {
	// update gui values
	updateGUI();
	// Roatations and translations
  background(#ECF0F1);
  if (isDrawPolygons) {
  	// Draw polygons
  	translate(mouseX, mouseY, zTrans);
  	if (polygons[window.PolygonNo]){
			polygons[window.PolygonNo].update();
		}
		
  } else {

	  translate(width*0.5,height*0.05, zTrans);
	  if (mousePressed) {
	  	xRot = map(mouseX, 0, width, -180, 180);
	  	yRot = map(mouseY, 0, width, -180, 180);
	  }
	  // user input to rotate scene
		rotateX(radians(xRot));
	  rotateY(radians(yRot));
	  rotateZ(radians(zRot));

	  if (!areHidden) {
		  // draw the walls
		 	for (int p = 0; p < 6; p++) {
		    walls[p].update();  
		  }		  
		 	// draw the hooks
		 	for (int p = 0; p < i; p++) {
		    hooks[p].update();  
		  }
		}
	  // draw the faces
	 	for (int p = 0; p < faces.length; p++) {
	    faces[p].update();
	  }
	  // draw the loaded faces
	 	for (int p = 0; p < loadedFaces.length; p++) {
	    loadedFaces[p].update();
	  }
	  // Draw doors and windows
	  if (!isDoorsAndWalls) {
	  	doorsAndWindows();
	  }
	}
}


//--------------------------------------
//	DOORS AND WINDOWS
//--------------------------------------
void doorsAndWindows() {
	fill(#BDC3C7);
	noStroke();
	// Door  
	beginShape();
		vertex(wd-135,120,1);
		vertex(wd,120,1);
		vertex(wd,hd,1);
		vertex(wd-135,hd,1);
	endShape(CLOSE);
	beginShape();
		vertex(wd-135,120,-1);
		vertex(wd,120,-1);
		vertex(wd,hd,-1);
		vertex(wd-135,hd,-1);
	endShape(CLOSE);
	// Double Door  
	beginShape();
		vertex(1,120,282);
		vertex(1,120,499);
		vertex(1,hd,499);
		vertex(1,hd,282);
	endShape(CLOSE);
	beginShape();
		vertex(-1,120,282);
		vertex(-1,120,499);
		vertex(-1,hd,499);
		vertex(-1,hd,282);
	endShape(CLOSE);
	// Window  
	beginShape();
		vertex(0,0,ld+1);
		vertex(wd,0,ld+1);
		vertex(wd,224,ld+1);
		vertex(0,224,ld+1);
	endShape(CLOSE);
	beginShape();
		vertex(0,0,ld-1);
		vertex(wd,0,ld-1);
		vertex(wd,224,ld-1);
		vertex(0,224,ld-1);
	endShape(CLOSE);
}


//--------------------------------------
//	UPDATE GUI
//--------------------------------------
void updateGUI() {
	xRot = window.xRot;
	yRot = window.yRot;
	zRot = window.zRot;
	zTrans = window.zTrans;
	window.Active_Hook = String(activeHook);
	window.Face_Nodes = String(ns.length);
}


//--------------------------------------
//	ADD POINT
//--------------------------------------
void addPoint() {
	ns = (PVector[])append(ns, hooks[activeHook].v);
}


//--------------------------------------
//	ADD FACE
//--------------------------------------
void addFace() {
	if (ns.length > 2) {
		faces = (Face[])append(faces, new Face(ns));
		ns = new PVector[0];
	} else {
		console.log("A face must have at least 3 points");
	}
}


//--------------------------------------
//	LOAD SHAPE
//--------------------------------------
void loadFaces(Array input) {
	// empty faces array
	faces = [];
	// create faces
	input.forEach( function(f) {
		PVector[] fv = new PVector[0];
		f.forEach( function(v) {
			fv = (PVector[])append(fv, new PVector(v.x,v.y,v.z));			
		});
		faces = (Face[])append(faces, new Face(fv));
	});
}
//--------------------------------------
//	EXPORT SHAPE
//--------------------------------------
void exportShape(idToSave) {
	// push to export object
	for (int p = 0; p < faces.length; p++) {
    window.exprt.nodes.push(faces[p].nodes);
  }
  // ajax post data
  window.saveShape(idToSave);
}
//--------------------------------------
//	DELETE SHAPE
//--------------------------------------
void deleteShape(idToSave) {
	// empty faces array
	faces = [];
  // ajax post data
  window.deleteShape(idToSave);
}


//--------------------------------------
//	SELECT HOOKS IN VARIOUS FLOORS
//--------------------------------------
void selectHook(int id, int hookId) {
	walls[id].select();
	unSelectOtherWalls(id);
	unSelectOtherWallsHooks(id);
	walls[id].unSelectAllHooks();
	walls[id].selectHook(hookId);
}
void unSelectOtherWalls(int id) {
	for (int p = 0; p < 5; p++) {
		if (p!=id) walls[p].unSelect();  
  }
}
void unSelectOtherWallsHooks(int id) {
	for (int p = 0; p < 5; p++) {
		if (p!=id) walls[p].unSelectAllHooks();  
  }
}


//--------------------------------------
//	MISC. FUNCTIONS
//--------------------------------------
void hideWalls() {
	areHidden = !areHidden;
}
void wireframe() {
	isWireframe = !isWireframe;
}
void showHideHooks() {
	isHooks = !isHooks;
}
void viewDoorsAndWalls() {
	isDoorsAndWalls = !isDoorsAndWalls;
}


//--------------------------------------
//	SELECT HOOKS VIA KEYBOARD
//--------------------------------------
void keyPressed() {
	// unselect all hooks
	walls[wallCnt].unSelectAllHooks();  
  // Cycle through walls
  if (key == CODED) {
    if (keyCode == LEFT) { 	
   		wallCnt--;
   		if (wallCnt < 0) { wallCnt = 4; }
    } else if (keyCode == RIGHT) {
    	wallCnt++;
    	if (wallCnt > 4) { wallCnt = 0; }
    } 
  }
  walls[wallCnt].cycleThrghHooks();
}


//--------------------------------------
//	CREATE POLYGONS
//--------------------------------------
void buildPolygons() {
	for (int p = 0; p < faces.length; p++) {
		polygons = (Polygon[])append(polygons, new Polygon(faces[p].nodes));
	}
}
void polygonsVisibility() {
	isDrawPolygons = !isDrawPolygons;
}
float areaOfTriangle(PVector v1, PVector v2, PVector v3) {
	PVector ab = PVector.sub(v2, v1);
	PVector ac = PVector.sub(v3, v1);
	PVector vCross = ab.cross(ac);
	float area = vCross.mag(ab.cross(ac));
	return area;
}
PVector centeroidOfTriangle(PVector v1, PVector v2, PVector v3) {
	PVector centeroid;
	float x_ = (v1.x+v2.x+v3.x)/3;
	float y_ = (v1.y+v2.y+v3.y)/3;
	float z_ = (v1.z+v2.z+v3.z)/3;
	centeroid = new PVector(x_,y_,z_);
	return centeroid;
}