/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
//clone and move
import { ILayerIDs } from 'shared/types';
import { IsObjDataOfObjLineSegment, IsObjDataOfObjPointSegment, IsObjDataOfObjPrimPt } from 'shared/types/objs';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { Line2, LineGeometry } from 'three-fatline';
import { COLORS_SCENE } from 'three/config/consts';
import { getLineMat } from 'three/config/objs3d';
import { getLineEquidistant, insertZeroes, removeZeroesFrom3SizeCooords } from 'three/lib/lines';
import { setObjsLayers } from 'three/shared';

const pointObjTemp = (coords: Array<number>) => {
  const position = Float32Array.from(coords);

  const pGeom = new THREE.BufferGeometry();
  pGeom.setAttribute('position', new THREE.BufferAttribute(position, 3));
  const pMat = new THREE.PointsMaterial({ color: COLORS_SCENE.common_points, size: 2, sizeAttenuation: false });
  const point = new THREE.Points(pGeom, pMat);

  return point;
};
//set actual user data
export const addObjParallelLines = (
  mainObj: THREE.Object3D,
  layerId: ILayerIDs,
  data: Record<string, any>,
  offset = 10
) => {
  //getting primary obj
  //children - find primary part
  const primPt = mainObj.children.find((o) => {
    if (IsObjDataOfObjPrimPt(o.userData)) return true;
  });
  if (!primPt) return;
  //copy prime and create subobj
  const subPt = primPt.clone(false);
  //set user data
  //TODO props editor
  subPt.name = 'temp sub part';
  subPt.userData = Object.assign(data);
  //
  //find line and points segments by userdata type
  const lineSegment = primPt.children.find((o) => {
    if (IsObjDataOfObjLineSegment(o.userData)) return true;
  });
  const pointSegment = primPt.children.find((o) => {
    if (IsObjDataOfObjPointSegment(o.userData)) return true;
  });
  if (!lineSegment || !pointSegment) return;
  //
  const ptsPos = removeZeroesFrom3SizeCooords(
    Array.from((pointSegment as THREE.Points).geometry.attributes.position.array)
  );

  //side 1 and 2
  //TODO automate
  const testPt_A = pointObjTemp([]);
  const testPt_B = pointObjTemp([]);
  const coords_A = insertZeroes(getLineEquidistant(ptsPos, offset, false)); // 3 vertices per point [x, y, z, x1, y1, z1,...]
  const coords_B = insertZeroes(getLineEquidistant(ptsPos, offset, true)); // 3 vertices per point [x, y, z, x1, y1, z1,...]

  //points
  testPt_A.geometry.setAttribute('position', new THREE.BufferAttribute(Float32Array.from(coords_A), 3));
  testPt_B.geometry.setAttribute('position', new THREE.BufferAttribute(Float32Array.from(coords_B), 3));
  //lines
  const testLn_A = new Line2(new LineGeometry(), getLineMat(COLORS_SCENE.street_border, 2.5, false, 0.9));
  testLn_A.geometry.setPositions(coords_A);
  const testLn_B = new Line2(new LineGeometry(), getLineMat(COLORS_SCENE.street_border, 2.5, false, 0.9));
  testLn_B.geometry.setPositions(coords_B);
  // //
  subPt.add(testPt_A, testPt_B);
  subPt.add(testLn_A, testLn_B);
  setObjsLayers(layerId, testPt_A, testPt_B, testLn_A, testLn_B);
  mainObj.add(subPt);

  return true;
};
