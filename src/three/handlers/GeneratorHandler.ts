import { ILayerIDs } from 'shared/types';
import { GeneratorAdapter } from 'three/adapters/GeneratorAdapter';
import { adaptersModel } from 'three/model';
import { addObjParallelLines } from './getParallelLine';
import { Line, Point, Polygon, recursivePolygonCut } from 'three/lib/polygons';
import { getObjBasicPoints, getPointsSegmentPointsArray, getPtPointsObjects } from 'shared/types/objs';
import { removeZeroesFrom3SizeCooords } from 'three/lib/lines';
import { toJS } from 'mobx';
/* 
  Service for checking conditions for real-time objects generation (like on adding or changing scene objs)
  calls GenerationAdapter which connects to global state
*/

export class GeneratorHandler {
  generatorAdapter: GeneratorAdapter;
  constructor() {
    this.generatorAdapter = new GeneratorAdapter();
  }
  // generate() {
  //     return this.generator.generate();
  // }

  createParallelLines(obj: THREE.Object3D, layerId: ILayerIDs) {
    //get layer config
    const data = toJS(this.generatorAdapter.getLayerConfigAddData(layerId));
    addObjParallelLines(obj, layerId, data);
    this.generatorAdapter.endTask();
  }

  createBlocksFromBoundaries(blocksLayerId: string, border: string, edges: string) {
    // recursivePolygonCut();
    //get boundaries/ create from borders + roads
    //add to blocks layer
  }

  createBlocksFromAreaAndRoads(area: Array<THREE.Object3D>, roads: Array<THREE.Object3D>) {
    //TODO change only affected parts
    const borderObj = area[0];
    if (!borderObj) throw new Error('Generator Handler: No border object found');
    const borderRawPoints = removeZeroesFrom3SizeCooords(getObjBasicPoints(borderObj));
    const borderPoints: Array<Point> = [];
    for (let i = 0; i < borderRawPoints.length; i += 2) {
      if (i === borderRawPoints.length - 1) break;
      //create points
      borderPoints.push(new Point(borderRawPoints[i], borderRawPoints[i + 1]));
    }
    //iterate points to create Polygon
    const borderPolygon = new Polygon(borderPoints);
    //get points from each road
    const points2d: Array<Array<number>> = [];
    roads.forEach((road) => {
      const pointsSegments = getPtPointsObjects(road);
      //[[x, 0, y], [x, 0, y]]
      const points3d = pointsSegments.map((s) => {
        return getPointsSegmentPointsArray(s);
      });
      const points = points3d.map((p) => {
        return removeZeroesFrom3SizeCooords(p);
      });
      points.forEach((p) => {
        points2d.push(p);
      });
    });
    const lines: Array<Line> = [];
    points2d.forEach((p) => {
      //[0,1,2,3]
      const line = new Line(new Point(p[0], p[1]), new Point(p[2], p[3]));
      lines.push(line);
    });

    //each road main obj has main and secondary pts
    //secondary pt has pintsObj * 2
    //const a = new Polygon();
    //create Polygon from area
    //create array of lines from streets borders
    const result = recursivePolygonCut(borderPolygon, lines);
    return result;
  }

  //CHECK SELF
  //CHECK IMPACT
  //SET TASKS TO GENERATE

  //checkGenerationConditions
  //check what kind of action occured
  //checks obj layer config for fixed conditions
  //dynamic conditions (stage?)
  //generatorAdapter.getCurrentSceneStage()
}
