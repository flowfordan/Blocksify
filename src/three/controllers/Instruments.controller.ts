import { SceneModifier } from 'three/services/SceneModifier';
import { ILayer } from 'shared/types/layers';
import type { Instrument, InstrumentsId } from 'shared/types';
import { InstrumentsAdapter } from 'three/adapters';
import { autorun, reaction } from 'mobx';
import type { LayersModel, InstrumentsModel, InstrumentsHelpersModel } from 'three/shared';
import { SnapManager } from 'three/handlers';
import { LineInstrument, PolygonInstrument, SelectorInstrument } from 'three/handlers';

export class InstrumentsController {
  adapter: InstrumentsAdapter;
  helpersManager: {
    snapManager: SnapManager;
  } | null;

  instruments: {
    [K in InstrumentsId]?: LineInstrument | PolygonInstrument | SelectorInstrument;
  };
  // cleaner: Cleaner;
  currentToolId: InstrumentsId | undefined;

  currentCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  currentPlane: THREE.Plane;
  layersModel: LayersModel;
  instrumentsModel: InstrumentsModel;

  constructor(
    activeElement: HTMLCanvasElement,
    sceneModifier: SceneModifier,
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
    plane: THREE.Plane,
    layersModel: LayersModel,
    instrumentsModel: InstrumentsModel,
    instrumentsHelpersModel: InstrumentsHelpersModel
  ) {
    this.layersModel = layersModel;
    this.adapter = new InstrumentsAdapter(instrumentsModel);
    this.instrumentsModel = instrumentsModel;
    this.instruments = {
      line: new LineInstrument(activeElement, 0, sceneModifier, instrumentsHelpersModel),
      pLine: new LineInstrument(activeElement, 1, sceneModifier, instrumentsHelpersModel),
      polygon: new PolygonInstrument(activeElement, sceneModifier, instrumentsHelpersModel),
      selector: new SelectorInstrument(activeElement, sceneModifier, this.adapter),
      // cleaner: new Cleaner(sceneModifier),
    };
    //toolsData = {selector: {selectedObj: {...}, intersectedObj: {...} }}
    //top lvl
    this.currentToolId = undefined;
    this.helpersManager = null; //snapManager(MODEL)

    //ground
    //camera
    this.currentCamera = camera;
    this.currentPlane = plane;
    this._storeSubscribe();
  }

  //for 'top lvl instruments'
  //continous
  // activateInstrumentCont = (
  //   currentLayer: ILayer,
  //   groundPlane: THREE.Plane,
  //   camera: THREE.PerspectiveCamera | THREE.OrthographicCamera
  // ) => {
  //   let activeToolId: InstrumentsId | undefined;

  //   //STOP whatever is running
  //   //check if it is defined
  //   if (this.currentToolId !== undefined) {
  //     //find running tool
  //     //call stop() method
  //     const currentTool = this.instrumentsModel.instruments.find((i) => i.id === this.currentToolId);
  //     if (!currentTool) {
  //       throw new Error('No current tool found with this ID');
  //     }
  //     //stop and cleanup
  //     this.instruments[currentTool.id]?.stop();
  //     window.removeEventListener('keydown', this.onExit);
  //     document.body.style.cursor = 'auto';
  //     this.currentToolId = undefined;
  //   }

  //   //ACTIVATE new tool if needed
  //   //check if new tool should be activated
  //   //find active tool
  //   const activeTool = this.instrumentsModel.instruments.find((i) => i.isActive);
  //   if (activeTool) {
  //     activeToolId = activeTool.id;
  //     this.instruments[activeTool.id]?.start(camera, groundPlane, currentLayer);
  //     this.currentToolId = activeToolId;

  //     //cursor set
  //     document.body.style.cursor = activeTool.activeCursor;
  //     window.addEventListener('keydown', this.onExit);
  //   }
  // };

  startInstrCont = (
    instr: Instrument,
    currentLayer: ILayer,
    groundPlane: THREE.Plane,
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera
  ) => {
    this.instruments[instr.id]?.start(camera, groundPlane, currentLayer);
    document.body.style.cursor = instr.activeCursor;
    window.addEventListener('keydown', this.onExit);
  };

  stopInstrCont = (id: InstrumentsId) => {
    this.instruments[id]?.stop();
    document.body.style.cursor = 'auto';
  };

  onExit = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      const activeTool = this.instrumentsModel.instruments.find(
        (i) => i.isActive && i.activity === 'continous' && i.lvl === 'top'
      );
      if (activeTool) {
        this.adapter.toggleInstrumentActive(activeTool.id);
        window.removeEventListener('keydown', this.onExit);
      }
    }
  };

  updateCurrentCamera = (newCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera) => {
    //stop instr
    //adapter - stop instrument
    const activeInstr = this.instrumentsModel.instruments.find((i) => i.isActive && i.activity === 'continous');
    if (activeInstr) this.adapter.toggleInstrumentActive(activeInstr.id);
    //set camera
    this.currentCamera = newCamera;
  };

  //observe selector tool
  private _storeSubscribe = () => {
    //for cont instruments: draw, select
    reaction(
      () => this.instrumentsModel.instruments.find((i) => i.isActive && i.activity === 'continous'),
      (curActive, prevActive, reaction) => {
        if (prevActive) this.stopInstrCont(prevActive.id);
        if (curActive) {
          this.startInstrCont(curActive, this.layersModel.currentLayer, this.currentPlane, this.currentCamera);
        }
      }
    );

    //LAYER SWAP REACTION
    reaction(
      () => {
        return this.layersModel.layers.find((l) => l.active);
      },
      (layer, previousLayer, reaction) => {
        if (!layer) return;
        //DISABLE TOOLS DEPENDING ON LAYER PROPERTIES
        const disabledInstruments = layer._disabledInstruments;
        //iterate instruments
        this.instrumentsModel.instruments.forEach((i, idx) => {
          if (i.lvl !== 'top') return;
          if (disabledInstruments.includes(i.id)) {
            this.adapter.setInstrumentAvailable(i.id, false);
          } else this.adapter.setInstrumentAvailable(i.id, true);
        });
        //STOP TOOL WHEN LAYER CHANGED
        if (!previousLayer) return;
        if (layer._id !== previousLayer._id) {
          const activeTool = this.instrumentsModel.instruments.find((i) => i.isActive && i.activity === 'continous');
          if (!activeTool) return;
          this.adapter.toggleInstrumentActive(activeTool.id);
        }
      }
    );
  };
}
