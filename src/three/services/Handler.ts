import { SceneController } from '../controllers/Scene.controller';
import { FXBuilder } from './FXBuilder';
import * as THREE from 'three';
import { getLineMat, getPolygonMat, I3dObjLine, I3dObjPoint, I3dObjPolygon, pMat } from '../objs3d';
import { ObjBuilder } from './ObjBuilder';
import { Layer } from '../../shared/model';
import { Vector2, Vector3 } from 'three';

//objs handler
//stores objs created
//commands to render

export class Handler {
  objBuilder: ObjBuilder; //actual main objects
  fxBuilder: FXBuilder; //temporal effect-objects
  sceneController: SceneController;

  constructor(sceneController: SceneController) {
    this.objBuilder = new ObjBuilder();
    this.fxBuilder = new FXBuilder();
    this.sceneController = sceneController;
    //generator
  }

  //OBJECTS
  createObj = (
    type: 'line' | 'polygon',
    objCoords: Array<number>,
    currentLayer: Layer,
    currentPointerCoords?: Vector3
  ) => {
    if (type === 'line') {
      this.objBuilder.createLine(objCoords, currentLayer);
      //create temp
      this.createTemp();
    } else if (type === 'polygon' && currentPointerCoords) {
      //
      this.objBuilder.createPolygon(objCoords, currentLayer, currentPointerCoords);
      this.createTemp(true);
    }
  };

  getObjPolygonPoints = (): Array<THREE.Vector2> => {
    //
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
      this.sceneController.addObj(this.objBuilder.objCreated);
    }
  };

  removeObj = () => {
    this.sceneController.removeObj(this.objBuilder.objCreated);
  };

  reset = () => {
    //confirm obj adding to scene
    //check layer emptiness
    this.objBuilder.reset();
    this.removeTemp();
  };

  //TRACK OBJECTS SHOWING REAL TIME MOVING
  createTrack = (isPolygon?: boolean) => {
    this.fxBuilder.initTrack(isPolygon);
  };

  updTrack = (coords: Array<number>) => {
    this.fxBuilder.updTrack(coords);
  };

  updTrackPolygon = (pt1: Vector2, pt2: Vector2, pointerCoords: Vector3) => {
    //remove track poly
    this.sceneController.removeObj(this.fxBuilder.trackObjs.polygon.form);
    this.fxBuilder.updTrackPolygon(pt1, pt2, pointerCoords);
  };

  renderTrack = (isPolygon = false) => {
    if (isPolygon) {
      this.sceneController.addObj(this.fxBuilder.trackObjs.polygon.form);
    }
    this.sceneController.addObj(this.fxBuilder.trackObjs.line.form);
  };

  removeTrack = () => {
    this.sceneController.removeObj(this.fxBuilder.trackObjs.line.form);
    this.sceneController.removeObj(this.fxBuilder.trackObjs.polygon.form);
  };

  //TEMP OBJECT SHOWING FUTURE RESULT OF TOOL
  private createTemp = (isPolygon?: boolean) => {
    this.fxBuilder.initTemp(this.objBuilder.objParts.line);
    if (isPolygon) {
      this.fxBuilder.initTemp(this.objBuilder.objParts.polygon, isPolygon);
    }
  };

  private updTemp = (type: 'pline' | 'polygon') => {
    this.removeTemp();
    //upd LINE pt
    this.fxBuilder.tempObjs.line.form = this.objBuilder.objParts.line.form.clone();
    this.fxBuilder.tempObjs.line.form.name = 'temp';
    if (type === 'polygon') {
      //POLYGON pt
      this.fxBuilder.tempObjs.polygon.form = this.objBuilder.objParts.polygon.form.clone();
      this.fxBuilder.tempObjs.polygon.form.name = 'temp';
    }
    const isPolygon = type === 'polygon' ? true : false;
    this.renderTemp(isPolygon);
  };

  private renderTemp = (isPolygon?: boolean) => {
    this.sceneController.addObj(this.fxBuilder.tempObjs.line.form);
    if (isPolygon) {
      this.sceneController.addObj(this.fxBuilder.tempObjs.polygon.form);
    }
  };

  private removeTemp = () => {
    this.sceneController.removeObj(this.fxBuilder.tempObjs.line.form);
    this.sceneController.removeObj(this.fxBuilder.tempObjs.polygon.form);
  };
}
