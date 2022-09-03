import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";

class TagManager {
	tagContainer: HTMLDivElement;
	scene: THREE.Scene;
	toolTag: CSS2DObject;

	constructor(scene: THREE.Scene){
		this.scene = scene;

		//container options
		this.tagContainer = document.createElement('div');
		this.tagContainer.className = 'label';
		this.tagContainer.style.marginTop = '-1em';

		//tag options
		this.toolTag = new CSS2DObject( this.tagContainer );
	}

	renderTag = (v0: THREE.Vector3, v1: THREE.Vector3) => {
		//delete if there is a tag
		this.tagContainer.textContent = `${v0.distanceTo(v1).toFixed(2)} m`;
		this.toolTag.position.lerpVectors(v0, v1, 0.5)

		this.scene.add(this.toolTag);
	}

	stopRender = () => {
		this.scene.remove(this.toolTag);
	}
}

export {TagManager}