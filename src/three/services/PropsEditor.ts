import { toJS } from 'mobx';
import { ILayer } from '../../shared/types/layers';
import {
  ICommonObjData,
  IsObjDataOfObjLineSegment,
  IsObjDataOfObjMain,
  IsObjDataOfObjPolygonSegment,
  IsObjDataOfObjPrimPt,
  OBJ_GENERAL_TYPE,
  SpecificObjDomainPropName,
} from 'shared/types/objs';
import { Line2 } from 'three-fatline';
import { ShapeUtils, Vector2, Vector3 } from 'three';

export class PropsEditor {
  constructor() {
    //
  }

  setSegmentInitProperties = (
    obj: THREE.Object3D<THREE.Event>,
    segmentType: 'common' | 'point' | 'line' | 'polygon'
  ) => {
    switch (segmentType) {
      case 'common':
        const props: ICommonObjData<OBJ_GENERAL_TYPE.OBJ_SEGMENT> = {
          OBJ_GENERAL_TYPE: OBJ_GENERAL_TYPE.OBJ_SEGMENT,
        };
        obj.userData = Object.assign(props);
        break;
      case 'point':
        const propsPoint: ICommonObjData<OBJ_GENERAL_TYPE.OBJ_SEGMENT_POINT> = {
          OBJ_GENERAL_TYPE: OBJ_GENERAL_TYPE.OBJ_SEGMENT_POINT,
        };
        obj.userData = Object.assign(propsPoint);
        break;
      case 'line':
        const propsLine: ICommonObjData<OBJ_GENERAL_TYPE.OBJ_SEGMENT_LINE> = {
          OBJ_GENERAL_TYPE: OBJ_GENERAL_TYPE.OBJ_SEGMENT_LINE,
        };
        obj.userData = Object.assign(propsLine);
        break;
      case 'polygon':
        const propsPolygon: ICommonObjData<OBJ_GENERAL_TYPE.OBJ_SEGMENT_POLYGON> = {
          OBJ_GENERAL_TYPE: OBJ_GENERAL_TYPE.OBJ_SEGMENT_POLYGON,
        };
        obj.userData = Object.assign(propsPolygon);
        break;
    }
  };

  //setting properties to obj on creation
  setObjInitProperties = (
    obj: THREE.Object3D<THREE.Event>,
    objLayer: ILayer,
    objType: 'main' | 'pt_prim' | 'pt_second'
  ) => {
    if (objType === 'main') {
      const propertiesToSet = toJS(objLayer.objDefaultData);
      obj.userData = Object.assign(propertiesToSet);
      obj.name = propertiesToSet.objName.value;
    } else if (objType === 'pt_prim') {
      const propertiesToSet = toJS(objLayer.ptsData.main);
      obj.userData = Object.assign(propertiesToSet);
    } else if (objType === 'pt_second') {
      const propertiesToSet = toJS(objLayer.ptsData.add);
      obj.userData = Object.assign(propertiesToSet);
    }
  };

  //update auto calculated props
  updObjAutoProps = (obj: THREE.Object3D<THREE.Event>, layerId: number) => {
    //we get main obj
    const mainData = obj.userData;
    if (!IsObjDataOfObjMain(mainData)) return;
    //iterate its peoperties, find calculated
    for (const propKey in mainData) {
      //
      const propValue = mainData[propKey as keyof typeof mainData];
      if (typeof propValue === 'object') {
        if (propValue.editType !== 'calculated') continue;
        //calculate depend on propKey
        //TODO calc several calculated props
        // if (propKey === 'objArea') {
        //   //
        // } else if (propKey === 'objLength') {
        //   //
        // }
        const calcVal = this._tempCalcObjPhysProp(obj, propKey);
        if (calcVal) propValue.value = calcVal;
      }
    }
    //need to get prim_pt
    //check layer, find props that can be auto calculated
    //change props
  };

  //returns number now (length or area)
  private _tempCalcObjPhysProp = (obj: THREE.Object3D<THREE.Event>, label: string) => {
    //find children 1 - prim pt
    for (let i = 0; i < obj.children.length; i++) {
      if (IsObjDataOfObjPrimPt(obj.children[i].userData)) {
        const primPt = obj.children[i];
        for (let j = 0; j < primPt.children.length; j++) {
          //check if need to find line or polygon
          if (label === 'objArea') {
            if (IsObjDataOfObjPolygonSegment(primPt.children[j].userData)) {
              const polygonGeometry = (primPt.children[j] as THREE.Mesh).geometry as THREE.ShapeGeometry;
              const coords = polygonGeometry.attributes.position.array;
              const shapeContour: Array<Vector2> = [];

              for (let i = 0; i < coords.length; i += 3) {
                shapeContour.push(new Vector2(coords[i], coords[i + 1]));
              }

              const area = Math.abs(ShapeUtils.area(shapeContour));
              return area;
            }
          } else if (label === 'objLength') {
            if (IsObjDataOfObjLineSegment(primPt.children[j].userData)) {
              const line = primPt.children[j] as Line2;
              line.computeLineDistances();
              // eslint-disable-next-line prettier/prettier
              let dist = 0;
              const coords = line.geometry.attributes.instanceStart.array;
              for (let k = 0; k < coords.length; k += 6) {
                const start = new Vector3(coords[k], 0, coords[k + 2]);
                const end = new Vector3(coords[k + 3], 0, coords[k + 5]);
                const delta = start.distanceTo(end);
                dist += delta;
              }
              return dist;
            }
          }
        }
      }
    }
    //find key obj in pt - line or polygon segment depending on label
  };
}
