import { helpersDefPreset } from './presets/helpersPreset';
import { makeAutoObservable, toJS } from "mobx";
import { Vector3 } from 'three';

type Coords = {
    x: number,
    y: number,
    z: number 
}

type HelperType = 'snap' | 'grid'

// enum SnapType {
// 	grid = 'grid',
// 	step = 'step',
// 	angle = 'angle'
// }

type SnapType = 'step' | 'grid' | 'angle'

interface HelperOption {
	helperID: number,
	type: HelperType,
	name: string,
	isActive: boolean,
	value: number,
	valueName: string,
	isRange: boolean,
	rangeMin: number,
	rangeMax: number,
	rangeStep: number,
	isSelection: boolean,
	variants?: Array<number>,
	numbers: Array<number>
}

type HelperOptions = Array<HelperOption>;

type SnapStatus = {isActive: boolean, snappedCoords: Vector3, distToOrigin: number}

type SnapOptions = {
	[I in SnapType]: SnapStatus;
}

type HelpersActivity = {
	[id: number]: boolean;
};

class SceneState{

    isFetchingGlobalCoords: boolean;
    globalCoords: Coords;
    currentCamera: number;
	helpersOptions: HelperOptions;
	isHelpersActive: HelpersActivity | null;

    constructor(){
        
        this.isFetchingGlobalCoords = true;
        this.globalCoords = {
            x: 0.00,
            y: 0.00,
            z: 0.00
        };
        this.currentCamera = 1;

		this.helpersOptions = helpersDefPreset as HelperOptions;
		this.isHelpersActive = null;


		this._constructIsHelpersActive();
        makeAutoObservable(this);
    }



    changeCamera = (id: number) => {
        this.currentCamera = id;
    }

    toggleCoordsFetching = (status: boolean) => {
        this.isFetchingGlobalCoords = status;
        if(!status){
            this.globalCoords.x = 0;
            this.globalCoords.y = 0;
            this.globalCoords.z = 0;
        }
    }
    
    setGlobalCoords = (coords: Coords) => {
        this.globalCoords.x = coords.x;
        this.globalCoords.y = coords.y;
        this.globalCoords.z = coords.z;
    }

	toggleHelperActive = (id: number) => {
		const item = this.helpersOptions.find(i => i.helperID === id);
		if(item){
			let idx = this.helpersOptions.indexOf(item);
			this.helpersOptions[idx].isActive = !this.helpersOptions[idx].isActive;

			this._updIsHelperActive(item.helperID);
		}
	}

	setHelperValue = (id: number, value: number) => {
		//find helper by id
		const item = this.helpersOptions.find(i => i.helperID === id);
		if(item){
			let idx = this.helpersOptions.indexOf(item);
			this.helpersOptions[idx].value = value
		}
	}

	setValuesCollection = (id:number, value: number, include: boolean) => {
		const item = this.helpersOptions.find(i => i.helperID === id);
		if(item){
			let idx = this.helpersOptions.indexOf(item);
			if(include){
				this.helpersOptions[idx].numbers.push(value);
			} else {
				const numIdx = this.helpersOptions[idx].numbers.indexOf(value);
				if(numIdx > -1){
					this.helpersOptions[idx].numbers.splice(numIdx, 1)
				}
			}
		}

	}

	private _constructIsHelpersActive = () => {
		let obj: HelpersActivity = {};
		for(let item of this.helpersOptions){
			obj[item.helperID] = item.isActive
		}	
		this.isHelpersActive = obj;
	}

	private _updIsHelperActive = (id: number) => {
		if(this.isHelpersActive){
			this.isHelpersActive[id] = !this.isHelpersActive[id];
		}
		
	}

}

const sceneState = new SceneState();

export { sceneState };
export type { HelperOptions, HelperOption, HelpersActivity, SnapOptions, SnapType, SnapStatus };
