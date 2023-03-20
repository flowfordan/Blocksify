import { SceneModifier } from 'three/services/SceneModifier';
import { FXBuilder } from './FXBuilder';
import * as THREE from 'three';
import { ObjBuilder } from './ObjBuilder';

import { Vector2, Vector3 } from 'three';
import { Layer } from '../../shared/types/layers';

//objs handler
//stores objs created
//commands to render

export class Handler {
  objBuilder: ObjBuilder; //actual main objects
  fxBuilder: FXBuilder; //temporal effect-objects
  sceneModifier: SceneModifier;

  constructor(modifier: SceneModifier) {
    this.objBuilder = new ObjBuilder();
    this.fxBuilder = new FXBuilder();
    this.sceneModifier = modifier;
    //generator
  }

  //_____________
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
      this.sceneModifier.addObj(this.objBuilder.objCreated);
    }
  };

  removeObj = () => {
    this.sceneModifier.removeObj(this.objBuilder.objCreated);
  };

  reset = () => {
    //confirm obj adding to scene
    //check layer emptiness
    this.objBuilder.reset();
    this.removeTemp();
  };

  //_____________
  //TRACK OBJECTS SHOWING REAL TIME MOVING
  createTrack = (isPolygon?: boolean) => {
    this.fxBuilder.initTrack(isPolygon);
  };

  updTrack = (coords: Array<number>) => {
    this.fxBuilder.updTrack(coords);
  };

  updTrackPolygon = (pt1: Vector2, pt2: Vector2, pointerCoords: Vector3) => {
    //remove track poly
    this.sceneModifier.removeObj(this.fxBuilder.trackObjs.polygon.form);
    this.fxBuilder.updTrackPolygon(pt1, pt2, pointerCoords);
  };

  renderTrack = (isPolygon = false) => {
    if (isPolygon) {
      this.sceneModifier.addObj(this.fxBuilder.trackObjs.polygon.form);
    }
    this.sceneModifier.addObj(this.fxBuilder.trackObjs.line.form);
  };

  removeTrack = () => {
    this.sceneModifier.removeObj(this.fxBuilder.trackObjs.line.form);
    this.sceneModifier.removeObj(this.fxBuilder.trackObjs.polygon.form);
  };

  //_____________
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
    this.sceneModifier.addObj(this.fxBuilder.tempObjs.line.form);
    if (isPolygon) {
      this.sceneModifier.addObj(this.fxBuilder.tempObjs.polygon.form);
    }
  };

  private removeTemp = () => {
    this.sceneModifier.removeObj(this.fxBuilder.tempObjs.line.form);
    this.sceneModifier.removeObj(this.fxBuilder.tempObjs.polygon.form);
  };

  //_____________
  //OVERLAY OBJECTS (Selection)
  createOverlayObj = (baseObj: THREE.Object3D<THREE.Event> | undefined, type: 'temp' | 'perm') => {
    if (baseObj) {
      this.fxBuilder.initOverlayObj(baseObj, type);
      this.renderOverlayObj(type);
    }
  };

  private renderOverlayObj = (type: 'temp' | 'perm') => {
    if (type === 'temp') {
      this.sceneModifier.addObj(this.fxBuilder.overlayObjTemp.form);
    } else {
      this.sceneModifier.addObj(this.fxBuilder.overlayObjPerm.form);
    }
  };

  removeOverlayObj = (type: 'temp' | 'perm' | 'all') => {
    if (type === 'temp') {
      this.sceneModifier.removeObj(this.fxBuilder.overlayObjTemp.form);
    } else if (type === 'perm') {
      this.sceneModifier.removeObj(this.fxBuilder.overlayObjPerm.form);
    } else {
      this.sceneModifier.removeObj(this.fxBuilder.overlayObjTemp.form);
      this.sceneModifier.removeObj(this.fxBuilder.overlayObjPerm.form);
    }
  };
}
