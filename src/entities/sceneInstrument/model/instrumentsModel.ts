import { makeAutoObservable } from 'mobx';

export type ToolNameTest = 'line' | 'pline' | 'polygon';

interface ToolData {
  id: number;
  name: ToolNameTest;
  icon: string;
  isActive: boolean;
}

class InstrumentsModel {
  drawingTools: Array<ToolData>;
  constructor() {
    this.drawingTools = [
      { id: 0, name: 'line', icon: 'lIcon', isActive: false },
      { id: 1, name: 'pline', icon: 'PLicon', isActive: false },
      { id: 2, name: 'polygon', icon: 'polIcon', isActive: false },
    ];

    makeAutoObservable(this);
  }

  getToolData = (toolName: ToolNameTest) => {
    const toolData = this.drawingTools.find((el) => {
      return el.name === toolName;
    });

    return toolData ? toolData : null;
  };

  toggleActiveTool = (tool: ToolNameTest) => {
    const toolData = this.drawingTools.find((el) => el.name === tool);
    if (toolData) {
      toolData.isActive = !toolData.isActive;
      console.log(toolData.isActive);
    }
  };
}

export const instrumentsModel = new InstrumentsModel();
