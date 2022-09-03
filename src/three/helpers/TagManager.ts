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

	renderTag = () => {
		//delete if there is a tag
		this.tagContainer.textContent = `Bla Bla`;
		this.toolTag.position.set(5, 5, 5)

		this.scene.add(this.toolTag);
	}

	stopRender = () => {
		this.scene.remove(this.toolTag);
	}
}

export {TagManager}