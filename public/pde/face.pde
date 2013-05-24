//--------------------------------------
//	POLYGON FACE
//--------------------------------------
public class Face
{
	PVector[] nodes;
	color c;
	
	public Face (PVector[] _nodes) {
		nodes = _nodes;
		c = #F1C40F;
	}

	void update() {

		noStroke();
		fill(c);
		if (c==#F1C40F) {
			stroke(#F39C12);
		}
		beginShape();
			vertex(nodes[0].x, nodes[0].y, nodes[0].z);
			vertex(nodes[1].x, nodes[1].y, nodes[1].z);
			vertex(nodes[2].x, nodes[2].y, nodes[2].z);
			if (nodes[3]) vertex(nodes[3].x, nodes[3].y, nodes[3].z);
			if (nodes[4]) vertex(nodes[4].x, nodes[4].y, nodes[4].z);
			if (nodes[5]) vertex(nodes[5].x, nodes[5].y, nodes[5].z);
		endShape(CLOSE);
	}

	void fancyUpdate(PVector mid, Color [] _col) {
		fill(_col[0]);
		beginShape();
			vertex(nodes[0].x, nodes[0].y, nodes[0].z);
			vertex(mid.x, mid.y, mid.z);
			vertex(nodes[1].x, nodes[1].y, nodes[1].z);
		endShape(CLOSE);
		fill(_col[1]);
		beginShape();
			vertex(nodes[2].x, nodes[2].y, nodes[2].z);
			vertex(mid.x, mid.y, mid.z);
			vertex(nodes[1].x, nodes[1].y, nodes[1].z);
		endShape(CLOSE);
		fill(_col[2]);
		beginShape();
			vertex(nodes[2].x, nodes[2].y, nodes[2].z);
			vertex(mid.x, mid.y, mid.z);
			vertex(nodes[3].x, nodes[3].y, nodes[3].z);
		endShape(CLOSE);
		fill(_col[3]);
		beginShape();
			vertex(nodes[0].x, nodes[0].y, nodes[0].z);
			vertex(mid.x, mid.y, mid.z);
			vertex(nodes[3].x, nodes[3].y, nodes[3].z);
		endShape(CLOSE);
	}

}
