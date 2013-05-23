//--------------------------------------
//	A WALL OF HOOKS
//--------------------------------------
public class Wall
{
	PVector v1, v2, v3, v4;
	int iStart, iEnd, counter;
	Color c;
	Boolean isSelected;
	Boolean isHidden;
	
	public Wall (PVector _v1, PVector _v2, PVector _v3, PVector _v4, int _iStart, int _iEnd, Color _c) {
		v1 = _v1;
		v2 = _v2;
		v3 = _v3;
		v4 = _v4;
		iStart = _iStart;
		iEnd = _iEnd;
		c = _c;
		counter = iStart;
		isSelected = isHidden = false;
	}

	void select() {
		isSelected = true;
	}

	void unSelect() {
		isSelected = false;
	}

	void unSelectAllHooks() {
		for (int p = iStart; p <= iEnd; p++) {
			if(hooks[p]) hooks[p].unSelect(); 
  	}
	}

	void selectHook(int id) {
		hooks[id].select();
		activeHook = id;  
	}

	void cycleThrghHooks() {
		if (key == CODED) {

	    if (keyCode == UP) {

	    	if(counter<iEnd) {
	      	counter++;
	    	}
	      if (counter>iStart) {
			  	hooks[counter-1].unSelect();
			  } else if (counter>=iEnd){
			  	hooks[iEnd].unSelect();
			  }
			  hooks[counter].select();
			  activeHook = counter;  

	    } else if (keyCode == DOWN) {
	      if(counter>iStart) {
	      	counter--;
	    	}
	      if (counter<iEnd) {
			  	hooks[counter+1].unSelect();
			  } else if (counter<=iStart){
			  	hooks[iStart].unSelect();
			  }
			  hooks[counter].select(); 
			  activeHook = counter; 
	    } 
	  }
	}

	void update() {
		stroke(#BDC3C7);
		if (isSelected) {
			fill(#DDE3E7);
		} else {
			fill(c);
		}
		if (isWireframe) {
			noFill();
		}
		beginShape();
			vertex(v1.x, v1.y, v1.z);
			vertex(v2.x, v2.y, v2.z);
			vertex(v3.x, v3.y, v3.z);
			vertex(v4.x, v4.y, v4.z);
		endShape(CLOSE);
	}
}