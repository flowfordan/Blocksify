import { helpersDefPreset } from './presets/helpersPreset';
import { makeAutoObservable } from "mobx";

type Coords = {
    x: number,
    y: number,
    z: number 
}

interface HelperOption {
	helperID: number,
	type: string,
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

class SceneState{

    isFetchingGlobalCoords: boolean;
    globalCoords: Coords;
    currentCamera: number;
	helpersOptions: Array<HelperOption>;

    constructor(){
        
        this.isFetchingGlobalCoords = true;
        this.globalCoords = {
            x: 0.00,
            y: 0.00,
            z: 0.00
        };
        this.currentCamera = 1;

		this.helpersOptions = helpersDefPreset;

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
			this.helpersOptions[idx].isActive = !this.helpersOptions[idx].isActive
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

}

const sceneState = new SceneState();

export { sceneState };
export type { HelperOption };
