import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";

class TagManager {
	tagContainer: Array<HTMLDivElement>;
	scene: THREE.Scene;
	toolTag: Array<CSS2DObject>;

	constructor(scene: THREE.Scene){
		this.scene = scene;

		//container options
		this.tagContainer = [];


		//tag options
		this.toolTag = [];
	}

	renderTag = (v0: Array<THREE.Vector3>, v1: THREE.Vector3) => {
		this.scene.remove(...this.toolTag);
		for(let i=0; i<v0.length; i++){
			this.tagContainer[i] = document.createElement('div');
			this.tagContainer[i].className = 'label';
			this.tagContainer[i].style.marginTop = '-1em';
			this.toolTag[i] = new CSS2DObject( this.tagContainer[i] );

			this.tagContainer[i].textContent = `${v0[i].distanceTo(v1).toFixed(2)} m`;
			this.toolTag[i].position.lerpVectors(v0[i], v1, 0.5)
		}
		// this.tagContainer.textContent = `${v0.distanceTo(v1).toFixed(2)} m`;
		// this.toolTag.position.lerpVectors(v0, v1, 0.5)

		this.scene.add(...this.toolTag);
	}

	stopRender = () => {
		this.scene.remove(...this.toolTag);
	}
}

export {TagManager}