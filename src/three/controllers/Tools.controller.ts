import { SceneModifier } from 'three/services/SceneModifier';
import { HelpersManager } from '../helpers/HelpersManager';
import { Line } from '../tools/Line';
import { Polygon } from '../tools/Polygon';
import { Selector } from '../tools/Selector';
import { Cleaner } from '../tools/Cleaner';
import { InstrumentsAcceptor } from 'three/acceptors/InstrumentsAcceptor';
import { instrumentsState, ToolName } from 'shared/model';
import { Layer } from 'shared/types/layers';

export class ToolsController {
  acceptor: InstrumentsAcceptor;
  helpersManager: HelpersManager;

  tools: {
    [key in ToolName]: Line | Polygon | Selector | Cleaner;
  };
  // cleaner: Cleaner;
  currentToolId: number | undefined;

  constructor(activeElement: HTMLCanvasElement, sceneModifier: SceneModifier) {
    this.acceptor = new InstrumentsAcceptor();
    this.tools = {
      line: new Line(activeElement, 0, sceneModifier),
      pLine: new Line(activeElement, 1, sceneModifier),
      polygon: new Polygon(activeElement, sceneModifier),
      selector: new Selector(activeElement, sceneModifier, this.acceptor),
      cleaner: new Cleaner(sceneModifier.scene),
    };
    //toolsData = {selector: {selectedObj: {...}, intersectedObj: {...} }}
    this.currentToolId = undefined;
    this.helpersManager = new HelpersManager(sceneModifier.scene);
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
}
