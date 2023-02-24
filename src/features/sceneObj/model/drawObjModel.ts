export class DrawObjModel {
  tool: number;
  constructor() {
    this.tool = 0;
  }

  setActiveDrawingTool = (id: number) => {
    console.warn('SET NEW TOOL TEST');
    this.tool = this.tool + id;
    console.warn('SET NEW TOOL TEST', this.tool);
  };
}

export const drawObjModel = new DrawObjModel();
