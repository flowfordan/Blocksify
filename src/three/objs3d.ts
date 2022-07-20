import * as THREE from 'three';
import { Line2, LineGeometry, LineMaterial } from 'three-fatline';

const pointObj = (coords: any) => {
    let position = Float32Array.from(coords)
    let pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute( 'position', new THREE.BufferAttribute( position, 3 ) );
    let pMat = new THREE.PointsMaterial( { color: 0x888888, size: 6, sizeAttenuation: false} );
    let point = new THREE.Points(pGeom, pMat);
    
    return point
};

// const pointObj2 = (coords: any) => {
//     let positions = Float32Array.from(coords)
//     let pGeom = new THREE.BufferGeometry();
//     pGeom.setFromPoints(positions);
//     let pMat = new THREE.PointsMaterial( { color: 0x888888, size: 6, sizeAttenuation: false} );
//     let point = new THREE.Points(pGeom, pMat);
    
//     return point
// };

const pMat = new THREE.PointsMaterial( { color: 0x888888, size: 6, sizeAttenuation: false} );

const lineObj = (coords: any) => {
    const lGeom = new THREE.BufferGeometry()
    .setFromPoints(coords)

    const LMat = new THREE.LineBasicMaterial({
        color: 0x000000
    });

    const line = new THREE.Line( lGeom, LMat );

    return line
};

const fatLineObj = (coords: Array<number>) => {
    const lGeom = new LineGeometry();
    lGeom.setPositions(coords);

    const lMat = new LineMaterial({
        color: 0x000000,
        linewidth: 3,
        resolution: new THREE.Vector2(1920, 1080)
    });

    const line = new Line2(lGeom, lMat);
    line.computeLineDistances();

    return line;
} 




const lMat = new LineMaterial({
    color: 0x7A7A7A,
    linewidth: 3,
    resolution: new THREE.Vector2(1920, 1080),
    dashed: true,

});

const lMat2 = new LineMaterial({
    color: 0x000000,
    linewidth: 3,
    resolution: new THREE.Vector2(1920, 1080)
});

const lGeom = new LineGeometry();


export {pointObj, lineObj, fatLineObj, lMat, lMat2, lGeom, pMat}