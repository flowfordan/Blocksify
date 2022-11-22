import { AnglePts, createBaseV3s } from '../three/helpers/createBaseV3s';
import { makeAutoObservable, toJS } from 'mobx';
import { Vector3 } from 'three';
import { helpersDefPreset } from './presets/helpersPreset';

//Drawing Tool
//Selection Tool

export enum ToolName {
  Line = 'line',
  PLine = 'pLine',
  Polygon = 'polygon',
  Selector = 'selector',
}

interface ITool {
  id: number;
  name: ToolName;
  active: boolean;
  type: 'draw' | 'select';
}

interface ISelectionTool {
  id: number;
  name: 'selection';
  active: boolean;
}

type HelperType = 'snap' | 'grid';

type SnapType = 'step' | 'grid' | 'angle';

interface HelperOption {
  helperID: number;
  type: HelperType;
  name: string;
  isActive: boolean;
  value: number;
  valueName: string;
  isRange: boolean;
  rangeMin: number;
  rangeMax: number;
  rangeStep: number;
  isSelection: boolean;
  variants?: Array<number>; //possible variants
  numbers: Array<number>; //selected numbers
}

type HelperOptions = Array<HelperOption>;

type SnapStatus = { isActive: boolean; snappedCoords: Vector3; distToOrigin: number; isCurrent: boolean };

type SnapOptions = {
  [I in SnapType]: SnapStatus;
};

type HelpersActivity = {
  [id: number]: boolean;
};

class ToolsState {
  //currentTool
  //name
  //id
  //type
  //stage
  //0, 1, 2, 3

  tools: Array<ITool>;
  selectionTool: ISelectionTool;

  anglesSnapV3s: AnglePts;

  helpersOptions: HelperOptions;
  isHelpersActive: HelpersActivity | null;

  constructor() {
    /* TOOLS */
    this.tools = [
      { id: 0, name: ToolName.Line, active: false, type: 'draw' },
      { id: 1, name: ToolName.PLine, active: false, type: 'draw' },
      { id: 2, name: ToolName.Polygon, active: false, type: 'draw' },
      { id: 3, name: ToolName.Selector, active: false, type: 'select' },
    ];

    this.selectionTool = { id: 0, name: 'selection', active: false };

    /* HELPERS */
    this.helpersOptions = helpersDefPreset as HelperOptions;
    this.isHelpersActive = null;

    this.anglesSnapV3s = createBaseV3s(this.helpersOptions[1].numbers);

    this._updHelpersActivity();

    makeAutoObservable(this);
  }

  //activating defined Tool and deact other Tools
  setActiveTool = (id: number) => {
    //find current active, deactivate
    this.tools.forEach((item, idx, arr) => {
      if (item.active) {
        arr[idx].active = false;
      } else if (!item.active && item.id === id) {
        arr[idx].active = true;
      }
    });
  };

  //toggle activity of Helper
  toggleHelperActive = (id: number) => {
    const item = this.helpersOptions.find((i) => i.helperID === id);
    if (item) {
      const idx = this.helpersOptions.indexOf(item);
      this.helpersOptions[idx].isActive = !this.helpersOptions[idx].isActive;

      this._updHelpersActivity(item.helperID);
    }
  };

  //set VALUE for concrete numeric option (grid size, step snap val etc)
  setHelperValue = (id: number, value: number) => {
    //find helper by id
    const item = this.helpersOptions.find((i) => i.helperID === id);
    if (item) {
      const idx = this.helpersOptions.indexOf(item);
      this.helpersOptions[idx].value = value;
    }
  };

  //set VALUES for option with mult. variants (angles snap)
  setValuesCollection = (id: number, value: number, include?: boolean) => {
    const helper = this.helpersOptions.find((i) => i.helperID === id);
    if (!helper) {
      return;
    }
    const idx = this.helpersOptions.indexOf(helper);
    const isIncluded = this.helpersOptions[idx].numbers.includes(value);
    if (isIncluded) {
      const numIdx = this.helpersOptions[idx].numbers.indexOf(value);
      if (numIdx > -1) {
        this.helpersOptions[idx].numbers.splice(numIdx, 1);
      }
    } else {
      this.helpersOptions[idx].numbers.push(value);
    }
    console.log(toJS(this.helpersOptions[idx].numbers));
    this.anglesSnapV3s = createBaseV3s(this.helpersOptions[idx].numbers);
  };

  //TODO define
  private _updHelpersActivity = (id?: number) => {
    //upd exist value in exist obj
    if (id && this.isHelpersActive) {
      if (this.isHelpersActive) {
        this.isHelpersActive[id] = !this.isHelpersActive[id];
      }
    }
    //construct new obj if no id provided and no obj
    //create obj ID:isActive
    else {
      const obj: HelpersActivity = {};
      for (const item of this.helpersOptions) {
        obj[item.helperID] = item.isActive;
      }
      this.isHelpersActive = obj;
    }
  };
}

const toolsState = new ToolsState();

export { toolsState };
export type { HelperOptions, SnapOptions, SnapType, SnapStatus, HelperOption };
