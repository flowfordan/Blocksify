import * as THREE from 'three';
import { sceneState, HelperOptions, HelpersActivity } from '../../state';

//new instance is created when Tool's startDrawing() called
class SnapManager {
	options: HelperOptions;
	activityOptions: HelpersActivity | null;
	scene: THREE.Scene;
	renderLabel:THREE.Points;
	labelMaterial: THREE.PointsMaterial;
	renderGeom: THREE.BufferGeometry;

	constructor(scene: THREE.Scene){
		this.options = sceneState.helpersOptions;
		this.activityOptions = sceneState.isHelpersActive;
		this.scene = scene;

		this.labelMaterial = new THREE.PointsMaterial( { color: 0x5CC6FF, size: 11, sizeAttenuation: false, opacity: 0.5, transparent:true} )
		this.labelMaterial.depthWrite = false;
		this.labelMaterial.depthTest = false;
		this.renderGeom = new THREE.BufferGeometry();

		this.renderLabel = new THREE.Points( this.renderGeom, this.labelMaterial );
		// this.renderLabel.scale.set(0.03,0.03,0.03)
	}

	snapCoords = (currentCoords: THREE.Vector3, lastCoords?: THREE.Vector3):THREE.Vector3 => {
		let newCoords = currentCoords;

		let gridSnapCoords = new THREE.Vector3(Infinity)
		let stepSnapCoords = new THREE.Vector3(Infinity)

		//TODO case when grid is off and step ON
		if(Object.values(this.activityOptions!).every(i => i === false)){
			console.log('Snapping is off');
			return currentCoords;
		}
		//check if grid snap active
		if(this.activityOptions![2]){
			gridSnapCoords = this._snapToGrid(currentCoords);
			console.log('GRID',gridSnapCoords)
		}

		//check if spacing snap active
		if(this.activityOptions![0] && lastCoords){
			stepSnapCoords = this._snapToStep(currentCoords, lastCoords);
			console.log('STEP',stepSnapCoords)
		}

		newCoords = currentCoords.distanceTo(gridSnapCoords) > currentCoords.distanceTo(stepSnapCoords)? stepSnapCoords : gridSnapCoords;
		console.log(currentCoords.distanceTo(gridSnapCoords), 'vs', currentCoords.distanceTo(stepSnapCoords));
		this._renderHelperLabel(newCoords);

		return newCoords;
	}

	private _snapToGrid = (initCoords: THREE.Vector3): THREE.Vector3 => {
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

			// this._renderHelperLabel(newCoords);
		}
		return newCoords;
	}

	private _snapToStep = (pointerCoords: THREE.Vector3, fixedCoords: THREE.Vector3): THREE.Vector3 => {
		//find coords
		//TODO search within Options?
		let newCoords = pointerCoords;
		console.log('step START', newCoords)

		if(this.options[0].isActive){
		const snapValue = this.options[0].value;

		const distToPointer = fixedCoords.distanceTo(pointerCoords);

		const snapsAmount = Math.round(distToPointer / snapValue);
		const snapDistance = snapsAmount * snapValue;

		newCoords = new THREE.Vector3()
		newCoords.subVectors(pointerCoords, fixedCoords).setLength(snapDistance).add(fixedCoords);

		//render ray and closest point
		//this._renderHelperRay();
		// this._renderHelperLabel(newCoords);
		}
		console.log('step END', newCoords)
		return newCoords;
	}

	private _renderHelperLabel = (coords: THREE.Vector3) => {
		//helper object
		this.renderGeom.setFromPoints([coords])
		this.scene.add( this.renderLabel);

		console.log(this.scene.children);
	}

	removeRenderedLabels = () => {
		this.scene.remove( this.renderLabel);
	}
	
}

export{SnapManager}