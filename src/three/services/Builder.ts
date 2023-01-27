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

  createObj = (type: 'line' | 'polygon', objCoords: Array<number>, currentLayer: Layer) => {
    //type of obj
    //get coords
    //get layer props (material)
    if (type === 'line') {
      //
      this.objBuilder.createLine(objCoords, currentLayer);
    }
  };

  updObj = (type: 'line' | 'pline' | 'polygon', objCoords: Array<number>) => {
    //
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

  //FXBuilder
  //tags end all temp renders
  //ObjsBuilder
  //objs to add to scene
  //createLine
  //createPolygon
  //render
  //removeCurrent
  //create trace obj
  //create tags
}
