import { LineMaterial, Line2, LineGeometry } from 'three-fatline';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { sceneState, HelperOptions, SnapOptions, SnapType, SnapStatus, toolsState } from '../../state';
import { getLineMat, pointObj } from '../objs3d';
import { createBaseV3s } from './createBaseV3s';

//new instance is created when Tool's startDrawing() called
class SnapManager {
	options: HelperOptions;
	snapOptions: SnapOptions;

	scene: THREE.Scene;
	renderLabel:THREE.Points;
	labelMaterial: THREE.PointsMaterial;
	renderGeom: THREE.BufferGeometry;

	guidesObj: Line2;
	guidesMat: LineMaterial;
	guidesGeom: LineGeometry;

	constructor(scene: THREE.Scene){
		this.scene = scene;
		this.options = toolsState.helpersOptions;

		this.snapOptions = this._loadInitSnapOptions();


    //LABELS - shows snapped points
		this.labelMaterial = new THREE.PointsMaterial( { color: 0x5CC6FF, size: 11, sizeAttenuation: false, opacity: 0.5, transparent:true} )
		this.labelMaterial.depthWrite = false;
		this.labelMaterial.depthTest = false;
		this.renderGeom = new THREE.BufferGeometry();

		this.renderLabel = new THREE.Points( this.renderGeom, this.labelMaterial );

		//GUIDES - lines that shows snapped angle
		this.guidesMat = getLineMat(0xFF2F2F);
		this.guidesGeom = new LineGeometry();
		this.guidesObj = new Line2(this.guidesGeom, this.guidesMat);
	}


