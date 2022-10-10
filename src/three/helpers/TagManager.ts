import * as THREE from "three";
import { Vector3 } from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
import { sceneState } from "../../state";

class TagsManager {
	// tagContainers: Array<HTMLDivElement>;
	scene: THREE.Scene;
	toolTags: {
    lengths: Array<CSS2DObject>,
    angles: Array<CSS2DObject>,
  };

  tagContainers: {
    lengths: Array<HTMLDivElement>,
    angles: Array<HTMLDivElement>,
  }

  baseDirection: THREE.Vector3;

	//TODO: call new TagManager in StartDrawing()
	//create CSS2D object in constructor
	constructor(scene: THREE.Scene){
		this.scene = scene;
    this.baseDirection = sceneState.baseDirection;

		//container options
		this.tagContainers = {lengths: [], angles: []};

		//tag options
		this.toolTags = {lengths: [], angles: []};
	}

	renderTag = (v0: Array<THREE.Vector3>, v1: THREE.Vector3) => {
    const line = new Vector3();
    line.subVectors(v0[0], v1)
    console.log(this.baseDirection.angleTo(line)  * (180/(Math.PI)))

		this.scene.remove(...this.toolTags.lengths, ...this.toolTags.angles);

		for(let i=0; i<v0.length; i++){
			this.tagContainers[i] = document.createElement('div');
			this.tagContainers[i].className = 'label';
			this.tagContainers[i].style.marginTop = '-1em';
			this.toolTags[i] = new CSS2DObject( this.tagContainers[i] );

			this.tagContainers[i].textContent = `${v0[i].distanceTo(v1).toFixed(2)} m`;
			this.toolTags[i].position.lerpVectors(v0[i], v1, 0.5)
		}

		this.scene.add(...this.toolTags);
	}

	stopRender = () => {
		this.scene.remove(...this.toolTags.lengths, ...this.toolTags.angles);
	}
}

export {TagsManager}