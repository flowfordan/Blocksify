import { Layer, toolsState } from '../../state';
import { HelpersManager } from '../helpers/HelpersManager';
import { Line } from '../tools/Line';
import { Polygon } from '../tools/Polygon';

export class ToolsController {
  //
  helpersManager: HelpersManager;

  tools: {
    line: Line,
    pLine: Line,
    polygon: Polygon
  };
  currentTool: number | undefined;
  constructor(scene: THREE.Scene, activeElement: HTMLCanvasElement){
    //
    this.tools = {
      line: new Line(activeElement, scene, 0),
      pLine: new Line(activeElement, scene, 1),
      polygon: new Polygon(activeElement, scene)
    };
    this.currentTool = undefined;
    this.helpersManager = new HelpersManager(scene);
  }

  //TODO: rewrite without many ifs elses
  setActiveDrawingTool = (currentLayer: Layer | null, groundPlane: THREE.Plane, camera: THREE.PerspectiveCamera | THREE.OrthographicCamera) => {
    const activeToolId = toolsState.drawingTools.find(i => i.active)?
        toolsState.drawingTools.find(i => i.active)!.id : undefined;

    const prevToolId = this.currentTool;
    let prevToolName;
    console.log('PREV TOOL', prevToolId, 'CURRENT', this.currentTool);

    //if there was tool in use - stop it
    if (typeof prevToolId === 'number'){
      console.log('error');
      prevToolName = toolsState.drawingTools.find(i => i.id === prevToolId)!.name;
      this.tools[prevToolName].stopDrawing();
    }

    //activate new tool
    if (typeof activeToolId === 'number'){
      console.log(activeToolId, 'LAYER', currentLayer);
      const toolName = toolsState.drawingTools.find(i => i.active)!.name;

      this.tools[toolName].startDrawing(camera, groundPlane, currentLayer!);
      this.currentTool = activeToolId;

      window.addEventListener('keydown', this.onExit);

      document.body.style.cursor = 'crosshair';
    } else {
      // if(typeof prevToolId === 'number'){
      this.currentTool = undefined;
      window.removeEventListener('keydown', this.onExit);

      document.body.style.cursor = 'auto';
    }
  };

  onExit = (event: KeyboardEvent) => {
    if (event.key === "Escape"){
      const activeToolId = toolsState.drawingTools.find(i => i.active)?
        toolsState.drawingTools.find(i => i.active)!.id : undefined;

      if (typeof activeToolId === 'number'){
        const toolName = toolsState.drawingTools.find(i => i.active)!.name;
        this.tools[toolName].stopDrawing();
        this.tools[toolName].toolState = 0;
        this.currentTool = undefined;

        toolsState.setActiveTool(activeToolId);

        window.removeEventListener('keydown', this.onExit);
      }
    }
  };
}