  //TODO see about performance when angle snap small and mouse moving fast
	snapToCoords = (pointerCoords: THREE.Vector3, toolState = 1, lastCoords?: THREE.Vector3):THREE.Vector3 => {
    //return if non of snapping is active
    if(Object.values(this.snapOptions).every(o => o.isActive === false)){
      return pointerCoords;
    }
    
    console.time("snapping time");
		for(let key in this.snapOptions!){
			(this.snapOptions as SnapOptions)[key as SnapType].snappedCoords = pointerCoords;
		}
		
		this._snapToGrid(pointerCoords);
		if(toolState > 1){
			this._snapToStep(pointerCoords, lastCoords);
			this._snapToAngle(pointerCoords, lastCoords);
		}

		let newCoords = pointerCoords;
		let distanceToPointer = Infinity;
		let finalSnapType: string = '';
		//iterate snapOptions and reassign if needed
		for(let key in this.snapOptions! as SnapOptions){
      //iterate only active snaps
			if(this.snapOptions[key as SnapType].isActive){
				if(this.snapOptions[key as SnapType].distToOrigin <= distanceToPointer){
					distanceToPointer = this.snapOptions[key as SnapType].distToOrigin;
					newCoords = this.snapOptions[key as SnapType].snappedCoords;
					finalSnapType = key;

					console.log(finalSnapType )
					console.log(newCoords)
				}
			}
		}
		//call helpers render
		this._renderHelperLabel(newCoords, finalSnapType, lastCoords);
    console.timeEnd("snapping time");
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
			newCoords.subVectors(pointerCoords, fixedCoords) //
      .setLength(snapDistance)
      .add(fixedCoords);
			
			console.log('step END', newCoords)

			const distanceToCurrent = pointerCoords.distanceTo(newCoords);

			this.snapOptions!.step.snappedCoords = newCoords;
			this.snapOptions!.step.distToOrigin = distanceToCurrent;
			return
		} else {
			return
		}

	}

	private _snapToAngle = (pointerCoords: THREE.Vector3, fixedCoords: THREE.Vector3 | undefined) => {
		const VECTOR = new Vector3(1, 0, 0);
		if (fixedCoords) {

			//SAFETY check if angles are not chosen
			//but snapping is active
			const closestV3collection: V3Collection = toolsState.anglesSnapV3s;
			if (Object.keys(closestV3collection).length === 0) {
				console.log('Angles for snapping werent chosen, angle snap is off');
				return;
			}

			const basedV3 = fixedCoords
			.clone()
			.add(
				pointerCoords
				.clone()
				.multiplyScalar(-1)
			);

			const currentAngleRad = VECTOR.angleTo(basedV3);
			const currentAngleDeg = currentAngleRad * (180/(Math.PI));
			console.log('ANGLE', currentAngleDeg);

			const isYDirectionPositive = pointerCoords.z > fixedCoords.z;
			console.log('POSITIVE', isYDirectionPositive);

			type V3Collection = {
				[key: number]: Array<Vector3>
			}

			let closestV3 = new Vector3();
			let threshold = 360;

			for (let [key, value] of Object.entries(closestV3collection)) {
				//choosing closest snapped option angle from collection
				//getting absolute value - delta
				//TODO rename stuff
				const newThreshold = Math.abs(currentAngleDeg - parseInt(key));

				console.log('CURRENT ANGLE', currentAngleDeg);
				console.log('T', newThreshold);
				if( newThreshold < threshold){
					threshold = newThreshold;
					//check 'side' from main NJS Vector
					//assign V3 from snapped angle
					//TODO remove V3 array & change just z for -1 * z
					if(isYDirectionPositive){
						closestV3 = closestV3collection[key as unknown as keyof V3Collection][0];
					} else {
						closestV3 = closestV3collection[key as unknown as keyof V3Collection][1];
					}
					console.log('ANGLE KEY', key);
					console.log(closestV3.x, closestV3.z);
				}
				console.log('RESULT TRESHOLD', threshold)
			}

			console.log('CLOSEST V3', closestV3);

			//longing base UNIT V3 to needed distance
			const basedNewV3 = closestV3.clone().setLength (fixedCoords.distanceTo(pointerCoords));

			//'moving' vector from CENTER to fixed point
			const newV3 = basedNewV3
			.clone()
			.add(fixedCoords);

			console.log('NEW', newV3);
			console.log('NEW B', basedNewV3);

      // saving results to obj
      const distanceToCurrent = pointerCoords.distanceTo(newV3);

			this.snapOptions!.angle.snappedCoords = newV3;
			this.snapOptions!.angle.distToOrigin = distanceToCurrent;

		}
	}

	private _renderHelperLabel = (coords: THREE.Vector3, finalSnapType: string, fixedCoords?: THREE.Vector3) => {
		switch(finalSnapType){
			case 'grid':
				this.labelMaterial.color = new THREE.Color( 0xA7A7A7 );
				break;
			case 'step':
				this.labelMaterial.color = new THREE.Color( 0x5CC6FF );
				break;
			case 'angle':        
        this.labelMaterial.color = new THREE.Color( 0x5CC6FF );
        if(fixedCoords){
          //temp render line parallel to snapped angle
          const guideV3 = new THREE.Vector3()
          guideV3.subVectors(coords, fixedCoords) //newV3 - fixed
          .setLength(10000) //TODO define number, infinite?
          .add(fixedCoords);

          this.guidesGeom.setPositions([...fixedCoords.toArray(),...guideV3.toArray()])

          this.scene.add(this.guidesObj);
        }

				break;
			case '':
				return
			default:
				this.labelMaterial.color = new THREE.Color( 0xA7A7A7 );
		}
		//helper object - point
		this.renderGeom.setFromPoints([coords])
		this.scene.add( this.renderLabel);
	}

  private _loadInitSnapOptions = (): SnapOptions => {
    const snapsArray: Array<SnapType> = ['grid', 'angle', 'step'];

		const statusPreset: SnapStatus = {
			isActive: false, 
			snappedCoords: new Vector3(), 
			distToOrigin: Infinity
    }

		const defaultSnapOptions: any = {};
  
		for(let i of snapsArray){
			console.log(statusPreset)
			defaultSnapOptions[i] = {...statusPreset};
		}

		const snapOptions: any = {...defaultSnapOptions};

    for(let item of this.options){
			if(item.type === 'snap'){
				(snapOptions as SnapOptions)[item.name as SnapType].isActive = item.isActive;
        (snapOptions as SnapOptions)[item.name as SnapType].snappedCoords = new Vector3();
        (snapOptions as SnapOptions)[item.name as SnapType].distToOrigin = Infinity;
			}
		}

    return snapOptions;
  }

	resetSnap = () => {
		this._removeRenderedLabels();
		for(let item of this.options){
			if(item.type === 'snap'){
				(this.snapOptions as SnapOptions)[item.name as SnapType].isActive = item.isActive;
				(this.snapOptions as SnapOptions)[item.name as SnapType].distToOrigin = Infinity;
				(this.snapOptions as SnapOptions)[item.name as SnapType].snappedCoords = new Vector3();
			}
		}
	}

	private _removeRenderedLabels = () => {
		this.scene.remove(this.renderLabel);
    this.scene.remove(this.guidesObj);
	}
	
}

export{SnapManager}
