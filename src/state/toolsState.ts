import { AnglePts, createBaseV3s } from '../three/helpers/createBaseV3s';
import { makeAutoObservable, toJS} from "mobx";
import { Vector3 } from 'three';
import { helpersDefPreset } from './presets/helpersPreset';

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

type HelperType = 'snap' | 'grid'

type SnapType = 'step' | 'grid' | 'angle'

interface HelperOption {
	helperID: number,
	type: HelperType,
	name: string,
	isActive: boolean,
	value: number,
	valueName: string,
	isRange: boolean,
	rangeMin: number,
	rangeMax: number,
	rangeStep: number,
	isSelection: boolean,
	variants?: Array<number>,
	numbers: Array<number>
}

type HelperOptions = Array<HelperOption>;

type SnapStatus = {isActive: boolean, snappedCoords: Vector3, distToOrigin: number}

type SnapOptions = {
	[I in SnapType]: SnapStatus;
}

type HelpersActivity = {
	[id: number]: boolean;
};

class ToolsState{

    drawingTools:Array<ITool>;

	allAnglesSnapV3s: AnglePts;
	currentAnglesSnapV3: AnglePts | null;
	angles: Array<number>;

	helpersOptions: HelperOptions;
	isHelpersActive: HelpersActivity | null;

    constructor(){
        this.drawingTools = [
            {id: 0, name: EToolName.Line, active: false},
            {id: 1, name: EToolName.PLine, active: false},
            {id: 2, name: EToolName.Polygon, active: false}
        ]

		/* HELPERS */
		this.helpersOptions = helpersDefPreset as HelperOptions;
		this.isHelpersActive = null;

		this.angles = [15];
		this.allAnglesSnapV3s = createBaseV3s(this.angles);
		this.currentAnglesSnapV3 = null;

		this._updHelpersActivity();

        makeAutoObservable(this);
    }

	//activating defined Tool and deact other Tools
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

	//toggle activity of Helper
	toggleHelperActive = (id: number) => {
		const item = this.helpersOptions.find(i => i.helperID === id);
		if(item){
			let idx = this.helpersOptions.indexOf(item);
			this.helpersOptions[idx].isActive = !this.helpersOptions[idx].isActive;

			this._updHelpersActivity(item.helperID);
		}
	}

	//set VALUE for concrete numeric option (grid size, step snap val etc)
	setHelperValue = (id: number, value: number) => {
		//find helper by id
		const item = this.helpersOptions.find(i => i.helperID === id);
		if(item){
			let idx = this.helpersOptions.indexOf(item);
			this.helpersOptions[idx].value = value
		}
	}

	//set VALUES for option with mult. variants (angles snap)
	setValuesCollection = (id:number, value: number, include: boolean) => {
		const item = this.helpersOptions.find(i => i.helperID === id);
		if(item){
			let idx = this.helpersOptions.indexOf(item);
			if(include){
				this.helpersOptions[idx].numbers.push(value);
			} else {
				const numIdx = this.helpersOptions[idx].numbers.indexOf(value);
				if(numIdx > -1){
					this.helpersOptions[idx].numbers.splice(numIdx, 1)
				}
			}
		}
	}

	//TODO define
	private _updHelpersActivity = (id?: number) => {
		//upd exist value in exist obj
		if (id && this.isHelpersActive) {
			if(this.isHelpersActive){
				this.isHelpersActive[id] = !this.isHelpersActive[id];
			}
		}
		//construct new obj if no id provided and no obj
		//create obj ID:isActive
		else {
			let obj: HelpersActivity = {};
			for(let item of this.helpersOptions){
				obj[item.helperID] = item.isActive
			}	
			this.isHelpersActive = obj;
		}	
	}
}

const toolsState = new ToolsState();

export {toolsState}
export type { HelperOptions, SnapOptions, SnapType, SnapStatus, HelperOption }