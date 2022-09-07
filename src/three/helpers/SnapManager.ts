import * as THREE from 'three';
import { sceneState, HelperOption } from '../../state';

//new instance is created when Tool's startDrawing() called
class SnapManager {
	options: Array<HelperOption>;
	scene: THREE.Scene;
	renderLabel:THREE.Sprite;
	labelMaterial: THREE.SpriteMaterial;

	constructor(scene: THREE.Scene){
		this.options = sceneState.helpersOptions;
		this.scene = scene;

		this.labelMaterial = new THREE.SpriteMaterial( { color: Math.random() * 0xffffff } );
		this.labelMaterial.depthWrite = false;
		this.labelMaterial.depthTest = false;
		
		this.labelMaterial.sizeAttenuation = false;

		this.renderLabel = new THREE.Sprite( this.labelMaterial );
		// this.renderLabel.scale.set(0.03,0.03,0.03)


	}

	adjustCoords = (initCoords: THREE.Vector3): THREE.Vector3 => {
		const newCoords = initCoords
		//grid adjusment
		if(this.options[2].isActive){
			const precision = this.options[3].value;

			const adjustVal = (coord: number, precision: number): number => {
				let newCoord = 0;
				if(precision < 1 ){
					newCoord = Math.round(coord*2)/2;
				} else {
					newCoord = Math.round(coord/precision)*precision;
				}

				return newCoord;
			}

			newCoords.x = adjustVal(newCoords.x, precision);
			newCoords.z = adjustVal(newCoords.z, precision);
		}

		this._renderHelperLabel(newCoords);

		return newCoords;
	}

	setGrid = () => {

	}

	private _renderHelperLabel = (coords: THREE.Vector3) => {
		//helper object
		this.renderLabel.position.set(coords.x, coords.y, coords.z);
		this.scene.add( this.renderLabel);
	}

	removeRenderedLabels = () => {
		this.scene.remove( this.renderLabel);
	}
	
}

export{SnapManager}