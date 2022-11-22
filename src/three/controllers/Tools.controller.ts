import { Layer, ToolName, toolsState } from '../../state';
import { HelpersManager } from '../helpers/HelpersManager';
import { Line } from '../tools/Line';
import { Polygon } from '../tools/Polygon';
import { Selector } from '../tools/Selector';

export class ToolsController {
  //
  helpersManager: HelpersManager;

  tools: {
    [key in ToolName]: Line | Polygon | Selector;
    // line: Line,
    // pLine: Line,
    // polygon: Polygon
  };
  currentTool: number | undefined;
  constructor(scene: THREE.Scene, activeElement: HTMLCanvasElement) {
    //
    this.tools = {
      line: new Line(activeElement, scene, 0),
      pLine: new Line(activeElement, scene, 1),
      polygon: new Polygon(activeElement, scene),
      selector: new Selector(),
    };
    this.currentTool = undefined;
    this.helpersManager = new HelpersManager(scene);
  }

  //TODO: rewrite without many ifs elses
  setActiveTool = (
    currentLayer: Layer | null,
    groundPlane: THREE.Plane,
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera
  ) => {
    const activeToolId = toolsState.tools.find((i) => i.active)
      ? toolsState.tools.find((i) => i.active)!.id
      : undefined;

    const prevToolId = this.currentTool;
    let prevToolName;
    console.log('PREV TOOL', prevToolId, 'CURRENT', this.currentTool);

    //if there was tool in use - stop it
    if (typeof prevToolId === 'number') {
      console.log('error');
      prevToolName = toolsState.tools.find((i) => i.id === prevToolId)!.name;
      this.tools[prevToolName].stop();
    }

    //activate new tool
    if (typeof activeToolId === 'number') {
      console.log(activeToolId, 'LAYER', currentLayer);
      const toolName = toolsState.tools.find((i) => i.active)!.name;

      this.tools[toolName].start(camera, groundPlane, currentLayer!);
      this.currentTool = activeToolId;

      window.addEventListener('keydown', this.onExit);

      document.body.style.cursor = this.tools[toolName].cursor;
    } else {
      // if(typeof prevToolId === 'number'){
      this.currentTool = undefined;
      window.removeEventListener('keydown', this.onExit);

      document.body.style.cursor = 'auto';
    }
  };

  onExit = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      const activeToolId = toolsState.tools.find((i) => i.active)
        ? toolsState.tools.find((i) => i.active)!.id
        : undefined;

      if (typeof activeToolId === 'number') {
        const toolName = toolsState.tools.find((i) => i.active)!.name;
        this.tools[toolName].stop();
        this.tools[toolName].toolState = 0;
        this.currentTool = undefined;

        toolsState.setActiveTool(activeToolId);

        window.removeEventListener('keydown', this.onExit);
      }
    }
  };
}
