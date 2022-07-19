import { makeAutoObservable, toJS } from "mobx";

enum EToolName {
    Line = 'line',
    PLine = 'polyline',
    Polygon = 'polygon'
}

interface ITool {
    id: number,
    name: EToolName,
    active: boolean
}

class ToolsState{

    //TODO: wrap to array of objects propertie
    //{id: 0, name: line, active: false}...
    drawingTools:Array<ITool>;
    isDrawLine: boolean;
    isDrawPLine: boolean;
    isDrawPolygon: boolean;

    constructor(){
        this.drawingTools = [
            {id: 0, name: EToolName.Line, active: false},
            {id: 1, name: EToolName.PLine, active: false},
            {id: 2, name: EToolName.Polygon, active: false}
        ]
        this.isDrawLine = false;
        this.isDrawPLine = false;
        this.isDrawPolygon = false;
        makeAutoObservable(this);
    }

    setActiveTool = (id: number) => {
        //find current active, deactivate
        this.drawingTools.forEach((item, idx, arr) => {
            if(item.active){
                arr[idx].active = false;
            } else if (!item.active && item.id === id){
                arr[idx].active = true;
            }
        })
    }

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