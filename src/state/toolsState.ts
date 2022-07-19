import { makeAutoObservable } from "mobx";

class ToolsState{

    //TODO: wrap to array of objects propertie
    //{id: 0, name: line, active: false}...
    isDrawLine: boolean;
    isDrawPLine: boolean;
    isDrawPolygon: boolean;

    constructor(){
        
        this.isDrawLine = false;
        this.isDrawPLine = false;
        this.isDrawPolygon = false;
        makeAutoObservable(this);
    }

    //TODO: when starts one tool, another stops or couldnt be active
    toggleDrawLine = (status: boolean) => {
        this.isDrawLine = status;
    }

    toggleDrawPLine = (status: boolean) => {
        this.isDrawPLine = status;
    }

    toggleDrawPolygon = (status: boolean) => {
        this.isDrawPolygon = status;
    }
}

const toolsState = new ToolsState();

export {toolsState}