import { SceneController } from './../controllers/Scene.controller';
import { FXBuilder } from './FXBuilder';
import * as THREE from 'three';
import { getLineMat, getPolygonMat, I3dObjLine, I3dObjPoint, I3dObjPolygon, pMat } from '../objs3d';
import { ObjBuilder } from './ObjBuilder';
import { Layer } from '../../state';

//objs handler
//stores objs created
//commands to render

export class Builder {
  objBuilder: ObjBuilder;
  fxBuilder: FXBuilder;
  sceneController: SceneController;

  constructor(sceneController: SceneController) {
    this.objBuilder = new ObjBuilder();
    this.fxBuilder = new FXBuilder();
    this.sceneController = sceneController;
  }

  //OBJECTS

  createObj = (type: 'line' | 'polygon', objCoords: Array<number>, currentLayer: Layer) => {
    if (type === 'line') {
      this.objBuilder.createLine(objCoords, currentLayer);
    }
  };

  updObj = (type: 'line' | 'pline' | 'polygon', objCoords: Array<number>) => {
    if (type === 'line') {
      this.objBuilder.updateLine(0, objCoords);
    } else if (type === 'pline') {
      this.objBuilder.updateLine(1, objCoords);
    } else {
      //polygon
    }
  };

  renderObj = () => {
    //get current from objBuilder
    //call scene controller
    this.sceneController.addObj(this.objBuilder.objCreated);
  };

  removeObj = () => {
    this.sceneController.removeObj(this.objBuilder.objCreated);
  };

  reset = () => {
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
