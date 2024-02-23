//clone and move
import { ILayerIDs } from 'shared/types';
import { IsObjDataOfObjLineSegment, IsObjDataOfObjPointSegment, IsObjDataOfObjPrimPt } from 'shared/types/objs';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { Line2, LineGeometry } from 'three-fatline';
import { getLineMat } from 'three/config/objs3d';
import { setObjsLayers } from 'three/shared';

const pointObjTemp = (coords: Array<number>) => {
  const position = Float32Array.from(coords);

  const pGeom = new THREE.BufferGeometry();
  pGeom.setAttribute('position', new THREE.BufferAttribute(position, 3));
  const pMat = new THREE.PointsMaterial({ color: 0xff0000, size: 10, sizeAttenuation: false });
  const point = new THREE.Points(pGeom, pMat);

  return point;
};
//set actual user data
export const setParallelLine = (mainObj: THREE.Object3D, layerId: ILayerIDs, offset = 10) => {
  //getting primary obj
  //children - find primary part
  const primPt = mainObj.children.find((o) => {
    if (IsObjDataOfObjPrimPt(o.userData)) return true;
  });
  if (!primPt) return;
  //copy prime and create subobj
  const subPt = primPt.clone(false);
  //set user data
  subPt.name = 'temp sub part';
  subPt.userData = { OBJ_GENERAL_TYPE: 'OBJ_SEGMENT_POINT' };
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
  // (lineSegment as Line2).material = getLineMat(0x1d5e9a, 4, true, 0.5);
  //array of points [x, y, z, x1, y1, z1,...]
  const ptsPos = (pointSegment as THREE.Points).geometry.attributes.position;

  //create array of vectors - object points [Vector3, Vector3,...]
  const vectors: Array<Vector3> = [];
  for (let i = 0; i < 2; i++) {
    const v = new Vector3();
    v.fromBufferAttribute(ptsPos, i);
    vectors.push(v);
  }

  //side 1 and 2
  //TODO automate
  const testPt_A = pointObjTemp([]);
  const testPt_B = pointObjTemp([]);
  const coords_A = new Float32Array(6); // 3 vertices per point [x, y, z, x1, y1, z1,...]
  const coords_B = new Float32Array(6); // 3 vertices per point [x, y, z, x1, y1, z1,...]
  const z = new Vector3(0, 1, 0); //vector z - from plane to top
  for (let j = 0; j < vectors.length; j++) {
    const s = new Vector3();
    const c = s.clone();
    c.subVectors(vectors[0], vectors[1]) //subvector - between p1 and p2, pointing to beggining of line
      .cross(z) //'perpendicular' vector to subvector and z
      .normalize() //unit vector
      .multiplyScalar(offset); //multiply by offset - extend unit by offset number
    c.add(vectors[j]); //''move'' unit to the end of line
    coords_A.set(c.toArray(), j * 3);
  }
  for (let j = 0; j < vectors.length; j++) {
    const s = new Vector3();
    const c = s.clone();
    c.subVectors(vectors[0], vectors[1]) //subvector - between p1 and p2, pointing to beggining of line
      .cross(z) //'perpendicular' vector to subvector and z
      .normalize() //unit vector
      .multiplyScalar(-offset); //multiply by offset - extend unit by offset number
    c.add(vectors[j]); //''move'' unit to the end of line
    coords_B.set(c.toArray(), j * 3);
  }
  //points
  testPt_A.geometry.setAttribute('position', new THREE.BufferAttribute(coords_A, 3));
  testPt_B.geometry.setAttribute('position', new THREE.BufferAttribute(coords_B, 3));
  //lines
  const testLn_A = new Line2(new LineGeometry(), getLineMat(0x1d5e9a, 4, true, 0.5));
  testLn_A.geometry.setPositions(coords_A);
  const testLn_B = new Line2(new LineGeometry(), getLineMat(0x1d5e9a, 4, true, 0.5));
  testLn_B.geometry.setPositions(coords_B);
  // //
  subPt.add(testPt_A, testPt_B);
  subPt.add(testLn_A, testLn_B);
  setObjsLayers(layerId, testPt_A, testPt_B, testLn_A, testLn_B);
  mainObj.add(subPt);

  return true;
};

// const getParallelLine = (obj: THREE.Object3D, offset = 10) => {
//   //
//   //return obj;
// };
