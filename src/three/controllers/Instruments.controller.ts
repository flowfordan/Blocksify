import { DrawObjModel } from './../../features/sceneObj/model/drawObjModel';
import { SceneModifier } from 'three/services/SceneModifier';
import { HelpersManager } from '../helpers/HelpersManager';
import { Line } from '../tools/Line';
import { Polygon } from '../tools/Polygon';
import { Selector } from '../tools/Selector';
import { Cleaner } from '../tools/Cleaner';
import { instrumentsState, layersState, ToolName } from 'shared/model';
import { Layer } from 'shared/types/layers';
import { InstrumentsMediator } from 'three/mediators';
import { autorun, reaction } from 'mobx';

export class InstrumentsController {
  mediator: InstrumentsMediator;
  helpersManager: HelpersManager;

  tools: {
    [key in ToolName]: Line | Polygon | Selector | Cleaner;
  };
  // cleaner: Cleaner;
  currentToolId: number | undefined;

  currentCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  currentPlane: THREE.Plane;

  //TEST
  // drawModel: DrawObjModel;

  constructor(
    activeElement: HTMLCanvasElement,
    sceneModifier: SceneModifier,
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
    plane: THREE.Plane
  ) {
    this.mediator = new InstrumentsMediator();
    this.tools = {
      line: new Line(activeElement, 0, sceneModifier),
      pLine: new Line(activeElement, 1, sceneModifier),
      polygon: new Polygon(activeElement, sceneModifier),
      selector: new Selector(activeElement, sceneModifier, this.mediator),
      cleaner: new Cleaner(sceneModifier.scene),
    };
    //toolsData = {selector: {selectedObj: {...}, intersectedObj: {...} }}
    this.currentToolId = undefined;
    this.helpersManager = new HelpersManager(sceneModifier.scene);

    //ground
    //camera
    this.currentCamera = camera;
    this.currentPlane = plane;
    //test
    // this.drawModel = drawModel;
    //subscribe to state changes
    this._storeSubscribe();
  }

  setActiveTool = (
    currentLayer: Layer,
    groundPlane: THREE.Plane,
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera
  ) => {
    let activeToolId: number | undefined;

    //STOP whatever is running
    //check if it is defined
    if (this.currentToolId !== undefined) {
      //find running tool
      //call stop() method
      const currentTool = instrumentsState.tools.find((i) => i.id === this.currentToolId);
      if (!currentTool) {
        throw new Error('No current tool found with this ID');
      }
      //stop and cleanup
      this.tools[currentTool.name].stop();
      window.removeEventListener('keydown', this.onExit);
      document.body.style.cursor = 'auto';
      this.currentToolId = undefined;
    }

    //ACTIVATE new tool if needed
    //check if new tool should be activated
    //find active tool
    const activeTool = instrumentsState.tools.find((i) => i.active);
    if (activeTool) {
      activeToolId = activeTool.id;
      this.tools[activeTool.name].start(camera, groundPlane, currentLayer);
      this.currentToolId = activeToolId;

      //cursor set
      document.body.style.cursor = activeTool.cursorType;
      window.addEventListener('keydown', this.onExit);
    }

    console.log('CURRENT TOOL ID:', this.currentToolId);
    //TEST
    // this.drawModel.setActiveDrawingTool(2);
  };

  onExit = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      const activeTool = instrumentsState.tools.find((i) => i.active);

      if (activeTool) {
        instrumentsState.setActiveTool(activeTool.id);
        window.removeEventListener('keydown', this.onExit);
      }
    }
  };

  //observe selector tool
  private _storeSubscribe = () => {
    //TOOL CHANGE
    autorun(() => {
      this.setActiveTool(layersState.currentLayer, this.currentPlane, this.currentCamera);
    });

    //STOP TOOL IF LAYER SWAP WHILE TOOL ACTIVE
    reaction(
      () => layersState.layers.find((l) => l.active),
      (layer, previousLayer, reaction) => {
        const activeTool = instrumentsState.tools.find((i) => i.active);
        if (layer?.id !== previousLayer?.id && activeTool) {
          console.log('WHAT ARE YOU2');
          instrumentsState.setActiveTool(activeTool.id);
        }
      }
    );

    //TODO concrete conditions
    //TODO is this place for grid render?
    //Rerender grid when its size changed
    autorun(() => {
      this.helpersManager.renderGrid();
    });
  };
}
