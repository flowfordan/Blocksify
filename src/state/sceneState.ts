import { makeAutoObservable } from "mobx";

type Coords = {
    x: number,
    y: number,
    z: number 
}

class SceneState{

    isFetchingGlobalCoords: boolean;
    globalCoords: Coords

    constructor(){
        makeAutoObservable(this);
        this.isFetchingGlobalCoords = true;
        this.globalCoords = {
            x: 0.00,
            y: 0.00,
            z: 0.00
        }
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