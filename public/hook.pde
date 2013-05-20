//--------------------------------------
//	HOOK PARTICLES
//--------------------------------------
public class Hook
{
	PVector v;
	color c;
	Boolean isSelected;
	
	public Hook (PVector _v, color _c) {
		v = _v;
		c = _c;
		isSelected = false;
	}

	void select() {
		isSelected = true;
	}

	void unSelect() {
		isSelected = false;
	}

	void update() {
		pushMatrix();
			if (isSelected) {
				fill(#C0392B);
				stroke(c);
				translate(v.x,v.y,v.z);
				box(15);
				noFill();
			} else if (isHooks) {
				stroke(c);
				noFill();
				translate(v.x,v.y,v.z);
				box(10);
			}
		popMatrix();
	}
}