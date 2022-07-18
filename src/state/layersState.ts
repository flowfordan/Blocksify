import { makeAutoObservable } from "mobx";

const defaultPreset = [
    {
            name: 'Border',
            id: 2,
            active: true,
            empty: true,
            editable: true,
            visible: true,
            appearance: {
                colorLine: 0xFF5E32,
                colorArea: 0xFF5E32,
            }
          },
          {
            name: 'Streets',
            id: 3,
            active: false,
            empty: false,
            editable: true,
            visible: true,
            appearance: {
                colorLine: 0x533931,
                colorArea: 0x533931,
            }
          },
          {
            name: 'Blocks',
            id: 4,
            active: false,
            empty: true,
            editable: false,
            visible: true,
            appearance: {
                colorLine: 0x533931,
                colorArea: 0x533931,
            }
          },
          {
            name: 'Buildings',
            id: 5,
            active: false,
            empty: true,
            editable: false,
            visible: false,
            appearance: {
                colorLine: 0x533931,
                colorArea: 0x533931,
            }
          }
]

export type Layer = {
    name: string;
    id: number; //three layers from 0 to 32
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

    layers: Array<Layer>

    constructor(){
        
        this.layers = defaultPreset;
            
        makeAutoObservable(this);

    }



    setActiveLayer = (num: number) => {
        //set new active
        let newActive = this.layers.find(item => item.id === num);

        if(newActive){
            
            if(!newActive.editable){
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