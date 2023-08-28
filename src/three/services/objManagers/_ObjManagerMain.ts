import { ILayer } from 'shared/types';
import { Vector3, Vector2 } from 'three';
import { ObjBuilder } from '../ObjBuilder';
import { SceneModifier } from '../SceneModifier';
import { ObjManagerCommon } from './ObjManagerCommon';

export class _ObjManagerMain implements ObjManagerCommon {
  objBuilder: ObjBuilder; //actual main objects
  //fxBuilder: FXBuilder; //temporal effect-objects
  sceneModifier: SceneModifier;

  constructor(modifier: SceneModifier) {
    this.objBuilder = new ObjBuilder();
    //this.fxBuilder = new FXBuilder();
    this.sceneModifier = modifier;
    //generator
  }

  //_____________
  //OBJECTS
  createObj = (
    type: 'line' | 'polygon',
    objCoords: Array<number>,
    currentLayer: ILayer,
    currentPointerCoords?: Vector3
  ) => {
    if (type === 'line') {
      this.objBuilder.createLine(objCoords, currentLayer);
      //create temp
      this.createTemp();
    } else if (type === 'polygon' && currentPointerCoords) {
      this.objBuilder.createPolygon(objCoords, currentLayer, currentPointerCoords);
      this.createTemp(true);
    }
  };

  getObjPolygonPoints = (): Array<THREE.Vector2> => {
    if (!this.objBuilder.objParts.polygon.geom) {
      throw new Error('No current Polygon was created');
    }
    return this.objBuilder.objParts.polygon.geom.getPoints();
  };

  updObj = (type: 'line' | 'pline' | 'polygon', objCoords: Array<number>, currentPointerCoords?: THREE.Vector3) => {
    if (type === 'line') {
      this.objBuilder.updateLine(0, objCoords);
    } else if (type === 'pline') {
      this.objBuilder.updateLine(1, objCoords);
      //upd temp
      this.updTemp('pline');
    } else if (type === 'polygon' && currentPointerCoords) {
      this.objBuilder.updatePolygon(objCoords, currentPointerCoords);
      //upd temp
      this.updTemp('polygon');
    }
  };

  renderObj = () => {
    //get current from objBuilder
    //call scene controller
    //generate auto-objects
    //this.generator.generateAutoObject
    if (this.objBuilder.isRenderable) {
      // console.log('_ObjManagerMain, renderObj:', this.objBuilder.objMain);
      //this.objMain
      // this.sceneModifier.addObj(this.objBuilder.objCreated);
      this.sceneModifier.addObj(this.objBuilder.objMain);
    }
  };

  removeObj = () => {
    // this.sceneModifier.removeObj(this.objBuilder.objCreated);
    this.sceneModifier.removeObj(this.objBuilder.objMain);
  };

  reset = () => {
    //confirm obj adding to scene
    //check layer emptiness
    this.objBuilder.reset();
    this.removeTemp();
  };

  //_____________
  //TEMP OBJECT SHOWING FUTURE RESULT OF TOOL
  private createTemp = (isPolygon?: boolean) => {
    this.objBuilder.initTemp(this.objBuilder.objParts.line);
    if (isPolygon) {
      this.objBuilder.initTemp(this.objBuilder.objParts.polygon, isPolygon);
    }
  };

  private updTemp = (type: 'pline' | 'polygon') => {
    this.removeTemp();
    //upd LINE pt
    this.objBuilder.tempObjs.line.form = this.objBuilder.objParts.line.form.clone();
    this.objBuilder.tempObjs.line.form.name = 'temp';
    if (type === 'polygon') {
      //POLYGON pt
      this.objBuilder.tempObjs.polygon.form = this.objBuilder.objParts.polygon.form.clone();
      this.objBuilder.tempObjs.polygon.form.name = 'temp';
    }
    const isPolygon = type === 'polygon' ? true : false;
    this.renderTemp(isPolygon);
  };

  private renderTemp = (isPolygon?: boolean) => {
    this.sceneModifier.addObj(this.objBuilder.tempObjs.line.form);
    if (isPolygon) {
      this.sceneModifier.addObj(this.objBuilder.tempObjs.polygon.form);
    }
  };

  private removeTemp = () => {
    this.sceneModifier.removeObj(this.objBuilder.tempObjs.line.form);
    this.sceneModifier.removeObj(this.objBuilder.tempObjs.polygon.form);
  };
}
