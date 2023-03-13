import { Polygon } from './Polygon';
import { InstrumentsId } from 'shared/types';
import { Line } from './Line';
import { SceneModifier } from 'three/services/SceneModifier';

export class DrawingToolFactory {
  constructor() {}

  getDrawingInstrument = (instrId: InstrumentsId, activeElement: HTMLCanvasElement, sceneModifier: SceneModifier) => {
    switch (instrId) {
      case InstrumentsId.LINE:
        return new Line(activeElement, 0, sceneModifier);
      case InstrumentsId.PLINE:
        return new Line(activeElement, 1, sceneModifier);
      case InstrumentsId.POLYGON:
        return new Polygon(activeElement, sceneModifier);
      default:
        return new Line(activeElement, 0, sceneModifier);
    }
  };
}
