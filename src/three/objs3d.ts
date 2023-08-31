import * as THREE from 'three';
import { Vector2 } from 'three';
import { Line2, LineGeometry, LineMaterial } from 'three-fatline';

export interface I3dObjPoint {
  form: THREE.Points | null;
  geom: THREE.BufferGeometry | null;
  mat: THREE.PointsMaterial;
}

export interface I3dObjLine {
  form: Line2 | null;
  geom: LineGeometry | null;
  mat: LineMaterial;
}

export interface I3dObjPolygon {
  form: THREE.Mesh | null;
  geom: THREE.Shape | null;
  mat: THREE.MeshBasicMaterial;
}

const pointObj = (coords: Array<number>) => {
  const position = Float32Array.from(coords);

  const pGeom = new THREE.BufferGeometry();
  pGeom.setAttribute('position', new THREE.BufferAttribute(position, 3));
  const pMat = new THREE.PointsMaterial({ color: 0x888888, size: 6, sizeAttenuation: false });
  const point = new THREE.Points(pGeom, pMat);

  return point;
};

const V2ArrToNumArr = (arr: Array<Vector2>, baseLevel: number) => {
  return arr
    .map((i) => {
      return [i.toArray()[0], 0 - baseLevel, i.toArray()[1]];
    })
    .flat();
};

//DEFAULT MATERIALS
const pMat = new THREE.PointsMaterial({ color: 0x888888, size: 6, sizeAttenuation: false });

//function returning fatline material with given atributes
const getLineMat = (color = 0xffffff, lineWidth = 2, dash = false, opacity = 1) => {
  const lineMaterial = new LineMaterial({
    color: color,
    linewidth: lineWidth,
    resolution: new THREE.Vector2(1920, 1080),
    dashed: dash,
    dashSize: 8,
    gapSize: 4,
    //dashOffset: 25,
    opacity: opacity,
  });

  return lineMaterial;
};

const getPolygonMat = () => {
  const mat = new THREE.MeshBasicMaterial({
    color: new THREE.Color('moccasin'),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5,
  });

  return mat;
};

export { pointObj, pMat, getLineMat, getPolygonMat, V2ArrToNumArr };
