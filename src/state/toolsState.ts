import { AnglePts, constructBaseV3Variants } from './../three/helpers/constructBaseV3';
import { makeAutoObservable, toJS} from "mobx";

enum EToolName {
    Line = 'line',
    PLine = 'pLine',
    Polygon = 'polygon'
}

interface ITool {
    id: number,
    name: EToolName,
    active: boolean
}

class ToolsState{

    drawingTools:Array<ITool>;

	allAnglesSnapV3s: AnglePts;
	currentAnglesSnapV3: AnglePts | null;
	angles: Array<number>;

    constructor(){
        this.drawingTools = [
            {id: 0, name: EToolName.Line, active: false},
            {id: 1, name: EToolName.PLine, active: false},
            {id: 2, name: EToolName.Polygon, active: false}
        ]

		this.angles = [45];

		this.allAnglesSnapV3s = constructBaseV3Variants(this.angles);
		this.currentAnglesSnapV3 = null;

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
}

const toolsState = new ToolsState();

export {toolsState}