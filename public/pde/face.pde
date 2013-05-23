//--------------------------------------
//	POLYGON FACE
//--------------------------------------
public class Face
{
	PVector[] nodes;
	
	public Face (PVector[] _nodes) {
		nodes = _nodes;
	}

	void update() {

		fill(#F1C40F);
		stroke(#F39C12);

		beginShape();
			vertex(nodes[0].x, nodes[0].y, nodes[0].z);
			vertex(nodes[1].x, nodes[1].y, nodes[1].z);
			vertex(nodes[2].x, nodes[2].y, nodes[2].z);
			if (nodes[3]) vertex(nodes[3].x, nodes[3].y, nodes[3].z);
			if (nodes[4]) vertex(nodes[4].x, nodes[4].y, nodes[4].z);
			if (nodes[5]) vertex(nodes[5].x, nodes[5].y, nodes[5].z);
		endShape(CLOSE);
	}
}
