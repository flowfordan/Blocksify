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
	isRange: boolean,
	rangeMin: number,
	rangeMax: number,
	rangeStep: number,
	//actually 1! 5 10 20 30! 45!
	//! - default
	isSelection: boolean,
	numbers: Array<number> | 0
}

class SceneState{

    isFetchingGlobalCoords: boolean;
    globalCoords: Coords;
    currentCamera: number;
	helpersOptions: Array<HelperOption>
    // cameraOptions: {

    // }

    constructor(){
        
        this.isFetchingGlobalCoords = true;
        this.globalCoords = {
            x: 0.00,
            y: 0.00,
            z: 0.00
        };
        this.currentCamera = 1;

		this.helpersOptions = [
			{
				helperID: 0,
				type: 'snap',
				name: 'spacing',
				isActive: false,
				value: 2,
				isRange: true,
				rangeMin: 0.5,
				rangeMax: 5,
				rangeStep: 0.5,
				isSelection: false,
				numbers: 0
			},
			{
				helperID: 1,
				type: 'snap',
				name: 'angle',
				isActive: false,
				value: 2,
				isRange: false,
				rangeMin: 0,
				rangeMax: 0,
				rangeStep: 0,
				isSelection: true,
				numbers: [20, 30]
			},
			{
				helperID: 2,
				type: 'snap',
				name: 'grid',
				isActive: false,
				value: 0,
				isRange: false,
				rangeMin: 0,
				rangeMax: 0,
				rangeStep: 0,
				isSelection: false,
				numbers: 0
			},
			{
				helperID: 3,
				type: 'grid',
				name: 'size',
				isActive: true,
				value: 10,
				isRange: true,
				rangeMin: 0.5,
				rangeMax: 20,
				rangeStep: 0.5,
				isSelection: false,
				numbers: 0
			},
		]

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

}

const sceneState = new SceneState();

export {sceneState}