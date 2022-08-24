import { makeAutoObservable } from "mobx";

type Coords = {
    x: number,
    y: number,
    z: number 
}

class SceneState{

    isFetchingGlobalCoords: boolean;
    globalCoords: Coords;
    currentCamera: number;

	//grid, snapping and continous helpers lines
	helpersOptions: {
		snapping: {
			spacing: {
				isActive: boolean,
				step: number
			},
			angle: {
				isActive: boolean,
				//actually 1! 5 10 20 30! 45!
				//! - default
				steps: Array<number>
			},
			grid: {
				isActive: boolean
			}
		},
		grid: {
			isActive: boolean,
			size: number
		}
		detector: null
	};
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

		this.helpersOptions = {
			snapping: {
				spacing: {
					isActive: false,
					step: 1
				},
				angle: {
					isActive: false,
					steps: [30, 90]
				},
				grid: {
					isActive: false
				}
			},
			grid: {
				isActive: true,
				size: 10
			},
			detector: null
		}

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

}

const sceneState = new SceneState();

export {sceneState}