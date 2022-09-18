import * as THREE from 'three';
import { Vector3 } from 'three';
import { mapLinear } from 'three/src/math/MathUtils';
import { sceneState, HelperOptions, HelpersActivity, SnapOptions, SnapType } from '../../state';

//new instance is created when Tool's startDrawing() called
class SnapManager {
	options: HelperOptions;
	activityOptions: HelpersActivity | null;
	snapOptions: SnapOptions | null;
	scene: THREE.Scene;
	renderLabel:THREE.Points;
	labelMaterial: THREE.PointsMaterial;
	renderGeom: THREE.BufferGeometry;

	constructor(scene: THREE.Scene){
		this.scene = scene;
		this.options = sceneState.helpersOptions;
		this.activityOptions = sceneState.isHelpersActive;
		this.snapOptions = null;


		this.labelMaterial = new THREE.PointsMaterial( { color: 0x5CC6FF, size: 11, sizeAttenuation: false, opacity: 0.5, transparent:true} )
		this.labelMaterial.depthWrite = false;
		this.labelMaterial.depthTest = false;
		this.renderGeom = new THREE.BufferGeometry();

		this.renderLabel = new THREE.Points( this.renderGeom, this.labelMaterial );

		this._constructSnapOptions();
	}


	snapToCoords = (currentCoords: THREE.Vector3, lastCoords?: THREE.Vector3):THREE.Vector3 => {
		this._snapToGrid(currentCoords);
		this._snapToStep(currentCoords, lastCoords);
		// this._snapToAngle();

		let newCoords = currentCoords;
		let distanceToPointer = Infinity;
		let finalSnapType: string = '';
		//iterate snapOptions and reassign if needed
		for(let key in this.snapOptions!){
			if(this.snapOptions[key as SnapType].isActive){
				if(this.snapOptions[key as SnapType].distToOrigin <= distanceToPointer){
					distanceToPointer = this.snapOptions[key as SnapType].distToOrigin;
					newCoords = this.snapOptions[key as SnapType].snappedCoords;
					finalSnapType = key;
				}
			}
		}

		console.log(finalSnapType)
		//call helpers render
		this._renderHelperLabel(newCoords, finalSnapType);

		return newCoords;

	}

	private _snapToGrid = (pointerCoords: THREE.Vector3): void => {
		//depends on active
		if(this.snapOptions!.grid.isActive){
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

			this.snapOptions!.grid.snappedCoords = newCoords;
			this.snapOptions!.grid.distToOrigin = distanceToCurrent;			
			return
		} else {
			return
		}
	}

	private _snapToStep = (pointerCoords: THREE.Vector3, fixedCoords: THREE.Vector3 | undefined): void => {
		//find coords
		//TODO search within Options?
		if(this.snapOptions!.step.isActive && fixedCoords){
			let newCoords = Object.assign({}, pointerCoords);
			const snapValue = this.options[0].value;

			const distToPointer = fixedCoords.distanceTo(pointerCoords);

			const snapsAmount = Math.round(distToPointer / snapValue);
			const snapDistance = snapsAmount * snapValue;

			newCoords = new THREE.Vector3()
			newCoords.subVectors(pointerCoords, fixedCoords).setLength(snapDistance).add(fixedCoords);
			
			console.log('step END', newCoords)


			const distanceToCurrent = pointerCoords.distanceTo(newCoords);

			this.snapOptions!.step.snappedCoords = newCoords;
			this.snapOptions!.step.distToOrigin = distanceToCurrent;
			return
		} else {
			return
		}

	}

	private _renderHelperLabel = (coords: THREE.Vector3, finalSnapType: string) => {
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

	private _constructSnapOptions = () => {
		for(let item of this.options){
			if(item.type === 'snap'){
				(this.snapOptions as SnapOptions)[item.name as SnapType] = {
					isActive: item.isActive, 
					snappedCoords: new Vector3(), 
					distToOrigin: Infinity
				}
			}
		}
	}

	removeRenderedLabels = () => {
		this.scene.remove( this.renderLabel);
	}
	
}

export{SnapManager}