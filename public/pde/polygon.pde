//--------------------------------------
//	POLYGON FLATTTENED
//--------------------------------------
public class Polygon
{
	PVector[] nodes;
	
	public Polygon (PVector[] _nodes) {
		nodes = _nodes;
	}

	void update() {

		PVector ac = PVector.sub(nodes[1], nodes[0]);
		PVector ab = PVector.sub(nodes[2], nodes[0]);


		float d1 = ac.mag();
		float d2 = ab.mag();

		int dir1 = 1;
		int dir2x = 1;
		int dir2y = 1;

		if ( nodes[0].x > nodes[1].x) dir1 = -1;
		if ( nodes[2].x < nodes[0].x ) dir2x = -1;
		if ( nodes[2].y > nodes[1].y ) dir2y = -1;

		float a = PVector.angleBetween(ab, ac);

		float x1 = nodes[0].x;
		float y1 = nodes[0].y;
		float x2 = x1+(dir1*d1);
		float y2 = y1;
		float x3 = x1+(dir2x*d2*cos(a));
		float y3 = y1-(dir2y*d2*sin(a));
		// draw projected triangle
		PVector cent = centeroidOfTriangle(new PVector(x1,y1,0), new PVector(x2,y2,0), new PVector(x3,y3,0));
		fill(#F1C40F);
		stroke(#F39C12);
		beginShape();
			vertex(x1, y1, 0);
			vertex(x2, y2, 0);
			vertex(x3, y3, 0);
		endShape(CLOSE);
		noStroke();
		fill(0);
		String area = String(round(areaOfTriangle(nodes[0], nodes[1], nodes[2])/10000));
		textSize(60);
		text("Area: "+area+"m2", cent.x, cent.y, 100); 
		
		// console.log(areaOfTriangle(nodes[0], nodes[1], nodes[2]));
		// console.log(areaOfTriangle(new PVector(x1,y1,0), new PVector(x2,y2,0), new PVector(x3,y3,0)));
	}
}
