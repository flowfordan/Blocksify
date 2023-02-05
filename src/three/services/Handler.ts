import { SceneController } from '../controllers/Scene.controller';
import { FXBuilder } from './FXBuilder';
import * as THREE from 'three';
import { getLineMat, getPolygonMat, I3dObjLine, I3dObjPoint, I3dObjPolygon, pMat } from '../objs3d';
import { ObjBuilder } from './ObjBuilder';
import { Layer } from '../../state';
import { Vector3 } from 'three';

//objs handler
//stores objs created
//commands to render

export class Handler {
  objBuilder: ObjBuilder;
  fxBuilder: FXBuilder;
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
    } else if (type === 'polygon' && currentPointerCoords) {
      //
      this.objBuilder.createPolygon(objCoords, currentLayer, currentPointerCoords);
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
    } else if (type === 'polygon' && currentPointerCoords) {
      this.objBuilder.updatePolygon(objCoords, currentPointerCoords);
    }
  };

  renderObj = () => {
    //get current from objBuilder
    //call scene controller
    //generate auto-objects
    //this.generator.generateAutoObject
    this.sceneController.addObj(this.objBuilder.objCreated);
  };

  removeObj = () => {
    this.sceneController.removeObj(this.objBuilder.objCreated);
  };

  reset = () => {
    //confirm obj adding to scene
    //check layer emptiness
    this.objBuilder.reset();
  };

  //TRACK OBJECTS
  createTrack = (isPolygon?: boolean) => {
    //
    this.fxBuilder.initTrack(isPolygon);
  };

  updTrack = (coords: Array<number>) => {
    //
    this.fxBuilder.updTrack(coords);
  };

  renderTrack = (isPolygon = false) => {
    //
    if (isPolygon) {
      this.sceneController.addObj(this.fxBuilder.trackObjs.polygon.form);
    }
    this.sceneController.addObj(this.fxBuilder.trackObjs.line.form);
  };

  removeTrack = (isPolygon = false) => {
    //
    if (isPolygon) {
      this.sceneController.removeObj(this.fxBuilder.trackObjs.polygon.form);
    }
    this.sceneController.removeObj(this.fxBuilder.trackObjs.line.form);
  };
}
