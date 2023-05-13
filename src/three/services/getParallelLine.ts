//clone and move
import * as THREE from 'three';
import { Vector3 } from 'three';
import { Line2, LineGeometry } from 'three-fatline';
import { getLineMat } from 'three/config/objs3d';

const pointObjTemp = (coords: Array<number>) => {
  const position = Float32Array.from(coords);

  const pGeom = new THREE.BufferGeometry();
  pGeom.setAttribute('position', new THREE.BufferAttribute(position, 3));
  const pMat = new THREE.PointsMaterial({ color: 0xff0000, size: 10, sizeAttenuation: false });
  const point = new THREE.Points(pGeom, pMat);

  return point;
};
//set actual user data
export const setParallelLine = (obj: THREE.Object3D) => {
  //offset temp = 10
  const OFFSET = 10;
  const child = obj.children.at(0);
  if (!child) return;
  const newObj = child.clone();

  const line = newObj.children.at(1);
  if (!line) return;
  const line2 = line as Line2;
  line2.material = getLineMat(0x1d5e9a, 4, true, 0.5);
  newObj.position.x += OFFSET * -1;

  const pts = newObj.children.at(0);
  if (!pts) return;
  const pts2 = pts as THREE.Points;
  const pos = pts2.geometry.attributes.position;
  console.log('array', pos.array);
  const v0 = new Vector3();
  v0.fromBufferAttribute(pos, 0); // now v contains coordinates of point [1]
  const v1 = new Vector3();
  v1.fromBufferAttribute(pos, 1); // now v contains coordinates of point [1]
  console.log('point 1', v0, v1);

  //create array of vectors
  const vectors: Array<Vector3> = [];
  for (let i = 0; i < 2; i++) {
    const v = new Vector3();
    v.fromBufferAttribute(pos, i);
    vectors.push(v);
  }
  // const ptsCoords = pos.array;

  //subvector(from 0)
  // const z = new Vector3(0, 1, 0);
  // const s = new Vector3();
  //one side

  //for every side
  const testPt_A = pointObjTemp([]);
  const coords_A = new Float32Array(6);
  for (let j = 0; j < vectors.length; j++) {
    const z = new Vector3(0, 1, 0);
    const s = new Vector3();
    const c = s.clone();
    c.subVectors(vectors[0], vectors[1]).cross(z).normalize().multiplyScalar(OFFSET);
    c.add(vectors[j]);
    // const testPt = pointObjTemp(c.toArray());
    coords_A.set(c.toArray(), j * 3);
    // console.log('buffer coords', coords_A);
    // obj.add(testPt);
    // const position = Float32Array.from(newCoords);
  }
  testPt_A.geometry.setAttribute('position', new THREE.BufferAttribute(coords_A, 3));
  //
  const testLn_A = new Line2(new LineGeometry(), getLineMat(0x1d5e9a, 4, true, 0.5));
  testLn_A.geometry.setPositions(coords_A);
  //
  obj.add(testPt_A);
  obj.add(testLn_A);

  // console.log(v0, s);

  // const testPt = pointObjTemp(s.toArray());

  //material temp
  // obj.add(testPt);
  // obj.add(newObj);
};
