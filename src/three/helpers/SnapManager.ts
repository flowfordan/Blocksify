import * as THREE from 'three';
import { mapLinear } from 'three/src/math/MathUtils';
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
	}

	snapToCoords = (currentCoords: THREE.Vector3, lastCoords?: THREE.Vector3):THREE.Vector3 => {
		const snapStatus = new Map();
		snapStatus.set("grid", {isActive: true, snappedCoords: null, distToOrigin: null})
		.set("step", {isActive: true, snappedCoords: null, distToOrigin: null})
		.set("angle", {isActive: true, snappedCoords: null, distToOrigin: null})

		this._snapToGrid2(currentCoords, snapStatus);
		this._snapToStep2(currentCoords, lastCoords, snapStatus);
		// this._snapToAngle();

		//
		let newCoords = currentCoords;
		let distanceToPointer = Infinity;
		let finalSnapType = '';
		for(let [type, status] of snapStatus){
			if(status.isActive){
				if(status.distToOrigin <= distanceToPointer){
					newCoords = status.snappedCoords;
					finalSnapType = type;
				}
			}
		}

		//call render
		this._renderHelperLabel1(newCoords, finalSnapType);

		return newCoords;

	}

	private _snapToGrid2 = (pointerCoords: THREE.Vector3, status: Map<string, any>): void => {
		//depends on active
		if(this.activityOptions![2]){
			const newCoords = Object.assign({}, pointerCoords);

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

			const distanceToCurrent = pointerCoords.distanceTo(newCoords);

			status.set("grid", {isActive: true, snappedCoords: newCoords, distToOrigin: distanceToCurrent})
			
			return
		} else {
			return
		}
	}

	private _snapToStep2 = (pointerCoords: THREE.Vector3, fixedCoords: THREE.Vector3 | undefined, status: Map<string, any>): void => {
		//find coords
		//TODO search within Options?
		if(this.options[0].isActive && fixedCoords){
			let newCoords = Object.assign({}, pointerCoords);
			const snapValue = this.options[0].value;

			const distToPointer = fixedCoords.distanceTo(pointerCoords);

			const snapsAmount = Math.round(distToPointer / snapValue);
			const snapDistance = snapsAmount * snapValue;

			newCoords = new THREE.Vector3()
			newCoords.subVectors(pointerCoords, fixedCoords).setLength(snapDistance).add(fixedCoords);
			
			console.log('step END', newCoords)


			const distanceToCurrent = pointerCoords.distanceTo(newCoords);

			status.set("step", {isActive: true, snappedCoords: newCoords, distToOrigin: distanceToCurrent})
			return
		} else {
			return
		}

	}

	private _renderHelperLabel1 = (coords: THREE.Vector3, finalSnapType: string) => {
		switch(finalSnapType){
			case 'grid':
				this.labelMaterial.color = new THREE.Color( 0xA7A7A7 );
				break;
			case 'step':
				this.labelMaterial.color = new THREE.Color( 0x5CC6FF );
				break;
			case 'angle':
				this.labelMaterial.color = new THREE.Color( 0x5CC6FF );
				break;
			case '':
				return
			default:
				this.labelMaterial.color = new THREE.Color( 0xA7A7A7 );
		}
		//helper object
		this.renderGeom.setFromPoints([coords])
		this.scene.add( this.renderLabel);
	}

	//TODO rewrite ugly if/elses
	snapCoords = (currentCoords: THREE.Vector3, lastCoords?: THREE.Vector3):THREE.Vector3 => {
		let newCoords = currentCoords;

		let gridSnapCoords = new THREE.Vector3(Infinity)
		let stepSnapCoords = new THREE.Vector3(Infinity)

		//TODO case when grid is off and step ON
		if(Object.values(this.activityOptions!).every(i => i === false)){
			console.log('Snapping is off');
			return currentCoords;
		} else 
		if(this.activityOptions![0] && !lastCoords && !this.activityOptions![2]) {
			return currentCoords;
		} else //case for 2 snaps in one time 
		if(this.activityOptions![2] && this.activityOptions![0] && lastCoords){
			stepSnapCoords = this._snapToStep(currentCoords, lastCoords);

			gridSnapCoords = this._snapToGrid(currentCoords);

			let labelType = 2;
			if(currentCoords.distanceTo(gridSnapCoords) > currentCoords.distanceTo(stepSnapCoords)){
				newCoords = stepSnapCoords;
				labelType = 0;
			} else {
				newCoords = gridSnapCoords;
			}

			this._renderHelperLabel(newCoords, labelType);

			return newCoords;
		} else
		if(this.activityOptions![2]) {
			newCoords = this._snapToGrid(currentCoords);
			this._renderHelperLabel(newCoords, 2);
			return newCoords;
		}  else
		if(this.activityOptions![0] && lastCoords) {
			newCoords = this._snapToStep(currentCoords, lastCoords);
			this._renderHelperLabel(newCoords);
			return newCoords;
		}
		else {
			return currentCoords
		}		
	}

	private _snapToGrid = (initCoords: THREE.Vector3): THREE.Vector3 => {
		const newCoords = Object.assign({}, initCoords);

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
		
		return newCoords;
	}

	private _snapToStep = (pointerCoords: THREE.Vector3, fixedCoords: THREE.Vector3): THREE.Vector3 => {
		//find coords
		//TODO search within Options?
		let newCoords = Object.assign({}, pointerCoords);;

		if(this.options[0].isActive){
		const snapValue = this.options[0].value;

		const distToPointer = fixedCoords.distanceTo(pointerCoords);

		const snapsAmount = Math.round(distToPointer / snapValue);
		const snapDistance = snapsAmount * snapValue;

		newCoords = new THREE.Vector3()
		newCoords.subVectors(pointerCoords, fixedCoords).setLength(snapDistance).add(fixedCoords);
		}
		console.log('step END', newCoords)
		return newCoords;
	}

	private _renderHelperLabel = (coords: THREE.Vector3, type = 0) => {
		if(type === 0){
			this.labelMaterial.color = new THREE.Color( 0x5CC6FF );
		}else {
			this.labelMaterial.color = new THREE.Color( 0xA7A7A7 );
		}
		//helper object
		this.renderGeom.setFromPoints([coords])
		this.scene.add( this.renderLabel);
	}

	removeRenderedLabels = () => {
		this.scene.remove( this.renderLabel);
	}
	
}

export{SnapManager}