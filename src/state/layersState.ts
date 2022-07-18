import { makeAutoObservable } from "mobx";

type Layer = {
    name: string;
    numThree: number;
    active: boolean;
    empty: boolean;
    editable: boolean;
    visible: boolean;
    appearance: {
        colorLine: number;
        colorArea: number;
    }
}

class LayersState{

    constructor(){
        makeAutoObservable(this);

    }


}

const layersState = new LayersState();

export {layersState}