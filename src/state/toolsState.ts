import { makeAutoObservable } from "mobx";

class ToolsState{

    isDrawLine: boolean;
    isDrawPLine: boolean;

    constructor(){
        makeAutoObservable(this);
        this.isDrawLine = false;
        this.isDrawPLine = false;
    }

    //TODO: when starts one tool, another stops or couldnt be active
    toggleDrawLine = (status: boolean) => {
        this.isDrawLine = status;
    }

    toggleDrawPLine = (status: boolean) => {
        this.isDrawPLine = status;
    }
}

const toolsState = new ToolsState();

export {toolsState}