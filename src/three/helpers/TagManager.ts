import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";

class TagsManager {
	tagContainers: Array<HTMLDivElement>;
	scene: THREE.Scene;
	toolTags: Array<CSS2DObject>;

	//TODO: call new TagManager in StartDrawing()
	//create CSS2D object in constructor
	constructor(scene: THREE.Scene){
		this.scene = scene;

		//container options
		this.tagContainers = [];

		//tag options
		this.toolTags = [];
	}

	renderTag = (v0: Array<THREE.Vector3>, v1: THREE.Vector3) => {
		this.scene.remove(...this.toolTags);
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
		this.scene.remove(...this.toolTags);
	}
}

export {TagsManager}