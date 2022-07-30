import { makeAutoObservable } from "mobx";
import { LineMaterial } from "three-fatline";
import { layersDefPreset } from "./layersDefPreset";


export type Layer = {
    name: string;
    id: number; //three layers from 0 to 32
    active: boolean;
    empty: boolean;
    editable: boolean;
    visible: boolean;
    material: {
        line: LineMaterial;
        mesh: number;
    }
}

class LayersState{

    layers: Array<Layer>;

    constructor(){
        this.layers = layersDefPreset;
        makeAutoObservable(this);
    }

    setActiveLayer = (num: number) => {
        //set new active
        let newActive = this.layers.find(item => item.id === num);

        if(newActive){
            
            if(!newActive.editable){
				//TODO popup window 'Layer is not editable'
                console.log('exit')
                return
            }
            
            //set current  active to not active
            let currentActive = this.layers.find(item => item.active);
            if(currentActive){
                let idx = this.layers.indexOf(currentActive);
                this.layers[idx].active = false;
            }

            let idx = this.layers.indexOf(newActive);
            this.layers[idx].active = true;
        }     
        
    }
}

const layersState = new LayersState();

export {layersState}
