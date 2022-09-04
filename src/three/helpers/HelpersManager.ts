import * as THREE from 'three';
import { sceneState, HelperOption } from '../../state';

//new instance is created when Tool's startDrawing() called
class HelpersManager {
	options: Array<HelperOption>;

	constructor(){
		this.options = sceneState.helpersOptions;
	}

	adjustCoords = (initCoords: THREE.Vector3): THREE.Vector3 => {
		const newCoords = initCoords
		//grid adjusment
		if(this.options[2].isActive){
			const presition = this.options[3].value;

			const adjustVal = (coord: number, presition: number): number => {
				let newCoord = 0;
				if(presition < 1 ){
					newCoord = Math.round(coord*2)/2;
				} else {
					newCoord = Math.round(coord/10)*10;
				}

				return newCoord;
			}

			newCoords.x = adjustVal(newCoords.x, presition);
			newCoords.z = adjustVal(newCoords.z, presition);
		}

		return newCoords;
	}

	setGrid = () => {

	}

	_renderHelperLabel = () => {

	}
	
}

export{HelpersManager}