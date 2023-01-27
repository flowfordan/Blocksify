import { SceneController } from './Scene.controller';
import { Layer, ToolName, instrumentsState } from '../../state';
import { HelpersManager } from '../helpers/HelpersManager';
import { Line } from '../tools/Line';
import { Polygon } from '../tools/Polygon';
import { Selector } from '../tools/Selector';
import { Cleaner } from '../tools/Cleaner';

export class ToolsController {
  //
  helpersManager: HelpersManager;

  tools: {
    [key in ToolName]: Line | Polygon | Selector | Cleaner;
  };
  // cleaner: Cleaner;
  currentToolId: number | undefined;

  constructor(scene: THREE.Scene, activeElement: HTMLCanvasElement, sceneController: SceneController) {
    this.tools = {
      line: new Line(activeElement, scene, 0, sceneController),
      pLine: new Line(activeElement, scene, 1, sceneController),
      polygon: new Polygon(activeElement, scene, sceneController),
      selector: new Selector(activeElement, scene),
      cleaner: new Cleaner(scene),
    };
    //builder = new Builder(sceneController)
    this.currentToolId = undefined;
    this.helpersManager = new HelpersManager(scene);
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
}
